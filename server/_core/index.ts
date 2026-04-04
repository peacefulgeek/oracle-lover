import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initArticlesTable, getPublishedArticles, getArticleBySlug, getArticleCount, insertArticle } from "../db";
import { startCronJobs } from "../cron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// ═══════════════════════════════════════════════════════════════
// AUTO-SEED: Parse articles.ts and insert into DB on first boot
// ═══════════════════════════════════════════════════════════════
async function autoSeedFromFile(): Promise<void> {
  const possiblePaths = [
    path.resolve(__dirname, "..", "..", "client", "src", "data", "articles.ts"),
    path.resolve(__dirname, "..", "public", "articles-data.json"),
  ];

  let filePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    console.log("[SEED] No articles source file found. Skipping auto-seed.");
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const articleBlocks = content.split(/\n\s*\{[\s\n]*slug:/);

  let seeded = 0;
  for (let i = 1; i < articleBlocks.length; i++) {
    const block = "slug:" + articleBlocks[i];
    try {
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      if (!slugMatch) continue;
      const slug = slugMatch[1];

      const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/)
      const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : slug;

      const rtMatch = block.match(/readingTime:\s*'([^']+)'/);
      const readingTime = rtMatch ? rtMatch[1] : "10 min read";

      const excerptMatch = block.match(/excerpt:\s*'((?:[^'\\]|\\.)*)'/)
      const excerpt = excerptMatch ? excerptMatch[1].replace(/\\'/g, "'") : "";

      // Content is a template literal: content: `...content...`,
      // It ends with a backtick followed by comma at the start of a line
      const contentStartIdx = block.indexOf("content: `");
      let articleContent = "";
      if (contentStartIdx !== -1) {
        const afterContent = block.substring(contentStartIdx + "content: `".length);
        // Find the closing backtick+comma pattern (backtick at start of line followed by comma)
        const endIdx = afterContent.indexOf("\n`,");
        if (endIdx !== -1) {
          articleContent = afterContent.substring(0, endIdx).trim();
        } else {
          // Fallback: look for backtick+comma anywhere
          const endIdx2 = afterContent.indexOf("`,");
          if (endIdx2 !== -1) {
            articleContent = afterContent.substring(0, endIdx2).trim();
          }
        }
        articleContent = articleContent
          .replace(/\\`/g, "`")
          .replace(/\\\$/g, "$")
          .replace(/\\\\/g, "\\");
      }

      const heroMatch = block.match(/heroImage:\s*'([^']*)'/)
      const heroImage = heroMatch ? heroMatch[1] : "";

      const statusMatch = block.match(/status:\s*'([^']*)'/)
      const status = statusMatch ? statusMatch[1] : "published";

      const dateMatch = block.match(/scheduledDate:\s*'([^']*)'/)
      const scheduledDate = dateMatch ? dateMatch[1] : null;

      let category = "general";
      const healthKeywords = [
        "thyroid", "inflammatory", "nervine", "apothecary", "herb", "adaptogen",
        "gut", "sleep", "detox", "mushroom", "essential-oil", "immune", "liver",
        "nootropic", "endocrine", "ferment", "magnesium", "anxiety", "bitter",
        "breathwork", "wellness", "healing", "supplement", "ayurved"
      ];
      if (healthKeywords.some((k) => slug.includes(k))) {
        category = "health";
      }

      // Parse readingTime string like "10 min read" to int
      const rtNum = parseInt(readingTime) || 8;

      await insertArticle({
        slug,
        title,
        reading_time: readingTime,
        excerpt,
        content: articleContent,
        hero_image: heroImage || '',
        status,
        scheduled_date: scheduledDate,
        category,
      });
      seeded++;
      console.log(`[SEED]   ✓ ${slug}`);
    } catch (err) {
      console.error(`[SEED]   ✗ block ${i}:`, err);
    }
  }

  console.log(`[SEED] Auto-seeded ${seeded} articles from file.`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ═══════════════════════════════════════════════════════════
  // ARTICLES API ROUTES (direct Express, not tRPC)
  // ═══════════════════════════════════════════════════════════

  // Get all published articles
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await getPublishedArticles();
      const mapped = articles.map((a) => ({
        slug: a.slug,
        title: a.title,
        readingTime: a.reading_time,
        excerpt: a.excerpt || '',
        content: a.content,
        heroImage: a.hero_image || '',
        status: a.status,
        category: a.category,
      }));
      res.json(mapped);
    } catch (err) {
      console.error("[API] Error fetching articles:", err);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  // Get single article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json({
        slug: article.slug,
        title: article.title,
        readingTime: article.reading_time,
        excerpt: article.excerpt || '',
        content: article.content,
        heroImage: article.hero_image || '',
        status: article.status,
        category: article.category,
      });
    } catch (err) {
      console.error("[API] Error fetching article:", err);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ═══════════════════════════════════════════════════════════
  // INITIALIZE ARTICLES DB + AUTO-SEED + CRON
  // ═══════════════════════════════════════════════════════════
  try {
    await initArticlesTable();
    console.log("[SERVER] Articles table initialized.");

    const count = await getArticleCount();
    if (count === 0) {
      console.log("[SERVER] Database empty — running auto-seed...");
      try {
        await autoSeedFromFile();
      } catch (seedErr) {
        console.error("[SERVER] Auto-seed failed:", seedErr);
      }
    } else {
      console.log(`[SERVER] Database has ${count} articles. Skipping seed.`);
    }

    startCronJobs();
  } catch (dbErr) {
    console.error("[SERVER] Articles DB init error:", dbErr);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

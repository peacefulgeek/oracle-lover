import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { startCronJobs } from "./cron.js";
import {
  initArticlesTable,
  getPublishedArticles,
  getArticleBySlug,
  getArticleCount,
  insertArticle,
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ═══════════════════════════════════════════════════════════════
// Auto-seed: parse articles.ts and insert into Railway MySQL
// Only runs if the DB has fewer articles than the TS file
// ═══════════════════════════════════════════════════════════════
async function autoSeedFromFile(): Promise<void> {
  try {
    const fs = await import("fs");
    const articlesPath = path.resolve(__dirname, "..", "client", "src", "data", "articles.ts");
    if (!fs.existsSync(articlesPath)) {
      console.log("[SEED] articles.ts not found, skipping auto-seed.");
      return;
    }

    const dbCount = await getArticleCount();
    const fileContent = fs.readFileSync(articlesPath, "utf-8");

    // Count articles in file
    const slugMatches = fileContent.match(/slug: '/g) || [];
    const fileCount = slugMatches.length;

    if (dbCount >= fileCount) {
      console.log(`[SEED] DB has ${dbCount} articles, file has ${fileCount}. No seed needed.`);
      return;
    }

    console.log(`[SEED] DB has ${dbCount} articles, file has ${fileCount}. Seeding...`);

    // Split file into article blocks
    const blocks = fileContent.split(/\n  \{/).slice(1); // skip the interface/export part

    for (const block of blocks) {
      const slugMatch = block.match(/slug: '([^']+)'/);
      const titleMatch = block.match(/title: '([^']+)'/);
      const readingTimeMatch = block.match(/readingTime: '([^']+)'/);
      const excerptMatch = block.match(/excerpt: '([\s\S]*?)(?:',\s*\n)/);
      const heroImageMatch = block.match(/heroImage: '([^']+)'/);
      const statusMatch = block.match(/status: '([^']+)'/);
      const scheduledDateMatch = block.match(/scheduledDate: '([^']+)'/);

      // Extract content between backticks
      const contentMatch = block.match(/content: `([\s\S]*?)`,?\s*\n/);

      if (!slugMatch || !titleMatch) continue;

      const slug = slugMatch[1];
      const title = titleMatch[1];
      const readingTimeStr = readingTimeMatch ? readingTimeMatch[1] : "8 min read";
      const readingTime = parseInt(readingTimeStr) || 8;
      const excerpt = excerptMatch ? excerptMatch[1].replace(/\\'/g, "'") : "";
      const heroImage = heroImageMatch ? heroImageMatch[1] : "";
      const status = statusMatch ? statusMatch[1] : "published";
      const scheduledDate = scheduledDateMatch ? scheduledDateMatch[1] : null;
      const content = contentMatch ? contentMatch[1] : "";

      await insertArticle({
        slug,
        title,
        subtitle: excerpt.substring(0, 200),
        body: content,
        heroImage,
        readingTime,
        status,
        scheduledDate,
      });

      console.log(`[SEED] Inserted: ${slug}`);
    }

    const newCount = await getArticleCount();
    console.log(`[SEED] Seeding complete. DB now has ${newCount} articles.`);
  } catch (err) {
    console.error("[SEED] Auto-seed failed:", err);
  }
}

// ═══════════════════════════════════════════════════════════════
// Express server with API endpoints
// ═══════════════════════════════════════════════════════════════
async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Init DB table
  await initArticlesTable();

  // Auto-seed from articles.ts if DB is empty/incomplete
  await autoSeedFromFile();

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // ── API ENDPOINTS ──────────────────────────────────────────

  // Health check for Railway
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get all published articles (no body)
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await getPublishedArticles();
      // Map Railway schema to frontend shape
      const mapped = articles.map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.subtitle || "",
        readingTime: `${a.readingTime} min read`,
        heroImage: a.heroImage || "",
        status: a.status,
        category: a.category || "",
      }));
      res.json(mapped);
    } catch (err) {
      console.error("[API] Error fetching articles:", err);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  // Get single article by slug (with body)
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json({
        slug: article.slug,
        title: article.title,
        excerpt: article.subtitle || "",
        content: article.body || "",
        readingTime: `${article.readingTime} min read`,
        heroImage: article.heroImage || "",
        status: article.status,
        category: article.category || "",
      });
    } catch (err) {
      console.error("[API] Error fetching article:", err);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  // ── SPA FALLBACK ───────────────────────────────────────────
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Start cron jobs
  startCronJobs();

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

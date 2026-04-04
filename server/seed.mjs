/**
 * Seed script — run once to migrate existing articles from articles.ts into MySQL.
 * Usage: DATABASE_URL="mysql://..." node server/seed.mjs
 * 
 * Can also be imported and called from the server to auto-seed on first boot.
 */
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL || process.env.MYSQL_URL || "";

// Parse articles from the TypeScript data file
function parseArticles() {
  // Try multiple possible paths
  const possiblePaths = [
    path.resolve(__dirname, "..", "client", "src", "data", "articles.ts"),
    path.resolve(__dirname, "..", "src", "data", "articles.ts"),
  ];

  let filePath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    console.error("Could not find articles.ts file. Tried:", possiblePaths);
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const articles = [];

  // Match each article block using a more robust approach
  // Split on the pattern of opening braces that start article objects
  const articleBlocks = content.split(/\n\s*\{[\s\n]*slug:/);

  for (let i = 1; i < articleBlocks.length; i++) {
    const block = "slug:" + articleBlocks[i];

    try {
      // Extract slug
      const slugMatch = block.match(/slug:\s*'([^']+)'/);
      if (!slugMatch) continue;
      const slug = slugMatch[1];

      // Extract title (handle escaped quotes)
      const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)*)'/);
      const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : slug;

      // Extract readingTime
      const rtMatch = block.match(/readingTime:\s*'([^']+)'/);
      const readingTime = rtMatch ? rtMatch[1] : "10 min read";

      // Extract excerpt (handle escaped quotes)
      const excerptMatch = block.match(/excerpt:\s*'((?:[^'\\]|\\.)*)'/);
      const excerpt = excerptMatch ? excerptMatch[1].replace(/\\'/g, "'") : "";

      // Extract content (template literal)
      const contentMatch = block.match(/content:\s*`([\s\S]*?)`,?\s*\n\s*heroImage:/);
      let articleContent = "";
      if (contentMatch) {
        articleContent = contentMatch[1]
          .replace(/\\`/g, "`")
          .replace(/\\\$/g, "$")
          .replace(/\\\\/g, "\\");
      }

      // Extract heroImage
      const heroMatch = block.match(/heroImage:\s*'([^']*)'/);
      const heroImage = heroMatch ? heroMatch[1] : "";

      // Extract status
      const statusMatch = block.match(/status:\s*'([^']*)'/);
      const status = statusMatch ? statusMatch[1] : "published";

      // Extract scheduledDate
      const dateMatch = block.match(/scheduledDate:\s*'([^']*)'/);
      const scheduledDate = dateMatch ? dateMatch[1] : null;

      // Determine category from slug
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

      articles.push({
        slug,
        title,
        readingTime,
        excerpt,
        content: articleContent,
        heroImage,
        status,
        scheduledDate,
        category,
      });
    } catch (err) {
      console.error(`  Error parsing article block ${i}:`, err.message);
    }
  }

  return articles;
}

async function main() {
  if (!DATABASE_URL) {
    console.error("DATABASE_URL not set. Set DATABASE_URL or MYSQL_URL environment variable.");
    process.exit(1);
  }

  console.log("[SEED] Connecting to MySQL...");
  const pool = mysql.createPool({ uri: DATABASE_URL, connectionLimit: 5 });

  // Create table if not exists
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      reading_time VARCHAR(50) DEFAULT '10 min read',
      excerpt TEXT,
      content LONGTEXT NOT NULL,
      hero_image VARCHAR(1000) DEFAULT '',
      status ENUM('published', 'draft') DEFAULT 'published',
      scheduled_date DATE DEFAULT NULL,
      category VARCHAR(100) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_scheduled (scheduled_date),
      INDEX idx_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const articles = parseArticles();
  console.log(`[SEED] Found ${articles.length} articles to seed.`);

  if (articles.length === 0) {
    console.log("[SEED] No articles found. Exiting.");
    await pool.end();
    return;
  }

  let inserted = 0;
  let errors = 0;
  for (const a of articles) {
    try {
      await pool.execute(
        `INSERT INTO articles (slug, title, reading_time, excerpt, content, hero_image, status, scheduled_date, category)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           title = VALUES(title),
           reading_time = VALUES(reading_time),
           excerpt = VALUES(excerpt),
           content = VALUES(content),
           hero_image = VALUES(hero_image),
           status = VALUES(status),
           scheduled_date = VALUES(scheduled_date),
           category = VALUES(category)`,
        [
          a.slug,
          a.title,
          a.readingTime,
          a.excerpt,
          a.content,
          a.heroImage,
          a.status,
          a.scheduledDate,
          a.category,
        ]
      );
      inserted++;
      console.log(`  ✓ ${a.slug}`);
    } catch (err) {
      errors++;
      console.error(`  ✗ ${a.slug}:`, err.message);
    }
  }

  console.log(`\n[SEED] Complete: ${inserted} seeded, ${errors} errors, out of ${articles.length} total.`);
  await pool.end();
}

// Export for use from server
export { parseArticles };

// Run if called directly
main().catch((err) => {
  console.error("[SEED] Fatal error:", err);
  process.exit(1);
});

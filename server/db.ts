import mysql from "mysql2/promise";

// ═══════════════════════════════════════════════════════════════
// Railway MySQL connection pool
// ═══════════════════════════════════════════════════════════════
const DATABASE_URL = process.env.RAILWAY_DATABASE_URL || process.env.DATABASE_URL || "";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      uri: DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      idleTimeout: 60000,
    });
  }
  return pool;
}

// ═══════════════════════════════════════════════════════════════
// Schema init — create articles table if it doesn't exist
// ═══════════════════════════════════════════════════════════════
export async function initArticlesTable(): Promise<void> {
  const db = getPool();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      subtitle VARCHAR(500) DEFAULT '',
      category VARCHAR(100) DEFAULT '',
      body TEXT,
      pullQuote TEXT,
      heroImage VARCHAR(1000) DEFAULT '',
      readingTime INT DEFAULT 8,
      tags JSON,
      status ENUM('published','draft','scheduled') DEFAULT 'published',
      scheduledDate VARCHAR(20) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  console.log("[DB] Articles table ready.");
}

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════
export interface ArticleRow {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  body: string;
  pullQuote: string;
  heroImage: string;
  readingTime: number;
  tags: string[] | null;
  status: string;
  scheduledDate: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ═══════════════════════════════════════════════════════════════
// Queries
// ═══════════════════════════════════════════════════════════════

/** Get all published articles (no body for listing) */
export async function getPublishedArticles(): Promise<Omit<ArticleRow, "body">[]> {
  const db = getPool();
  const [rows] = await db.execute(
    `SELECT id, slug, title, subtitle, category, pullQuote, heroImage, readingTime, tags, status, scheduledDate, createdAt, updatedAt
     FROM articles WHERE status = 'published' ORDER BY createdAt DESC`
  );
  return rows as Omit<ArticleRow, "body">[];
}

/** Get all articles (including drafts, no body) */
export async function getAllArticles(): Promise<Omit<ArticleRow, "body">[]> {
  const db = getPool();
  const [rows] = await db.execute(
    `SELECT id, slug, title, subtitle, category, pullQuote, heroImage, readingTime, tags, status, scheduledDate, createdAt, updatedAt
     FROM articles ORDER BY createdAt DESC`
  );
  return rows as Omit<ArticleRow, "body">[];
}

/** Get single article by slug (with body) */
export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const db = getPool();
  const [rows] = await db.execute(
    `SELECT * FROM articles WHERE slug = ? LIMIT 1`,
    [slug]
  );
  const arr = rows as ArticleRow[];
  return arr.length > 0 ? arr[0] : null;
}

/** Get article count */
export async function getArticleCount(): Promise<number> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT COUNT(*) as cnt FROM articles`);
  return (rows as any)[0].cnt;
}

/** Insert a new article (upsert on slug) */
export async function insertArticle(article: {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  body: string;
  pullQuote?: string;
  heroImage?: string;
  readingTime?: number;
  tags?: string[];
  status?: string;
  scheduledDate?: string | null;
}): Promise<void> {
  const db = getPool();
  await db.execute(
    `INSERT INTO articles (slug, title, subtitle, category, body, pullQuote, heroImage, readingTime, tags, status, scheduledDate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       subtitle = VALUES(subtitle),
       category = VALUES(category),
       body = VALUES(body),
       pullQuote = VALUES(pullQuote),
       heroImage = VALUES(heroImage),
       readingTime = VALUES(readingTime),
       tags = VALUES(tags),
       status = VALUES(status),
       scheduledDate = VALUES(scheduledDate)`,
    [
      article.slug,
      article.title,
      article.subtitle || "",
      article.category || "",
      article.body,
      article.pullQuote || "",
      article.heroImage || "",
      article.readingTime || 8,
      JSON.stringify(article.tags || []),
      article.status || "published",
      article.scheduledDate || null,
    ]
  );
}

/** Update article status */
export async function updateArticleStatus(slug: string, status: string): Promise<void> {
  const db = getPool();
  await db.execute(`UPDATE articles SET status = ? WHERE slug = ?`, [status, slug]);
}

/** Get slugs of all articles */
export async function getAllSlugs(): Promise<Set<string>> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT slug FROM articles`);
  const slugs = new Set<string>();
  for (const row of rows as any[]) {
    slugs.add(row.slug);
  }
  return slugs;
}

/** Get scheduled articles due for publishing */
export async function getScheduledArticlesDue(): Promise<ArticleRow[]> {
  const today = new Date().toISOString().split("T")[0];
  const db = getPool();
  const [rows] = await db.execute(
    `SELECT * FROM articles WHERE status = 'draft' AND scheduledDate IS NOT NULL AND scheduledDate <= ?`,
    [today]
  );
  return rows as ArticleRow[];
}

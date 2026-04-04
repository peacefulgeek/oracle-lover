import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import mysql from "mysql2/promise";

// ═══════════════════════════════════════════════════════════════
// DRIZZLE DATABASE (for auth / user management)
// ═══════════════════════════════════════════════════════════════

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ═══════════════════════════════════════════════════════════════
// RAW MYSQL POOL (for articles — direct SQL queries)
// ═══════════════════════════════════════════════════════════════
//
// TiDB schema (snake_case):
//   id INT AUTO_INCREMENT PRIMARY KEY
//   slug VARCHAR(255) UNIQUE
//   title VARCHAR(500)
//   reading_time VARCHAR(50) DEFAULT '10 min read'
//   excerpt TEXT
//   content LONGTEXT
//   hero_image VARCHAR(1000) DEFAULT ''
//   status ENUM('published','draft') DEFAULT 'published'
//   scheduled_date DATE
//   category VARCHAR(100) DEFAULT 'general'
//   created_at TIMESTAMP
//   updated_at TIMESTAMP
// ═══════════════════════════════════════════════════════════════

const DATABASE_URL = process.env.DATABASE_URL || "";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL not set");
    }
    pool = mysql.createPool({
      uri: DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ssl: { rejectUnauthorized: true },
    });
  }
  return pool;
}

// ═══════════════════════════════════════════════════════════════
// ARTICLES TABLE INIT
// ═══════════════════════════════════════════════════════════════

export async function initArticlesTable(): Promise<void> {
  const db = getPool();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      reading_time VARCHAR(50) DEFAULT '10 min read',
      excerpt TEXT DEFAULT NULL,
      content LONGTEXT NOT NULL,
      hero_image VARCHAR(1000) DEFAULT '',
      status ENUM('published','draft') DEFAULT 'published',
      scheduled_date DATE DEFAULT NULL,
      category VARCHAR(100) DEFAULT 'general',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_status (status),
      KEY idx_scheduled (scheduled_date),
      KEY idx_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("[DB] Articles table ready.");
}

// ═══════════════════════════════════════════════════════════════
// ARTICLE TYPES & QUERIES
// ═══════════════════════════════════════════════════════════════

export interface DBArticle {
  id: number;
  slug: string;
  title: string;
  reading_time: string;
  excerpt: string | null;
  content: string;
  hero_image: string | null;
  status: string;
  scheduled_date: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

/** Get published articles */
export async function getPublishedArticles(): Promise<DBArticle[]> {
  const db = getPool();
  const [rows] = await db.execute(
    `SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC`
  );
  return rows as DBArticle[];
}

export async function getAllArticles(): Promise<DBArticle[]> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT * FROM articles ORDER BY created_at DESC`);
  return rows as DBArticle[];
}

export async function getArticleBySlug(slug: string): Promise<DBArticle | null> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT * FROM articles WHERE slug = ?`, [slug]);
  const arr = rows as DBArticle[];
  return arr.length > 0 ? arr[0] : null;
}

export async function insertArticle(article: {
  slug: string;
  title: string;
  reading_time?: string;
  excerpt?: string;
  content: string;
  hero_image?: string;
  status?: string;
  scheduled_date?: string | null;
  category?: string;
}): Promise<void> {
  const db = getPool();
  await db.execute(
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
      article.slug,
      article.title,
      article.reading_time || "10 min read",
      article.excerpt || "",
      article.content,
      article.hero_image || "",
      article.status || "published",
      article.scheduled_date || null,
      article.category || "general",
    ]
  );
}

export async function publishDueArticles(): Promise<number> {
  const db = getPool();
  const [result] = await db.execute(
    `UPDATE articles SET status = 'published' WHERE status = 'draft' AND scheduled_date IS NOT NULL AND scheduled_date <= CURDATE()`
  );
  return (result as any).affectedRows || 0;
}

export async function getArticleCount(): Promise<number> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT COUNT(*) as cnt FROM articles`);
  return (rows as any[])[0].cnt;
}

export async function articleExists(slug: string): Promise<boolean> {
  const db = getPool();
  const [rows] = await db.execute(`SELECT 1 FROM articles WHERE slug = ? LIMIT 1`, [slug]);
  return (rows as any[]).length > 0;
}

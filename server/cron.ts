import cron from "node-cron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Auto-publish cron job
 * 
 * Runs daily at midnight (00:00) to check for draft articles
 * whose scheduledDate has passed. When found, it updates the
 * articles.ts source file to change status from 'draft' to 'published'
 * and removes the scheduledDate field.
 * 
 * This runs entirely in-code on Railway — no external dependencies.
 */

const ARTICLES_PATH = path.resolve(
  __dirname,
  process.env.NODE_ENV === "production"
    ? "../client/src/data/articles.ts"
    : "../client/src/data/articles.ts"
);

function publishScheduledArticles(): void {
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // YYYY-MM-DD

  console.log(`[CRON] ${now.toISOString()} — Checking for scheduled articles to publish...`);

  try {
    if (!fs.existsSync(ARTICLES_PATH)) {
      console.log(`[CRON] Articles file not found at ${ARTICLES_PATH}. Skipping.`);
      return;
    }

    let content = fs.readFileSync(ARTICLES_PATH, "utf-8");
    let publishedCount = 0;

    // Find all draft articles with scheduledDate <= today
    // Pattern: status: 'draft',\n    scheduledDate: 'YYYY-MM-DD',
    const draftPattern = /status: 'draft',\s*\n\s*scheduledDate: '(\d{4}-\d{2}-\d{2})',/g;
    
    let match;
    const replacements: Array<{ full: string; date: string }> = [];
    
    while ((match = draftPattern.exec(content)) !== null) {
      const scheduledDate = match[1];
      if (scheduledDate <= today) {
        replacements.push({ full: match[0], date: scheduledDate });
      }
    }

    for (const rep of replacements) {
      // Replace status: 'draft' + scheduledDate line with status: 'published'
      content = content.replace(
        rep.full,
        "status: 'published',"
      );
      publishedCount++;
      console.log(`[CRON] Published article scheduled for ${rep.date}`);
    }

    if (publishedCount > 0) {
      fs.writeFileSync(ARTICLES_PATH, content, "utf-8");
      console.log(`[CRON] Successfully published ${publishedCount} article(s).`);
    } else {
      console.log(`[CRON] No articles due for publishing today (${today}).`);
    }
  } catch (err) {
    console.error(`[CRON] Error during scheduled publish:`, err);
  }
}

export function startCronJobs(): void {
  // Run every day at midnight
  cron.schedule("0 0 * * *", () => {
    publishScheduledArticles();
  });

  console.log("[CRON] Scheduled article publisher initialized — runs daily at midnight.");

  // Also run once on startup to catch any missed publishes
  publishScheduledArticles();
}

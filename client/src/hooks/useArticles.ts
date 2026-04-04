import { useState, useEffect } from "react";

export interface Article {
  slug: string;
  title: string;
  readingTime: string;
  excerpt: string;
  content: string;
  heroImage: string;
  status: string;
  category: string;
}

// Determine API base URL - in dev use proxy, in production use relative path
function getApiBase(): string {
  // In production (Railway), the Express server serves both API and static files
  // In dev (Vite), we need to proxy to the Express server
  // Since we're using Vite dev server, we'll use the full URL if available
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "";
  }
  return "";
}

const API_BASE = getApiBase();

// Cache articles in memory to avoid refetching on every page navigation
let articlesCache: Article[] | null = null;
let articlesCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(articlesCache || []);
  const [loading, setLoading] = useState(!articlesCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use cache if fresh
    if (articlesCache && Date.now() - articlesCacheTime < CACHE_TTL) {
      setArticles(articlesCache);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchArticles() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/articles`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Article[] = await res.json();
        if (!cancelled) {
          articlesCache = data;
          articlesCacheTime = Date.now();
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[useArticles] Fetch failed:", err);
          setError(err instanceof Error ? err.message : "Failed to load articles");
          // Fall back to cache if available
          if (articlesCache) {
            setArticles(articlesCache);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchArticles();
    return () => { cancelled = true; };
  }, []);

  return { articles, loading, error };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Check cache first
    if (articlesCache) {
      const cached = articlesCache.find((a) => a.slug === slug);
      if (cached) {
        setArticle(cached);
        setLoading(false);
        return;
      }
    }

    let cancelled = false;

    async function fetchArticle() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/articles/${slug}`);
        if (res.status === 404) {
          if (!cancelled) {
            setArticle(null);
            setError("Article not found");
          }
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Article = await res.json();
        if (!cancelled) {
          setArticle(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[useArticle] Fetch failed:", err);
          setError(err instanceof Error ? err.message : "Failed to load article");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchArticle();
    return () => { cancelled = true; };
  }, [slug]);

  return { article, loading, error };
}

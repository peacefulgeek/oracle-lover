import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  article?: {
    publishedTime?: string;
    section?: string;
    tags?: string[];
    readingTime?: string;
    wordCount?: number;
  };
}

const SITE_NAME = "The Oracle Lover";
const SITE_URL = "https://theoraclelover.com";
const DEFAULT_DESCRIPTION =
  "Thirty years of oracle card wisdom distilled into practical, grounded education. No woo required — just honest inquiry and a willingness to look.";
const DEFAULT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/hero-sacred-light-23Gw9cKdGiYwbrdJyc4aEn.webp";

const AUTHOR_JSONLD = {
  "@type": "Person",
  name: "Paul Wagner",
  url: "https://paulwagner.com",
  sameAs: [
    "https://theshankaraexperience.com",
    "https://theoraclelover.com",
  ],
};

const PUBLISHER_JSONLD = {
  "@type": "Organization",
  name: "The Oracle Lover",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_IMAGE,
  },
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  article,
}: SEOProps) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Practical Oracle Education`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Article-specific OG meta
    if (article) {
      if (article.publishedTime) {
        setMeta("property", "article:published_time", article.publishedTime);
      }
      if (article.section) {
        setMeta("property", "article:section", article.section);
      }
      if (article.tags) {
        article.tags.forEach((tag, i) => {
          setMeta("property", `article:tag:${i}`, tag);
        });
      }
    }

    // Set canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // JSON-LD Structured Data
    const existingJsonLd = document.querySelector(
      'script[data-seo-jsonld]'
    );
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLdScript = document.createElement("script");
    jsonLdScript.setAttribute("type", "application/ld+json");
    jsonLdScript.setAttribute("data-seo-jsonld", "true");

    if (type === "article" && article) {
      // Article schema
      const articleSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: image,
        url: fullUrl,
        author: AUTHOR_JSONLD,
        publisher: PUBLISHER_JSONLD,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": fullUrl,
        },
        inLanguage: "en-US",
      };
      if (article.publishedTime) {
        articleSchema.datePublished = article.publishedTime;
        articleSchema.dateModified = article.publishedTime;
      }
      if (article.section) {
        articleSchema.articleSection = article.section;
      }
      if (article.tags) {
        articleSchema.keywords = article.tags.join(", ");
      }
      if (article.wordCount) {
        articleSchema.wordCount = article.wordCount;
      }
      jsonLdScript.textContent = JSON.stringify(articleSchema);
    } else {
      // WebSite schema for non-article pages
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        author: AUTHOR_JSONLD,
        publisher: PUBLISHER_JSONLD,
      };
      jsonLdScript.textContent = JSON.stringify(websiteSchema);
    }

    document.head.appendChild(jsonLdScript);

    // Cleanup
    return () => {
      document.title = `${SITE_NAME} — Practical Oracle Education`;
      const script = document.querySelector('script[data-seo-jsonld]');
      if (script) script.remove();
    };
  }, [fullTitle, description, image, fullUrl, type, article, title]);

  return null;
}

/*
 * Articles — Sacred Warmth
 * Magazine-style article listing with category filtering
 */
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

function getCategory(slug: string): string {
  if (slug.includes("tarot") || slug.includes("spread") || slug.includes("daily") || slug.includes("practice") || slug.includes("choose") || slug.includes("cleanse") || slug.includes("journal")) return "Practice";
  if (slug.includes("jung") || slug.includes("campbell") || slug.includes("hero") || slug.includes("archetype") || slug.includes("shadow") || slug.includes("myth")) return "Philosophy";
  if (slug.includes("intuition") || slug.includes("emotion") || slug.includes("fear") || slug.includes("ego") || slug.includes("mirror") || slug.includes("wishful")) return "Inner Work";
  return "Foundation";
}

const categories = ["All", "Foundation", "Practice", "Philosophy", "Inner Work"];

export default function Articles() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? articles
    : articles.filter((a) => getCategory(a.slug) === active);

  return (
    <Layout>
      <SEO title="Articles" description="Twenty-five articles on oracle cards, intuition, archetypes, and the inner work of honest self-inquiry. Practical wisdom from thirty years at the table." image="https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/oracle-spread-velvet-VHEbcakoEJWsWxyeQAZkkY.webp" url="/articles" />
      {/* Header */}
      <section className="container py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
          >
            Articles
          </p>
          <h1
            className="text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
          >
            Twenty-Five Pieces of Practical Wisdom
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.40 0.04 310)", lineHeight: 1.7 }}
          >
            Everything I've learned in thirty years at the table, written for people who want
            the insight without the incense. (Okay, sometimes with the incense.)
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-full text-xs tracking-[0.1em] uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                background: active === cat ? "oklch(0.35 0.12 320)" : "oklch(0.78 0.14 75 / 0.08)",
                color: active === cat ? "oklch(0.96 0.02 80)" : "oklch(0.50 0.04 310)",
                border: active === cat ? "1px solid oklch(0.35 0.12 320)" : "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Article grid */}
      <section className="container pb-20 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            >
              <Link href={`/articles/${article.slug}`} className="block group h-full">
                <article className="sacred-card p-6 h-full flex flex-col">
                  {/* Category */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[0.65rem] tracking-[0.1em] uppercase"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        background: "oklch(0.78 0.14 75 / 0.1)",
                        color: "oklch(0.65 0.14 70)",
                      }}
                    >
                      {getCategory(article.slug)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl mb-3 transition-colors duration-300 group-hover:text-plum"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)", lineHeight: 1.3 }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="text-sm flex-1 mb-4"
                    style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
                  >
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid oklch(0.88 0.03 75)" }}>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-body)", color: "oklch(0.60 0.04 310)" }}
                    >
                      {article.readingTime}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs tracking-wide transition-all duration-300 group-hover:gap-2"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                    >
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Count */}
        <div className="text-center mt-12">
          <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "oklch(0.60 0.04 310)" }}>
            Showing {filtered.length} of {articles.length} articles
          </p>
        </div>
      </section>
    </Layout>
  );
}

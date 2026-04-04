/*
 * Articles — Sacred Warmth
 * 2-column layout: article grid left, author bio sidebar upper right
 * Rich cards with hero images, warm design
 */
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { BookOpen, Sparkles, Users, ExternalLink, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const AUTHOR_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/paul-wagner-bio_14ff429f.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/journal-morning-light-dZqVkwqgfEqPNiPNSMqRYL.webp";

function getCategory(slug: string): string {
  if (slug.includes("thyroid") || slug.includes("inflammatory") || slug.includes("nervine") || slug.includes("apothecary") || slug.includes("herb") || slug.includes("adaptogen") || slug.includes("supplement") || slug.includes("healing") || slug.includes("wellness") || slug.includes("ayurved") || slug.includes("detox") || slug.includes("immune") || slug.includes("gut") || slug.includes("sleep") || slug.includes("anxiety") || slug.includes("stress-relief") || slug.includes("anti-") || slug.includes("holistic") || slug.includes("natural-remed") || slug.includes("medicin")) return "Health & Wellness";
  if (slug.includes("tarot") || slug.includes("spread") || slug.includes("daily") || slug.includes("practice") || slug.includes("choose") || slug.includes("cleanse") || slug.includes("clearing") || slug.includes("journal") || slug.includes("decision")) return "Practice";
  if (slug.includes("jung") || slug.includes("campbell") || slug.includes("hero") || slug.includes("archetype") || slug.includes("shadow") || slug.includes("myth") || slug.includes("symbol") || slug.includes("alchemy")) return "Philosophy";
  if (slug.includes("intuition") || slug.includes("emotion") || slug.includes("fear") || slug.includes("ego") || slug.includes("mirror") || slug.includes("wishful") || slug.includes("embodied") || slug.includes("body")) return "Inner Work";
  return "Foundation";
}

const categories = ["All", "Foundation", "Practice", "Philosophy", "Inner Work", "Health & Wellness"];

export default function Articles() {
  const [active, setActive] = useState("All");

  // Only show published articles (exclude drafts not yet past their scheduledDate)
  const publishedArticles = articles.filter((a) => {
    if (!a.status || a.status === 'published') return true;
    if (a.status === 'draft' && a.scheduledDate) {
      return new Date(a.scheduledDate) <= new Date();
    }
    return false;
  });

  const filtered = active === "All"
    ? publishedArticles
    : publishedArticles.filter((a) => getCategory(a.slug) === active);

  return (
    <Layout>
      <SEO
        title="Articles"
        description="Practical, soulful articles on oracle cards, intuition, archetypes, and the art of self-inquiry. 30 years of wisdom, no fluff."
        url="/articles"
      />

      {/* Page Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 35vw, 360px)" }}>
        <img src={HERO_IMG} alt="Articles" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.15 0.04 310 / 0.4) 0%, oklch(0.15 0.04 310 / 0.75) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8 lg:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.82 0.12 75)" }}
              >
                {publishedArticles.length} Articles
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.15,
                  textShadow: "0 2px 20px oklch(0.1 0.04 310 / 0.5)",
                }}
              >
                The Library
              </h1>
              <p
                className="text-base lg:text-lg max-w-xl"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "oklch(0.90 0.02 75 / 0.85)",
                  lineHeight: 1.6,
                }}
              >
                Everything I've learned in thirty years at the table, written for people who want the insight without the incense.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container pt-8 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
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

      {/* 2-Column: Articles Grid + Sidebar */}
      <section className="container py-8 lg:py-12 pb-20 lg:pb-28">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Articles Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
                >
                  <Link href={`/articles/${article.slug}`} className="block group h-full">
                    <div
                      className="rounded-2xl overflow-hidden h-full transition-all duration-400 group-hover:-translate-y-1"
                      style={{
                        background: "oklch(0.98 0.01 75)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                        boxShadow: "0 2px 12px oklch(0.78 0.14 75 / 0.06)",
                      }}
                    >
                      {/* Card Image */}
                      <div className="relative overflow-hidden" style={{ height: "180px" }}>
                        <img
                          src={article.heroImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(to top, oklch(0.15 0.04 310 / 0.3) 0%, transparent 50%)",
                          }}
                        />
                        {/* Category badge */}
                        <span
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.6rem] tracking-[0.1em] uppercase backdrop-blur-sm"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 600,
                            background: "oklch(0.98 0.01 75 / 0.85)",
                            color: "oklch(0.45 0.08 310)",
                          }}
                        >
                          {getCategory(article.slug)}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={12} style={{ color: "oklch(0.60 0.06 310)" }} />
                          <p
                            className="text-xs tracking-[0.1em] uppercase"
                            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.60 0.06 310)" }}
                          >
                            {article.readingTime}
                          </p>
                        </div>
                        <h3
                          className="text-base mb-2 transition-colors duration-300 group-hover:text-amber-700"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 600,
                            color: "oklch(0.28 0.06 310)",
                            lineHeight: 1.3,
                          }}
                        >
                          {article.title}
                        </h3>
                        <p
                          className="text-sm line-clamp-3"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "oklch(0.48 0.03 310)",
                            lineHeight: 1.6,
                          }}
                        >
                          {article.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-1">
                          <span
                            className="text-xs tracking-wide transition-all duration-300 group-hover:gap-2 inline-flex items-center gap-1"
                            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                          >
                            Read article <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Count */}
            <div className="text-center mt-10">
              <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "oklch(0.60 0.04 310)" }}>
                Showing {filtered.length} of {publishedArticles.length} articles
              </p>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-[280px] shrink-0"
          >
            <div className="lg:sticky lg:top-28 space-y-6">

              {/* Author Card */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "linear-gradient(135deg, oklch(0.96 0.02 75 / 0.8), oklch(0.94 0.03 310 / 0.5))",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  boxShadow: "0 4px 20px oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <img
                  src={AUTHOR_PHOTO}
                  alt="Paul Wagner"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  style={{ border: "3px solid oklch(0.78 0.14 75 / 0.3)" }}
                />
                <h3
                  className="text-lg mb-1"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.30 0.08 310)" }}
                >
                  Paul Wagner
                </h3>
                <p
                  className="text-xs tracking-[0.1em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.55 0.06 310)" }}
                >
                  Intuitive &middot; Author &middot; Guide
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-body)", color: "oklch(0.40 0.04 310)" }}
                >
                  30+ years exploring oracle cards, Jungian archetypes, and the sacred art of self-inquiry. Creator of The Shankara Oracle and The Personality Cards.
                </p>
                <a
                  href="https://paulwagner.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:gap-2"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "oklch(0.78 0.14 75)" }}
                >
                  PaulWagner.com <ExternalLink size={11} />
                </a>
              </div>

              {/* Explore Links */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(0.97 0.01 75 / 0.6)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                }}
              >
                <h4
                  className="text-xs tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "oklch(0.50 0.06 310)" }}
                >
                  Explore
                </h4>
                <div className="space-y-3">
                  <a
                    href="https://theshankaraexperience.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <Sparkles size={14} style={{ color: "oklch(0.70 0.14 75)" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:text-amber-700"
                        style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.10 310)" }}
                      >
                        The Shankara Oracle
                      </p>
                      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "oklch(0.55 0.04 310)" }}>
                        A profound divination experience
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://thepersonalitycards.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <BookOpen size={14} style={{ color: "oklch(0.70 0.14 75)" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:text-amber-700"
                        style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.10 310)" }}
                      >
                        The Personality Cards
                      </p>
                      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "oklch(0.55 0.04 310)" }}>
                        Explore your inner archetypes
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://paulwagner.com/readings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <Users size={14} style={{ color: "oklch(0.70 0.14 75)" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:text-amber-700"
                        style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.10 310)" }}
                      >
                        Sessions & Readings
                      </p>
                      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "oklch(0.55 0.04 310)" }}>
                        Private intuitive guidance
                      </p>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </motion.aside>
        </div>
      </section>
    </Layout>
  );
}

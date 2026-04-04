/*
 * ArticlePage — Sacred Warmth
 * 2-column layout: article body left, sticky author sidebar right
 * Full hero image, rich typography, prev/next navigation
 * Fetches articles from /api/articles (MySQL-backed)
 */
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { useArticles, useArticle } from "@/hooks/useArticles";
import { ArticlePageSkeleton } from "@/components/ArticleSkeleton";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, Users, ExternalLink } from "lucide-react";
import { useEffect, useMemo } from "react";

const AUTHOR_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/paul-wagner-bio_14ff429f.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { article, loading: articleLoading } = useArticle(slug);
  const { articles, loading: articlesLoading } = useArticles();

  // Compute prev/next from the full articles list
  const { prev, next, sidebarArticles } = useMemo(() => {
    if (!articles.length || !slug) return { prev: null, next: null, sidebarArticles: [] };
    const idx = articles.findIndex((a) => a.slug === slug);
    return {
      prev: idx > 0 ? articles[idx - 1] : null,
      next: idx >= 0 && idx < articles.length - 1 ? articles[idx + 1] : null,
      sidebarArticles: articles.filter((a) => a.slug !== slug).slice(0, 4),
    };
  }, [articles, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (articleLoading) {
    return (
      <Layout>
        <ArticlePageSkeleton />
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.12 320)" }}>
            Article not found
          </h1>
          <Link href="/articles" className="text-sm" style={{ color: "oklch(0.78 0.14 75)" }}>
            Back to articles
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        url={`/articles/${article.slug}`}
        type="article"
        article={{
          section: "Oracle Education",
          tags: ["oracle cards", "self-inquiry", "intuition", "card reading"],
          readingTime: article.readingTime,
          wordCount: article.content.split(/\s+/).length,
          publishedTime: "2026-03-27",
        }}
      />

      {/* Hero Image */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 45vw, 480px)" }}>
        <img
          src={article.heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.15 0.04 310 / 0.3) 0%, oklch(0.15 0.04 310 / 0.7) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8 lg:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase mb-4 transition-all duration-300 hover:gap-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.88 0.12 75)" }}
              >
                <ArrowLeft size={14} /> All Articles
              </Link>
              <p
                className="text-xs tracking-[0.15em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.82 0.10 75 / 0.8)" }}
              >
                {article.readingTime}
              </p>
              <h1
                className="text-2xl sm:text-3xl lg:text-[2.5rem]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.2,
                  textShadow: "0 2px 20px oklch(0.1 0.04 310 / 0.5)",
                }}
              >
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2-Column Layout: Article + Sticky Sidebar */}
      <section className="container py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Main Article Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* Excerpt / Lede */}
            <p
              className="text-lg lg:text-xl mb-8 leading-relaxed"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "oklch(0.45 0.08 310)",
                borderLeft: "3px solid oklch(0.78 0.14 75 / 0.4)",
                paddingLeft: "1.25rem",
              }}
            >
              {article.excerpt}
            </p>

            <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, oklch(0.78 0.14 75 / 0.3), transparent)" }} />

            {/* Article Body */}
            <div className="article-prose drop-cap">
              <MarkdownRenderer content={article.content} />
            </div>

            {/* End ornament */}
            <div className="text-center py-8">
              <img src={MANDALA_IMG} alt="" className="w-10 h-10 mx-auto opacity-25" />
            </div>

            {/* Prev / Next */}
            <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.3), transparent)" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/articles/${prev.slug}`} className="block group">
                  <div
                    className="p-5 rounded-xl transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.06)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                    }}
                  >
                    <p
                      className="text-xs tracking-[0.1em] uppercase mb-2 flex items-center gap-1"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.60 0.04 310)" }}
                    >
                      <ArrowLeft size={12} /> Previous
                    </p>
                    <p
                      className="text-sm transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.35 0.12 320)", lineHeight: 1.3 }}
                    >
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {next ? (
                <Link href={`/articles/${next.slug}`} className="block group text-right">
                  <div
                    className="p-5 rounded-xl transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.06)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                    }}
                  >
                    <p
                      className="text-xs tracking-[0.1em] uppercase mb-2 flex items-center gap-1 justify-end"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.60 0.04 310)" }}
                    >
                      Next <ArrowRight size={12} />
                    </p>
                    <p
                      className="text-sm transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.35 0.12 320)", lineHeight: 1.3 }}
                    >
                      {next.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </motion.div>

          {/* Sticky Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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

              {/* Recent Articles */}
              {!articlesLoading && sidebarArticles.length > 0 && (
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
                    More Articles
                  </h4>
                  <div className="space-y-3">
                    {sidebarArticles.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/articles/${a.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3 items-start">
                          <img
                            src={a.heroImage}
                            alt={a.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 transition-transform duration-300 group-hover:scale-105"
                          />
                          <p
                            className="text-sm leading-snug transition-colors duration-300 group-hover:text-amber-700"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "oklch(0.35 0.10 310)" }}
                          >
                            {a.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.aside>
        </div>
      </section>
    </Layout>
  );
}

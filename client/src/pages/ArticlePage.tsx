/*
 * ArticlePage — Sacred Warmth
 * Beautiful article reading experience with golden accents, drop cap, prev/next
 */
import Layout from "@/components/Layout";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const idx = articles.findIndex((a) => a.slug === slug);
  const article = articles[idx];
  const prev = idx > 0 ? articles[idx - 1] : null;
  const next = idx < articles.length - 1 ? articles[idx + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
      {/* Article header */}
      <section className="container py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase mb-8 transition-all duration-300 hover:gap-3"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
          >
            <ArrowLeft size={14} /> All Articles
          </Link>

          <p
            className="text-xs tracking-[0.15em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.60 0.04 310)" }}
          >
            {article.readingTime}
          </p>

          <h1
            className="text-3xl sm:text-4xl lg:text-[2.75rem] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              color: "oklch(0.22 0.04 310)",
              lineHeight: 1.2,
            }}
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, oklch(0.78 0.14 75 / 0.4), transparent)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.78 0.14 75 / 0.5)" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.4))" }} />
          </div>
        </motion.div>
      </section>

      {/* Article body */}
      <section className="container pb-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="article-prose drop-cap">
            <MarkdownRenderer content={article.content} />
          </div>
        </motion.div>
      </section>

      {/* End ornament */}
      <section className="container pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <img src={MANDALA_IMG} alt="" className="w-10 h-10 mx-auto opacity-25" />
        </div>
      </section>

      {/* Prev / Next */}
      <section className="container pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto">
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
                    className="text-sm transition-colors duration-300 group-hover:text-plum"
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
                    className="text-sm transition-colors duration-300 group-hover:text-plum"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.35 0.12 320)", lineHeight: 1.3 }}
                  >
                    {next.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

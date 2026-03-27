/*
 * Article Page — The Oracle Lover
 * 700px reading column, bold headline in Clash Display
 * Pull quotes with copper left border and dusty rose bg
 * Reading time in Space Mono at top
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { articles } from "@/data/articles";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articles[articleIndex];

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#4A2040' }}>
            Article not found
          </h1>
          <Link href="/articles">
            <span style={{ color: '#B87333', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              Back to articles
            </span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-12 lg:py-20">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/articles">
              <span
                className="inline-flex items-center gap-1 mb-8"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: '#B87333',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                <ArrowLeft size={14} /> All articles
              </span>
            </Link>
          </motion.div>

          {/* Reading time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="reading-time">{article.readingTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              color: '#4A2040',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              lineHeight: 1.15,
            }}
          >
            {article.title}
          </motion.h1>

          <div className="copper-divider" style={{ marginBottom: '2.5rem' }} />

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MarkdownRenderer content={article.content} />
          </motion.div>

          {/* Prev / Next Navigation */}
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row justify-between gap-6"
            style={{ borderTop: '1px solid #E8D5D0' }}
          >
            {prevArticle ? (
              <Link href={`/articles/${prevArticle.slug}`}>
                <div className="flex items-start gap-2 group" style={{ maxWidth: '280px' }}>
                  <ArrowLeft size={16} style={{ color: '#B87333', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: '#B87333',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Previous
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: '#4A2040',
                        margin: '0.25rem 0 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {prevArticle.title}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link href={`/articles/${nextArticle.slug}`}>
                <div className="flex items-start gap-2 group text-right sm:ml-auto" style={{ maxWidth: '280px' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: '#B87333',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Next
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        color: '#4A2040',
                        margin: '0.25rem 0 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {nextArticle.title}
                    </p>
                  </div>
                  <ArrowRight size={16} style={{ color: '#B87333', marginTop: '4px', flexShrink: 0 }} />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}

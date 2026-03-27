/*
 * Start Here Page — The Oracle Lover
 * Curated starting point for new visitors
 * 5-6 recommended articles with descriptions
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";

const JOURNAL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/journal-writing-AvUjuWdzXLBcZAHkKdWNgF.webp";

// Curated article slugs for beginners
const curatedSlugs = [
  {
    slug: "how-to-read-oracle-cards-without-losing-your-mind",
    why: "If you've never picked up an oracle deck — or if you have and immediately felt like you were doing it wrong — start here. This is the foundation, stripped of everything unnecessary.",
  },
  {
    slug: "tarot-vs-oracle-decks-whats-actually-different",
    why: "The question everyone asks first, answered without the usual gatekeeping. Understanding the difference between these two systems will save you months of confusion.",
  },
  {
    slug: "the-spread-isnt-the-point-the-question-is",
    why: "Most people obsess over spreads when they should be obsessing over questions. This piece will change how you approach every reading you do from here on out.",
  },
  {
    slug: "how-to-build-a-daily-card-practice-that-actually-sticks",
    why: "You don't need an hour. You don't need a ritual. You need two minutes and a willingness to be honest. This is the practical guide to building a practice that compounds.",
  },
  {
    slug: "oracle-cards-are-not-fortune-telling-theyre-mirror-holding",
    why: "The single most important distinction in this entire practice. Once you understand what oracle cards actually do — and what they don't — everything else falls into place.",
  },
  {
    slug: "the-difference-between-intuition-and-wishful-thinking",
    why: "The skill that separates someone who reads cards from someone who uses cards to lie to themselves. This one's uncomfortable. That's how you know it matters.",
  },
];

export default function StartHere() {
  return (
    <Layout>
      <section className="container py-12 lg:py-20">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                color: '#4A2040',
                marginBottom: '0.5rem',
              }}
            >
              Start Here
            </h1>
            <div className="copper-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={JOURNAL_IMAGE}
              alt="Open journal with card spread notes and oracle cards on a warm desk"
              style={{
                width: '100%',
                borderRadius: '12px',
                marginTop: '2rem',
                marginBottom: '2.5rem',
                boxShadow: '0 8px 32px rgba(74, 32, 64, 0.12)',
              }}
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: '#2A1025', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              There are twenty-five articles on this site, and they don't need to be read in any particular order. But if you're new to oracle work — or if you've been doing it for a while and suspect you might be missing something fundamental — these six pieces will give you the strongest foundation I know how to build.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', color: '#2A1025', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Read them slowly. Sit with the ones that make you uncomfortable. The discomfort is where the real work lives.
            </p>
          </motion.div>

          {/* Curated Articles */}
          <div className="flex flex-col gap-8">
            {curatedSlugs.map((item, i) => {
              const article = articles.find((a) => a.slug === item.slug);
              if (!article) return null;

              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/articles/${item.slug}`}>
                    <div
                      className="p-6 transition-all duration-300"
                      style={{
                        background: '#E8D5D0',
                        borderRadius: '12px',
                        borderLeft: '4px solid #B87333',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 32, 64, 0.12)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#4A2040',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {article.title}
                        </h3>
                        <span className="reading-time whitespace-nowrap mt-1">
                          {article.readingTime}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9375rem',
                          color: '#4A2040',
                          lineHeight: 1.6,
                          margin: 0,
                          opacity: 0.85,
                        }}
                      >
                        {item.why}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 mt-3"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#B87333', textTransform: 'uppercase' }}
                      >
                        Read this one <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

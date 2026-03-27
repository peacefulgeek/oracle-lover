/*
 * Articles Page — The Oracle Lover
 * 2-column grid of article cards
 * Each card: rounded corners, title, excerpt, reading time
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { articles } from "@/data/articles";

const SPREAD_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/card-spread-table-X7bZx9NNqiZ2EzrumYtjxT.webp";

export default function Articles() {
  return (
    <Layout>
      {/* Header with image */}
      <section className="container py-12 lg:py-16">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              The Articles
            </h1>
            <div className="copper-divider" />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: '#2A1025',
                lineHeight: 1.7,
                marginTop: '1.5rem',
                maxWidth: '600px',
              }}
            >
              Thirty years of card-flipping distilled into actually useful writing. Each piece is designed to teach you something you can use at the table today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <img
              src={SPREAD_IMAGE}
              alt="Oracle card spread on linen tablecloth with candle and sacred stones"
              style={{
                width: '100%',
                borderRadius: '12px',
                marginTop: '2rem',
                marginBottom: '1rem',
                boxShadow: '0 8px 32px rgba(74, 32, 64, 0.12)',
                maxHeight: '360px',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="container pb-16 lg:pb-20">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <div
                  className="p-6 h-full transition-all duration-300"
                  style={{
                    background: '#E8D5D0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(74, 32, 64, 0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 32, 64, 0.14)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 32, 64, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="reading-time">{article.readingTime}</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#4A2040',
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: '#4A2040',
                      lineHeight: 1.5,
                      margin: 0,
                      opacity: 0.8,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/*
 * Home Page — The Oracle Lover
 * Design: "The Reading Table" — Warm Domestic Tableau
 * Hero: 60% viewport, warm cream bg, text left, image right
 * Three card blocks below, then recent articles
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/hero-oracle-hands-FZghDUYeC5Ncq9jVM8Kjnr.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function Home() {
  const recentArticles = articles.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section — 60vh */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '60vh', background: '#FFF8EE' }}
      >
        <div className="container flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-12 lg:py-20">
          {/* Left — Text */}
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5vw, 2.75rem)',
                color: '#4A2040',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}
            >
              The Oracle Lover
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                color: '#4A2040',
                marginBottom: '1.5rem',
                fontWeight: 400,
              }}
            >
              Practical oracle education. No woo required.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                color: '#2A1025',
                lineHeight: 1.7,
                maxWidth: '500px',
              }}
            >
              I've spent thirty years with cards in my hands. Not because
              I believe they're magic — but because they're the best mirror
              I've ever found. This site is everything I've learned about
              using divination systems to actually know yourself.
            </p>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={HERO_IMAGE}
              alt="Hands holding oracle cards at a warm candlelit table"
              className="w-full h-auto object-cover"
              style={{
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(74, 32, 64, 0.15)',
              }}
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* Three Card Blocks */}
      <section className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              title: "Start Here",
              desc: "New to oracle work? I wrote this for you.",
              href: "/start-here",
              internal: true,
            },
            {
              title: "The Articles",
              desc: "Thirty years of card-flipping distilled into actually useful writing.",
              href: "/articles",
              internal: true,
            },
            {
              title: "The Oracle",
              desc: "The system I built — 300+ cards, a board, sacred stones, and zero gatekeeping.",
              href: "https://theshankaraexperience.com",
              internal: false,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              {card.internal ? (
                <Link href={card.href}>
                  <div
                    className="group p-8 h-full transition-all duration-300"
                    style={{
                      background: '#E8D5D0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(74, 32, 64, 0.08)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 32, 64, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 32, 64, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#4A2040',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p style={{ color: '#4A2040', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      {card.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#B87333' }}
                    >
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ) : (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="no-underline hover:no-underline">
                  <div
                    className="group p-8 h-full transition-all duration-300"
                    style={{
                      background: '#E8D5D0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(74, 32, 64, 0.08)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 32, 64, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 32, 64, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#4A2040',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p style={{ color: '#4A2040', fontSize: '1rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                      {card.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#B87333' }}
                    >
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section
        className="py-16 lg:py-20"
        style={{ background: '#FFF8EE' }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 600,
              color: '#4A2040',
              marginBottom: '2rem',
            }}
          >
            Recent Writing
          </h2>
          <div className="copper-divider" style={{ marginBottom: '2rem' }} />
          <div className="flex flex-col gap-6">
            {recentArticles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link href={`/articles/${article.slug}`}>
                  <div
                    className="flex items-baseline justify-between gap-4 py-3 group"
                    style={{ borderBottom: '1px solid #E8D5D0', textDecoration: 'none' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.125rem',
                        color: '#4A2040',
                        transition: 'color 0.2s',
                      }}
                      className="group-hover:text-[#B87333]"
                    >
                      {article.title}
                    </span>
                    <span className="reading-time whitespace-nowrap">
                      {article.readingTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/articles">
              <span
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: '#B87333',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                All articles <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

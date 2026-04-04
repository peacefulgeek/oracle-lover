/*
 * Start Here — Sacred Warmth
 * Curated pathway for newcomers with numbered steps and warm imagery
 */
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";

const JOURNAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/journal-morning-light-hSaczLzYiDM9V2VLP2ipAc.webp";

const curatedSlugs = [
  { slug: "how-to-read-oracle-cards-without-losing-your-mind", step: "Start with the basics" },
  { slug: "oracle-cards-are-not-fortune-telling-theyre-mirror-holding", step: "Understand what you're holding" },
  { slug: "tarot-vs-oracle-decks-whats-actually-different", step: "Know the difference" },
  { slug: "the-four-decks-that-changed-how-i-read", step: "Choose your deck wisely" },
  { slug: "how-to-build-a-daily-card-practice-that-actually-sticks", step: "Build a daily practice" },
  { slug: "the-spread-isnt-the-point-the-question-is", step: "Learn the essential spread" },
];

export default function StartHere() {
  const curatedArticles = curatedSlugs
    .map((item) => ({ ...item, article: articles.find((a) => a.slug === item.slug) }))
    .filter((item) => item.article);

  return (
    <Layout>
      <SEO title="Start Here" description="Six articles, read in order, that will take you from I just bought a deck to I trust what I am seeing. Your guided path into oracle card reading." image="https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/journal-morning-light-hSaczLzYiDM9V2VLP2ipAc.webp" url="/start-here" />
      {/* Hero */}
      <section className="container py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
            >
              Start Here
            </p>
            <h1
              className="text-4xl lg:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
            >
              The Path Begins Here
            </h1>
            <p
              className="text-lg max-w-lg"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.40 0.04 310)", lineHeight: 1.8 }}
            >
              Six articles, read in order, that will take you from "I just bought a deck"
              to "I trust what I'm seeing." No prerequisites. No spiritual homework.
              Just you, the cards, and a willingness to pay attention.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-xl overflow-hidden warm-glow">
              <img
                src={JOURNAL_IMG}
                alt="Morning journaling with oracle cards"
                className="w-full object-cover"
                style={{ aspectRatio: "3/2" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curated articles */}
      <section className="container pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto">
          {curatedArticles.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/articles/${item.slug}`} className="block group">
                <div
                  className="flex gap-6 py-8 transition-all duration-300"
                  style={{ borderBottom: "1px solid oklch(0.88 0.03 75)" }}
                >
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        background: "oklch(0.78 0.14 75 / 0.1)",
                        color: "oklch(0.65 0.14 70)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs tracking-[0.1em] uppercase mb-2"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                    >
                      {item.step}
                    </p>
                    <h3
                      className="text-xl lg:text-2xl mb-2 transition-colors duration-300 group-hover:text-plum"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)", lineHeight: 1.3 }}
                    >
                      {item.article!.title}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
                    >
                      {item.article!.excerpt}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs tracking-wide transition-all duration-300 group-hover:gap-3"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                    >
                      Read article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* After the path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <div className="golden-divider mb-8">
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "oklch(0.50 0.04 310)" }}>
              then keep going
            </span>
          </div>
          <p
            className="text-base mb-8"
            style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
          >
            Once you've read these six, you'll have a solid foundation. The remaining nineteen articles
            go deeper — into philosophy, advanced techniques, and the inner work that makes the outer practice sing.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "oklch(0.35 0.12 320)",
              color: "oklch(0.96 0.02 80)",
            }}
          >
            All 25 Articles <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}

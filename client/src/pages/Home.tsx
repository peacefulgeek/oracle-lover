/*
 * Home — Sacred Warmth
 * Full-bleed hero with overlay, three pathway cards, featured articles, cosmos quote section
 */
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/hero-sacred-light-23Gw9cKdGiYwbrdJyc4aEn.webp";
const SPREAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/oracle-spread-velvet-VHEbcakoEJWsWxyeQAZkkY.webp";
const JOURNAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/journal-morning-light-hSaczLzYiDM9V2VLP2ipAc.webp";
const ALTAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/sacred-altar-space-PrNiuWq7793t8dgostFCak.webp";
const COSMOS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/cosmos-banner-BZWh8eZso5M5YezartHnWc.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

const recentArticles = articles.slice(0, 6);

const pathways = [
  {
    icon: BookOpen,
    title: "Start Here",
    desc: "New to oracle work? Six essential articles that build a foundation without the overwhelm.",
    href: "/start-here",
    img: JOURNAL_IMG,
  },
  {
    icon: Compass,
    title: "The Articles",
    desc: "Twenty-five pieces of practical wisdom from thirty years at the table. No fluff, no filler.",
    href: "/articles",
    img: SPREAD_IMG,
  },
  {
    icon: Sparkles,
    title: "The Oracle",
    desc: "The system I built — 300+ cards, a board, sacred stones, and zero gatekeeping.",
    href: "/the-oracle",
    img: ALTAR_IMG,
  },
];

export default function Home() {
  return (
    <Layout>
      {/* ═══════════════════════════════════════════════════
          HERO — Full-bleed image with warm overlay
      ═══════════════════════════════════════════════════ */}
      <section className="relative -mt-20 lg:-mt-24 min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Oracle cards spread on velvet with candles and crystals"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, oklch(0.22 0.08 310 / 0.75) 0%, oklch(0.35 0.12 320 / 0.55) 40%, oklch(0.22 0.08 310 / 0.65) 100%)",
            }}
          />
          {/* Bottom fade to cream */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: "linear-gradient(to top, oklch(0.96 0.02 80), transparent)" }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
              >
                Practical Oracle Education
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "oklch(0.96 0.02 80)",
                lineHeight: 1.1,
              }}
            >
              The Oracle
              <br />
              <span style={{ color: "oklch(0.78 0.14 75)" }}>Lover</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="text-lg lg:text-xl mb-10 max-w-lg"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "oklch(0.96 0.02 80 / 0.8)",
                lineHeight: 1.7,
              }}
            >
              Thirty years of sitting with the cards. Ten thousand readings.
              Everything I've learned, distilled into writing that actually helps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/start-here"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 hover:gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  background: "oklch(0.78 0.14 75)",
                  color: "oklch(0.18 0.04 280)",
                }}
              >
                Begin Here <ArrowRight size={16} />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 border"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  borderColor: "oklch(0.96 0.02 80 / 0.25)",
                  color: "oklch(0.96 0.02 80 / 0.9)",
                  background: "oklch(0.96 0.02 80 / 0.05)",
                }}
              >
                Read the Articles
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          THREE PATHWAYS — Rich cards with images
      ═══════════════════════════════════════════════════ */}
      <section className="container py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} custom={0} className="golden-divider mb-8">
            <img src={MANDALA_IMG} alt="" className="w-10 h-10 opacity-60" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl lg:text-4xl mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
          >
            Where Would You Like to Begin?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
          >
            Three doorways into the same room. Pick the one that calls to you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pathways.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
            >
              <Link href={p.href} className="block group">
                <div className="sacred-card overflow-hidden">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, oklch(0.98 0.015 80) 0%, transparent 60%)" }}
                    />
                    {/* Icon badge */}
                    <div
                      className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "oklch(0.78 0.14 75 / 0.9)", color: "oklch(0.18 0.04 280)" }}
                    >
                      <p.icon size={18} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 pt-2">
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
                    >
                      {p.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs tracking-wide uppercase transition-all duration-300 group-hover:gap-3"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                    >
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COSMOS QUOTE — Full-bleed with starfield
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={COSMOS_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "oklch(0.18 0.04 280 / 0.7)" }} />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={MANDALA_IMG} alt="" className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <blockquote
              className="text-2xl lg:text-3xl max-w-3xl mx-auto mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "oklch(0.96 0.02 80 / 0.9)",
                lineHeight: 1.5,
              }}
            >
              "The cards are not a test. They are a conversation with the part of you
              that already knows what you're afraid to say out loud."
            </blockquote>
            <p
              className="text-sm tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-body)", color: "oklch(0.78 0.14 75 / 0.8)" }}
            >
              — The Oracle Lover
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          RECENT ARTICLES — Magazine-style grid
      ═══════════════════════════════════════════════════ */}
      <section className="container py-20 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2
                className="text-3xl lg:text-4xl mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
              >
                Recent Writing
              </h2>
              <p
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)" }}
              >
                The latest from thirty years at the table.
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm tracking-wide transition-all duration-300 hover:gap-3"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recentArticles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i % 3}
            >
              <Link href={`/articles/${article.slug}`} className="block group">
                <article className="sacred-card p-6 h-full flex flex-col">
                  {/* Category tag */}
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
                      {article.slug.includes('tarot') || article.slug.includes('spread') ? 'Practice' : article.slug.includes('jung') || article.slug.includes('campbell') || article.slug.includes('hero') ? 'Philosophy' : 'Foundation'}
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
                      {article.readingTime?.replace(' min read', '')} min read
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
      </section>

      {/* ═══════════════════════════════════════════════════
          CLOSING — Warm invitation
      ═══════════════════════════════════════════════════ */}
      <section className="container pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden"
        >
          <img src={JOURNAL_IMG} alt="" className="w-full h-64 lg:h-80 object-cover" />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "oklch(0.22 0.08 310 / 0.65)" }}
          >
            <div className="text-center px-6">
              <h2
                className="text-3xl lg:text-4xl mb-4"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.96 0.02 80)" }}
              >
                Pull Up a Chair
              </h2>
              <p
                className="text-base mb-8 max-w-md mx-auto"
                style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.96 0.02 80 / 0.75)", lineHeight: 1.7 }}
              >
                The table's set. The candle's lit. Start with the article that calls to you.
              </p>
              <Link
                href="/start-here"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 hover:gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  background: "oklch(0.78 0.14 75)",
                  color: "oklch(0.18 0.04 280)",
                }}
              >
                Start Here <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}

/*
 * The Oracle — Sacred Warmth
 * Showcase of The Shankara Oracle system with rich imagery
 */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SPREAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/oracle-spread-velvet-VHEbcakoEJWsWxyeQAZkkY.webp";
const ALTAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/sacred-altar-space-PrNiuWq7793t8dgostFCak.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";
const COSMOS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/cosmos-banner-BZWh8eZso5M5YezartHnWc.webp";

const decks = [
  { name: "Sacred Action Cards", desc: "Practical guidance for the moments when you know what you need to do but can't quite bring yourself to do it. These cards don't predict — they provoke." },
  { name: "Alchemy Cards", desc: "The transformation deck. Each card maps a stage of inner change — dissolution, purification, integration. For the work that happens beneath the surface." },
  { name: "Master Cards", desc: "Wisdom from the lineages — distilled, practical, and stripped of the usual reverence that keeps it at arm's length. These cards teach." },
  { name: "Release Cards", desc: "What are you holding that isn't yours? What story are you telling that stopped being true three years ago? These cards help you put it down." },
];

export default function TheOracle() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}>
              The Oracle
            </p>
            <h1 className="text-4xl lg:text-5xl mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
              The Shankara Oracle
            </h1>
            <p className="text-lg max-w-lg mb-8" style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.40 0.04 310)", lineHeight: 1.8 }}>
              Over 300 cards. Four distinct decks. A board. Sacred stones. And zero gatekeeping.
              This is the system I spent decades building — not to create followers, but to create
              people who don't need one.
            </p>
            <a
              href="https://theshankaraexperience.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 hover:gap-3"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, background: "oklch(0.78 0.14 75)", color: "oklch(0.18 0.04 280)" }}
            >
              Explore the Oracle <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="rounded-xl overflow-hidden warm-glow">
              <img src={SPREAD_IMG} alt="The Shankara Oracle cards spread on velvet" className="w-full object-cover" style={{ aspectRatio: "16/10" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Decks */}
      <section className="container py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <img src={MANDALA_IMG} alt="" className="w-12 h-12 mx-auto mb-6 opacity-40" />
          <h2 className="text-3xl lg:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
            Four Decks, One System
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}>
            Each deck addresses a different dimension of inquiry. Together, they create a conversation that no single deck could hold.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {decks.map((deck, i) => (
            <motion.div
              key={deck.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="sacred-card p-8"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-lg" style={{ fontFamily: "var(--font-display)", fontWeight: 700, background: "oklch(0.78 0.14 75 / 0.12)", color: "oklch(0.65 0.14 70)" }}>
                {i + 1}
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
                {deck.name}
              </h3>
              <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}>
                {deck.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sacred space image */}
      <section className="container pb-16 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-2xl overflow-hidden warm-glow max-w-4xl mx-auto">
          <img src={ALTAR_IMG} alt="Sacred altar space with oracle cards, crystals, and candles" className="w-full object-cover" style={{ aspectRatio: "4/3", maxHeight: "500px" }} />
        </motion.div>
      </section>

      {/* Cosmos quote */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={COSMOS_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "oklch(0.18 0.04 280 / 0.75)" }} />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <blockquote className="text-2xl lg:text-3xl mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontStyle: "italic", color: "oklch(0.96 0.02 80 / 0.9)", lineHeight: 1.5 }}>
              "Every card system is a technology for self-knowledge. This one just happens to be the most comprehensive mirror I know how to build."
            </blockquote>
            <p className="text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-body)", color: "oklch(0.78 0.14 75 / 0.8)" }}>
              — The Oracle Lover
            </p>
          </motion.div>
        </div>
      </section>

      {/* Also explore */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
            Also Explore
          </h2>
          <p className="text-base mb-10" style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}>
            Beyond The Shankara Oracle, I've created additional systems for different kinds of inquiry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer" className="sacred-card p-6 text-left block group">
              <h3 className="text-lg mb-2 transition-colors duration-300 group-hover:text-plum" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
                The Personality Cards
              </h3>
              <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.6 }}>
                A system for understanding the masks we wear and the selves we've constructed.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs tracking-wide" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}>
                Visit <ArrowUpRight size={12} />
              </span>
            </a>
            <a href="https://theshankaraoracleapp.com" target="_blank" rel="noopener noreferrer" className="sacred-card p-6 text-left block group">
              <h3 className="text-lg mb-2 transition-colors duration-300 group-hover:text-plum" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}>
                The Oracle App
              </h3>
              <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.6 }}>
                A digital companion for daily practice — structured readings, journaling prompts, and more.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs tracking-wide" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}>
                Visit <ArrowUpRight size={12} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

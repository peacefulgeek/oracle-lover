/*
 * Connect — Sacred Warmth
 * Ways to connect, with warm imagery and sacred design
 */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Sparkles, MessageCircle } from "lucide-react";

const CONNECT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/connect-warmth-JTVMkhHyr3vS65ArdVPmL4.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

const connections = [
  {
    icon: MessageCircle,
    title: "Private Sessions",
    desc: "One-on-one oracle readings and intuitive guidance sessions. Thirty years of experience, focused entirely on your question.",
    href: "https://paulwagner.com",
    cta: "Learn More",
  },
  {
    icon: Sparkles,
    title: "The Shankara Oracle",
    desc: "The full system — 300+ cards, four decks, a board, sacred stones. Everything you need for deep self-inquiry.",
    href: "https://theshankaraexperience.com",
    cta: "Explore",
  },
  {
    icon: BookOpen,
    title: "The Oracle App",
    desc: "Daily practice in your pocket. Structured readings, journaling prompts, and a growing library of oracle wisdom.",
    href: "https://sovereign.love",
    cta: "Try the App",
  },
];

export default function Connect() {
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
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
            >
              Connect
            </p>
            <h1
              className="text-4xl lg:text-5xl mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
            >
              Let's Continue the Conversation
            </h1>
            <p
              className="text-lg max-w-lg"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.40 0.04 310)", lineHeight: 1.8 }}
            >
              The articles are the beginning. If you want to go deeper — through private sessions,
              the full oracle system, or the app — here's where to find me.
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
                src={CONNECT_IMG}
                alt="Two people sharing an intimate oracle card reading by candlelight"
                className="w-full object-cover"
                style={{ aspectRatio: "16/10" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Connection cards */}
      <section className="container pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="golden-divider mb-12">
            <img src={MANDALA_IMG} alt="" className="w-8 h-8 opacity-40" />
          </div>

          <div className="flex flex-col gap-6">
            {connections.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="sacred-card p-8 flex gap-6 items-start group block"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "oklch(0.78 0.14 75 / 0.12)", color: "oklch(0.65 0.14 70)" }}
                >
                  <item.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl mb-2 transition-colors duration-300 group-hover:text-plum"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ fontFamily: "var(--font-body)", color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
                  >
                    {item.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs tracking-wide uppercase transition-all duration-300 group-hover:gap-3"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
                  >
                    {item.cta} <ArrowUpRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="container pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <img src={MANDALA_IMG} alt="" className="w-14 h-14 mx-auto mb-6 opacity-30" />
          <blockquote
            className="text-2xl lg:text-3xl mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "oklch(0.35 0.12 320)",
              lineHeight: 1.5,
            }}
          >
            "The best readings happen when two people are willing to sit in the question
            without rushing toward an answer."
          </blockquote>
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-body)", color: "oklch(0.60 0.04 310)" }}
          >
            I'm at the table. Pull up a chair.
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}

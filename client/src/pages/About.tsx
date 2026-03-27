/*
 * About — Sacred Warmth
 * Editorial layout with author photo, full bio, links to all properties
 */
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Users, ExternalLink } from "lucide-react";

const AUTHOR_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/paul-wagner-bio_14ff429f.webp";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/about-sacred-hands-RgBz33DAQDf6YQazz5wy2j.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

export default function About() {
  return (
    <Layout>
      <SEO title="About" description="Thirty years at the table. Over ten thousand readings. The story behind The Oracle Lover and the systems I built for honest self-inquiry." image={ABOUT_IMG} url="/about" />

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 35vw, 360px)" }}>
        <img src={ABOUT_IMG} alt="Sacred oracle reading" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.15 0.04 310 / 0.35) 0%, oklch(0.15 0.04 310 / 0.75) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8 lg:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.82 0.12 75)" }}
              >
                About
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.15,
                  textShadow: "0 2px 20px oklch(0.1 0.04 310 / 0.5)",
                }}
              >
                Thirty Years at the Table
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Author Photo + Bio */}
      <section className="container py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left column — Photo + Links */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Author Photo */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "3px solid oklch(0.78 0.14 75 / 0.2)",
                  boxShadow: "0 8px 30px oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <img
                  src={AUTHOR_PHOTO}
                  alt="Paul Wagner"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              <div className="text-center">
                <h3
                  className="text-xl mb-1"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.30 0.08 310)" }}
                >
                  Paul Wagner
                </h3>
                <p
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.55 0.06 310)" }}
                >
                  Intuitive &middot; Author &middot; Guide
                </p>
              </div>

              <div className="flex justify-center">
                <img src={MANDALA_IMG} alt="" className="w-10 h-10 opacity-25" />
              </div>

              {/* Links Card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, oklch(0.96 0.02 75 / 0.8), oklch(0.94 0.03 310 / 0.5))",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  boxShadow: "0 4px 20px oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <h4
                  className="text-xs tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "oklch(0.50 0.06 310)" }}
                >
                  Explore My Work
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

                  <a
                    href="https://paulwagner.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "oklch(0.78 0.14 75 / 0.15)" }}
                    >
                      <ExternalLink size={14} style={{ color: "oklch(0.70 0.14 75)" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:text-amber-700"
                        style={{ fontFamily: "var(--font-display)", color: "oklch(0.35 0.10 310)" }}
                      >
                        PaulWagner.com
                      </p>
                      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "oklch(0.55 0.04 310)" }}>
                        Main site & full body of work
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — Full Bio */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="article-prose drop-cap">
              <p>
                There is something peculiar about spending three decades with a deck of cards in your hands — not as a gambler or a magician, but as someone who discovered, quite by accident, that symbolic systems have a way of showing you what you're not seeing. I didn't set out to become a card reader. I set out to understand myself, and the cards turned out to be the most honest mirror I'd ever encountered.
              </p>

              <p>
                I've done over ten thousand readings across multiple oracle and divination systems. Not because I'm chasing some number, but because that's what happens when you sit at the table long enough — people find you, and the work accumulates. Each reading taught me something the last one didn't, and after thirty years, the pattern is always the same: people already know. They just need a mirror that doesn't flinch.
              </p>

              <blockquote>
                <p>The space between knowing something intellectually and knowing it in your body is where all the real work happens.</p>
              </blockquote>

              <h2>The Systems I Built</h2>

              <p>
                Along the way, I built <a href="https://theshankaraexperience.com" target="_blank" rel="noopener noreferrer">The Shankara Oracle</a> — a comprehensive system with over 300 cards, a board, sacred stones, and four distinct decks: Sacred Action Cards, Alchemy Cards, Master Cards, and Release Cards. I also created <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer">The Personality Cards</a> and the Transcend Deck. Each system emerged from a different question I couldn't stop asking, and each one taught me something about the architecture of self-inquiry that I couldn't have learned any other way.
              </p>

              <h2>Before the Cards</h2>

              <p>
                Before the cards, there was Hollywood. I spent years as a writer in the entertainment industry — five Emmy Awards, which sounds impressive until you realize that the most meaningful work I've ever done happens at a kitchen table with a candle and a deck. I left that world because the cards asked better questions than any script I'd ever written. Best decision I ever made.
              </p>

              <p>
                I've written multiple books on spirituality, healing, and consciousness — not because I have all the answers, but because the process of writing is itself a form of reading. You lay the words down like cards and see what pattern emerges. The contemplative traditions all point to the same thing: what you're looking for is what's looking.
              </p>

              <h2>What I'm Doing Here</h2>

              <p>
                I'm not a guru. I'm not interested in being anyone's spiritual authority. I'm a person who got very good at one very specific thing — using symbolic systems to help people see what they're not seeing. That's it. No robes. No incense. (Okay, sometimes incense.)
              </p>

              <p>
                I'm based in Colorado, where the altitude is high and the pretension is low. I read cards, I write about reading cards, and I teach other people how to read cards without losing their minds in the process. If you want to go deeper, you can find <a href="https://paulwagner.com" target="_blank" rel="noopener noreferrer">my main site</a> or explore <a href="https://sovereign.love" target="_blank" rel="noopener noreferrer">the app I built</a> for people who want a more structured practice.
              </p>

              <p>
                But mostly, I'm here at the table. Pull up a chair.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

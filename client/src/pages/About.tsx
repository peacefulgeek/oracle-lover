/*
 * About — Sacred Warmth
 * Editorial layout with portrait image, pull quotes, warm golden accents
 */
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/about-sacred-hands-RgBz33DAQDf6YQazz5wy2j.webp";
const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

export default function About() {
  return (
    <Layout>
      <section className="container py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
          >
            About
          </p>
          <h1
            className="text-4xl lg:text-5xl mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
          >
            Thirty Years at the Table
          </h1>
        </motion.div>
      </section>

      <section className="container pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Portrait column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="sticky top-28">
              <div className="relative rounded-xl overflow-hidden warm-glow">
                <img
                  src={ABOUT_IMG}
                  alt="Hands holding an oracle card with reverence"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <div className="flex justify-center mt-8">
                <img src={MANDALA_IMG} alt="" className="w-12 h-12 opacity-30" />
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className="lg:col-span-7"
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

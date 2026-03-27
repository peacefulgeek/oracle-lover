/*
 * About Page — The Oracle Lover
 * Bio in first person, conversational, Kalesh voice
 * Photo: candid hands holding cards
 */
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const ABOUT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/about-portrait-bzJ5kpt3SPbNuiQBzdRzDt.webp";

export default function About() {
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
              About
            </h1>
            <div className="copper-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <img
              src={ABOUT_IMAGE}
              alt="Hands holding oracle cards at a cozy table with tea and books"
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
            className="article-prose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              There is something peculiar about spending three decades with a deck of cards in your hands — not as a gambler or a magician, but as someone who discovered, quite by accident, that symbolic systems have a way of showing you what you're not seeing. I didn't set out to become a card reader. I set out to understand myself, and the cards turned out to be the most honest mirror I'd ever encountered.
            </p>

            <p>
              I've done over ten thousand readings across multiple oracle and divination systems. Not because I'm chasing some number, but because that's what happens when you sit at the table long enough — people find you, and the work accumulates. Each reading taught me something the last one didn't, and after thirty years, the pattern is always the same: people already know. They just need a mirror that doesn't flinch.
            </p>

            <p>
              Along the way, I built <a href="https://theshankaraexperience.com" target="_blank" rel="noopener noreferrer">The Shankara Oracle</a> — a comprehensive system with over 300 cards, a board, sacred stones, and four distinct decks: Sacred Action Cards, Alchemy Cards, Master Cards, and Release Cards. I also created <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer">The Personality Cards</a> and the Transcend Deck. Each system emerged from a different question I couldn't stop asking, and each one taught me something about the architecture of self-inquiry that I couldn't have learned any other way.
            </p>

            <p>
              Before the cards, there was Hollywood. I spent years as a writer in the entertainment industry — five Emmy Awards, which sounds impressive until you realize that the most meaningful work I've ever done happens at a kitchen table with a candle and a deck. I left that world because the cards asked better questions than any script I'd ever written. Best decision I ever made.
            </p>

            <p>
              I've written multiple books on spirituality, healing, and consciousness — not because I have all the answers, but because the process of writing is itself a form of reading. You lay the words down like cards and see what pattern emerges. The contemplative traditions all point to the same thing: what you're looking for is what's looking.
            </p>

            <blockquote>
              <p>
                The space between knowing something intellectually and knowing it in your body is where all the real work happens.
              </p>
            </blockquote>

            <p>
              I'm not a guru. I'm not interested in being anyone's spiritual authority. I'm a person who got very good at one very specific thing — using symbolic systems to help people see what they're not seeing. That's it. No robes. No incense. (Okay, sometimes incense.)
            </p>

            <p>
              I'm based in Colorado, where the altitude is high and the pretension is low. I read cards, I write about reading cards, and I teach other people how to read cards without losing their minds in the process. If you want to go deeper, you can find <a href="https://paulwagner.com" target="_blank" rel="noopener noreferrer">my main site</a> or explore <a href="https://sovereign.love" target="_blank" rel="noopener noreferrer">the app I built</a> for people who want a more structured practice.
            </p>

            <p>
              But mostly, I'm here at the table. Pull up a chair.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

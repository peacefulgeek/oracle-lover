/*
 * The Oracle Page — The Oracle Lover
 * About The Shankara Oracle. 500 words max. Casual voice.
 */
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const BOOKS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/books-and-cards-MC2YsSHB89Q8tnMkxGpaUj.webp";

export default function TheOracle() {
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
              The Oracle
            </h1>
            <div className="copper-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <img
              src={BOOKS_IMAGE}
              alt="Vintage books, oracle cards, candle, and sacred stones on a dark wooden table"
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
              Here's the thing I built. It took me years — not because the concept was complicated, but because a comprehensive mirror system requires the kind of patience that doesn't come naturally to someone who spent decades in Hollywood. The Shankara Oracle is four decks, a board, sacred stones, and more symbolism than you can shake a sage stick at. But it works. Not because it's magic — because it's designed to show you every angle of whatever you're working through.
            </p>

            <p>
              The system includes over 300 cards across four distinct decks. The <strong>Sacred Action Cards</strong> address what you need to do — the practical, embodied steps that awareness demands. The <strong>Alchemy Cards</strong> work with transformation itself, the process of turning what is into what could be. The <strong>Master Cards</strong> connect you to the archetypal teachers and energies that have guided seekers for millennia. And the <strong>Release Cards</strong> name what needs to be let go — because there is no version of growth that doesn't involve the dissolution of something you thought was permanent.
            </p>

            <p>
              The board isn't decorative. It's a map — a spatial framework for laying out the cards in relationship to each other, so you can see not just individual messages but the pattern they form together. The sacred stones add another layer of tactile, intuitive input. You hold them, you place them, and something in the body responds before the mind has time to interfere.
            </p>

            <blockquote>
              <p>
                Every card system is a technology for self-knowledge. This one just happens to be the most comprehensive mirror I know how to build.
              </p>
            </blockquote>

            <p>
              I also created <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer">The Personality Cards</a> — a system designed specifically for understanding the patterns of identity, the masks we wear, and the authentic self beneath them. It's a different kind of inquiry, more focused, more personal. Together with the Transcend Deck, these systems cover the full spectrum of self-inquiry — from the practical to the philosophical, from the shadow to the light.
            </p>

            <p>
              If you're curious, the best way to understand the oracle is to experience it. Everything lives at <a href="https://theshankaraexperience.com" target="_blank" rel="noopener noreferrer">theshankaraexperience.com</a> — the full system, the philosophy behind it, and the invitation to sit down and see what the cards have to say.
            </p>

            <p>
              No gatekeeping. No prerequisites. Just a table, a deck, and your willingness to look.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

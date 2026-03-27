/*
 * Connect Page — The Oracle Lover
 * Simple page. No contact form. No email capture.
 * Three buttons with warm cream bg, plum borders, copper hover.
 */
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";

const links = [
  {
    label: "Sessions & Readings",
    href: "https://paulwagner.com/sessions",
    desc: "One-on-one readings and intuitive sessions for those ready to go deeper.",
  },
  {
    label: "The Shankara Oracle",
    href: "https://theshankaraexperience.com",
    desc: "The full oracle system — 300+ cards, a board, sacred stones, and four decks.",
  },
  {
    label: "The App",
    href: "https://sovereign.love",
    desc: "A structured digital practice for daily card work and self-inquiry.",
  },
];

export default function Connect() {
  return (
    <Layout>
      <section className="container py-12 lg:py-20">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
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
                marginBottom: '0.75rem',
              }}
            >
              Want to go deeper?
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: '#2A1025',
                lineHeight: 1.7,
                marginBottom: '3rem',
              }}
            >
              The articles are the starting point. These are the next steps — each one a different doorway into the same practice.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="block p-6 text-left transition-all duration-300"
                style={{
                  background: '#FFF8EE',
                  border: '2px solid #4A2040',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#B87333';
                  el.style.boxShadow = '0 6px 20px rgba(184, 115, 51, 0.15)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '#4A2040';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: '#4A2040',
                      margin: 0,
                    }}
                  >
                    {link.label}
                  </h3>
                  <ExternalLink size={18} style={{ color: '#B87333', flexShrink: 0 }} />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: '#4A2040',
                    margin: '0.5rem 0 0 0',
                    opacity: 0.75,
                    lineHeight: 1.5,
                  }}
                >
                  {link.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

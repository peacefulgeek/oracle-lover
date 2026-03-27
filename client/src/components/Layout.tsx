/*
 * Layout Component — The Oracle Lover
 * Design: Warm domestic tableau. Navigation feels like a table of contents.
 * Font: Space Mono for nav (editorial, slightly quirky)
 * Colors: Cream bg, plum text, copper accents
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/start-here", label: "Start Here" },
  { href: "/articles", label: "Articles" },
  { href: "/the-oracle", label: "The Oracle" },
  { href: "/connect", label: "Connect" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFF8EE' }}>
      {/* Navigation */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(255, 248, 238, 0.95)', backdropFilter: 'blur(8px)' }}>
        <nav className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="no-underline hover:no-underline">
            <span
              className="font-semibold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: '1.25rem',
                color: '#4A2040',
              }}
            >
              The Oracle Lover
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="nav-font transition-colors duration-200"
                  style={{
                    color: location === link.href ? '#B87333' : '#4A2040',
                    textDecoration: 'none',
                    borderBottom: location === link.href ? '2px solid #B87333' : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: '#4A2040' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ background: '#FFF8EE', borderTop: '1px solid #E8D5D0' }}
            >
              <div className="container py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <span
                      className="nav-font block py-1"
                      style={{
                        color: location === link.href ? '#B87333' : '#4A2040',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle bottom border */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #E8D5D0, transparent)' }} />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#4A2040', color: '#FFF8EE' }} className="mt-16">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Left */}
            <div>
              <span
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}
              >
                The Oracle Lover
              </span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', opacity: 0.7, marginTop: '0.5rem', maxWidth: '320px' }}>
                Practical oracle education from thirty years at the table.
              </p>
            </div>

            {/* Right — Nav links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="nav-font"
                    style={{ color: '#E8D5D0', textDecoration: 'none', fontSize: '0.75rem' }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(232, 213, 208, 0.2)' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.5 }}>
              &copy; {new Date().getFullYear()} The Oracle Lover
            </span>
            <div className="flex gap-6">
              <a
                href="https://paulwagner.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#B87333', textDecoration: 'none' }}
              >
                Main Site
              </a>
              <a
                href="https://theshankaraexperience.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#B87333', textDecoration: 'none' }}
              >
                The Shankara Oracle
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

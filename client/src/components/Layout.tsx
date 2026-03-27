/*
 * Layout — Sacred Warmth design
 * Warm cream background, golden accents, elegant serif navigation
 * Cormorant Garamond headings, Outfit body text
 * NAV: Large, bright, readable on both hero and scrolled states
 */
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const MANDALA_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/start-here", label: "Start Here" },
  { href: "/articles", label: "Articles" },
  { href: "/the-oracle", label: "The Oracle" },
  { href: "/connect", label: "Connect" },
];

function NavLink({ href, label, scrolled, onClick }: { href: string; label: string; scrolled: boolean; onClick?: () => void }) {
  const [location] = useLocation();
  const isActive = href === "/" ? location === "/" : location.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative transition-all duration-300"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "0.95rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: isActive
          ? (scrolled ? "oklch(0.55 0.15 320)" : "oklch(0.85 0.12 75)")
          : (scrolled ? "oklch(0.40 0.06 320)" : "oklch(0.95 0.02 80 / 0.85)"),
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.color = scrolled
          ? "oklch(0.55 0.15 320)"
          : "oklch(0.85 0.12 75)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.color = isActive
          ? (scrolled ? "oklch(0.55 0.15 320)" : "oklch(0.85 0.12 75)")
          : (scrolled ? "oklch(0.40 0.06 320)" : "oklch(0.95 0.02 80 / 0.85)");
      }}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
          style={{ background: scrolled ? "oklch(0.55 0.15 320)" : "oklch(0.85 0.12 75)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.96 0.02 80)" }}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled
            ? "oklch(0.96 0.02 80 / 0.95)"
            : "linear-gradient(180deg, oklch(0.15 0.05 310 / 0.6) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.78 0.14 75 / 0.15)" : "none",
        }}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span
              className="text-2xl lg:text-[1.8rem] tracking-tight transition-colors duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: scrolled ? "oklch(0.35 0.12 320)" : "oklch(0.95 0.02 80)",
                textShadow: scrolled ? "none" : "0 1px 8px oklch(0.15 0.05 310 / 0.4)",
              }}
            >
              The Oracle Lover
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: scrolled ? "oklch(0.35 0.12 320)" : "oklch(0.95 0.02 80)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
              style={{ background: "oklch(0.96 0.02 80 / 0.98)", backdropFilter: "blur(20px)" }}
            >
              <div className="container py-6 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} scrolled={true} onClick={() => setMobileOpen(false)} />
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20 lg:pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="relative overflow-hidden"
        style={{ background: "oklch(0.22 0.08 310)" }}
      >
        {/* Mandala watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04] pointer-events-none">
          <img src={MANDALA_URL} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container relative z-10 py-16 lg:py-20">
          {/* Golden divider at top */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.3), transparent)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "oklch(0.78 0.14 75 / 0.5)" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.3), transparent)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand */}
            <div>
              <h3
                className="text-2xl mb-4"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.96 0.02 80)" }}
              >
                The Oracle Lover
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "oklch(0.96 0.02 80 / 0.55)", lineHeight: 1.8 }}
              >
                Thirty years of oracle card wisdom distilled into practical, grounded education.
                No woo required — just honest inquiry and a willingness to look.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-5"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
              >
                Explore
              </h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:!text-gold"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "oklch(0.96 0.02 80 / 0.55)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* External */}
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-5"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "oklch(0.78 0.14 75)" }}
              >
                Beyond
              </h4>
              <nav className="flex flex-col gap-3">
                <a href="https://theshankaraexperience.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:!text-gold"
                  style={{ fontFamily: "var(--font-body)", color: "oklch(0.96 0.02 80 / 0.55)" }}>
                  The Shankara Oracle
                </a>
                <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:!text-gold"
                  style={{ fontFamily: "var(--font-body)", color: "oklch(0.96 0.02 80 / 0.55)" }}>
                  The Personality Cards
                </a>
                <a href="https://paulwagner.com/readings" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:!text-gold"
                  style={{ fontFamily: "var(--font-body)", color: "oklch(0.96 0.02 80 / 0.55)" }}>
                  Sessions &amp; Readings
                </a>
                <a href="https://paulwagner.com" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-300 hover:!text-gold"
                  style={{ fontFamily: "var(--font-body)", color: "oklch(0.96 0.02 80 / 0.55)" }}>
                  PaulWagner.com
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid oklch(0.96 0.02 80 / 0.08)" }}>
            <p className="text-xs" style={{ color: "oklch(0.96 0.02 80 / 0.3)", fontFamily: "var(--font-body)" }}>
              &copy; {new Date().getFullYear()} The Oracle Lover. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.96 0.02 80 / 0.3)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              Pull up a chair.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

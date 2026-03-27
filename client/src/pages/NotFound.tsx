import { Link } from "wouter";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const MANDALA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/gmij7LjAnhSeEKhviVH9SQ/golden-mandala-nHw5UU8ArX4swxcUEgwBqh.webp";

export default function NotFound() {
  return (
    <Layout>
      <div className="container py-24 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={MANDALA_IMG} alt="" className="w-16 h-16 mx-auto mb-8 opacity-30" />
          <h1
            className="text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "oklch(0.22 0.04 310)" }}
          >
            Page Not Found
          </h1>
          <p
            className="text-lg mb-10 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300, color: "oklch(0.50 0.04 310)", lineHeight: 1.7 }}
          >
            The card you pulled doesn't seem to exist in this deck. Let's get you back to the table.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm tracking-wide transition-all duration-300 hover:gap-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              background: "oklch(0.35 0.12 320)",
              color: "oklch(0.96 0.02 80)",
            }}
          >
            <ArrowLeft size={16} /> Return Home
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}

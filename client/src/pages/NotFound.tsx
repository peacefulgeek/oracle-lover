import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="container py-20 text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#4A2040',
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: '#2A1025',
            marginBottom: '2rem',
          }}
        >
          The card you pulled doesn't seem to exist in this deck. Let's get you back to the table.
        </p>
        <Link href="/">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: '#B87333',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
            }}
          >
            Return Home
          </span>
        </Link>
      </div>
    </Layout>
  );
}

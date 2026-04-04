export function ArticleCardSkeleton() {
  return (
    <div className="sacred-card p-6 animate-pulse">
      <div className="mb-4">
        <div className="h-4 w-16 rounded-full" style={{ background: "oklch(0.88 0.03 75)" }} />
      </div>
      <div className="h-6 w-3/4 rounded mb-3" style={{ background: "oklch(0.88 0.03 75)" }} />
      <div className="h-4 w-full rounded mb-2" style={{ background: "oklch(0.92 0.02 75)" }} />
      <div className="h-4 w-2/3 rounded mb-4" style={{ background: "oklch(0.92 0.02 75)" }} />
      <div className="flex justify-between pt-4" style={{ borderTop: "1px solid oklch(0.88 0.03 75)" }}>
        <div className="h-3 w-16 rounded" style={{ background: "oklch(0.92 0.02 75)" }} />
        <div className="h-3 w-12 rounded" style={{ background: "oklch(0.92 0.02 75)" }} />
      </div>
    </div>
  );
}

export function ArticlePageSkeleton() {
  return (
    <div className="container py-16 animate-pulse">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 w-3/4 rounded mb-4" style={{ background: "oklch(0.88 0.03 75)" }} />
        <div className="h-4 w-1/2 rounded mb-8" style={{ background: "oklch(0.92 0.02 75)" }} />
        <div className="h-64 w-full rounded-xl mb-8" style={{ background: "oklch(0.92 0.02 75)" }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-4 w-full rounded mb-3" style={{ background: "oklch(0.94 0.01 75)" }} />
        ))}
      </div>
    </div>
  );
}

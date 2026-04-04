export function ArticleCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{
        background: "oklch(0.98 0.01 75)",
        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
    >
      <div className="h-[180px]" style={{ background: "oklch(0.92 0.02 75)" }} />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 rounded" style={{ background: "oklch(0.90 0.02 75)" }} />
        <div className="h-5 w-3/4 rounded" style={{ background: "oklch(0.88 0.02 75)" }} />
        <div className="space-y-2">
          <div className="h-3 w-full rounded" style={{ background: "oklch(0.92 0.02 75)" }} />
          <div className="h-3 w-5/6 rounded" style={{ background: "oklch(0.92 0.02 75)" }} />
        </div>
      </div>
    </div>
  );
}

export function ArticlePageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[360px] w-full" style={{ background: "oklch(0.90 0.02 75)" }} />
      <div className="container py-10">
        <div className="max-w-3xl space-y-4">
          <div className="h-6 w-3/4 rounded" style={{ background: "oklch(0.90 0.02 75)" }} />
          <div className="h-px" style={{ background: "oklch(0.92 0.02 75)" }} />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 w-full rounded" style={{ background: "oklch(0.93 0.02 75)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

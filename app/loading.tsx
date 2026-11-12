export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
      <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-zinc-800/80" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bento-card p-6 space-y-3"
          >
            <div className="h-40 rounded-xl bg-slate-200 dark:bg-zinc-800/80" />
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-zinc-800/80" />
            <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-zinc-800/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

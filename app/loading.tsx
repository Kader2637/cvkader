export default function Loading() {
  return (
    <div className="animate-pulse">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="mx-auto h-6 w-28 rounded-full bg-gray-200/70" />
          <div className="mt-4 h-9 sm:h-12 rounded-lg bg-gray-200/80" />
          <div className="mt-3 h-4 rounded bg-gray-200/70" />
          <div className="mt-2 h-4 w-5/6 mx-auto rounded bg-gray-200/60" />
        </div>

        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-sm p-4 shadow-sm"
            >
              <div className="w-full h-40 rounded-xl bg-gray-200/70" />
              <div className="mt-3 h-4 rounded bg-gray-200/80" />
              <div className="mt-2 h-3 w-5/6 rounded bg-gray-200/70" />
              <div className="mt-2 h-3 w-2/3 rounded bg-gray-200/60" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

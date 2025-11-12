export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="mb-4 h-12 w-3/4 rounded-lg bg-neutral-200"></div>
          <div className="h-6 w-1/2 rounded-lg bg-neutral-200"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-full rounded bg-neutral-200"></div>
          <div className="h-4 w-full rounded bg-neutral-200"></div>
          <div className="h-4 w-5/6 rounded bg-neutral-200"></div>
          <div className="h-4 w-full rounded bg-neutral-200"></div>
          <div className="h-4 w-4/5 rounded bg-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}

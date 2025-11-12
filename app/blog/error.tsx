'use client';

import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-neutral-800">
          Article Not Found
        </h1>
        <p className="mb-6 text-neutral-600">
          We couldn't load this blog post. It may have been moved or deleted.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-lg bg-brand-purple px-6 py-2 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
          <Link
            href="/blog"
            className="rounded-lg border-2 border-brand-purple px-6 py-2 font-semibold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white"
          >
            Back to Blog
          </Link>
        </div>
        {error.digest && (
          <p className="mt-4 text-sm text-neutral-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error('Application error:', error);

    // In production, send to error tracking service (Sentry, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <h1 className="mb-2 text-6xl font-bold text-brand-purple">Oops!</h1>
          <h2 className="text-2xl font-semibold text-neutral-800">
            Something went wrong
          </h2>
        </div>

        <p className="mb-8 text-lg text-neutral-600">
          We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-brand-purple px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
          >
            Try again
          </button>

          <a
            href="/"
            className="rounded-lg border-2 border-brand-purple px-6 py-3 font-semibold text-brand-purple transition-colors hover:bg-brand-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
          >
            Go home
          </a>
        </div>

        {error.digest && (
          <p className="mt-6 text-sm text-neutral-400">
            Error ID: {error.digest}
          </p>
        )}

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 rounded-lg bg-neutral-100 p-4 text-left">
            <summary className="cursor-pointer font-semibold text-neutral-700">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-neutral-600">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-red-200">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-red-600 text-white px-10 py-3 rounded-lg hover:bg-red-700 transition-colors mr-4"
        >
          Try Again
        </button>
        <a 
          href="/"
          className="inline-block bg-gray-600 text-white px-10 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
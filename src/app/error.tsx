'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Handled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex flex-col items-center">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            An unexpected error occurred. Our team has been notified.
            {error.digest && (
              <span className="block mt-2 text-xs font-mono opacity-50">
                Error ID: {error.digest}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-full transition-all shadow-lg hover:shadow-primary/30"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-full transition-all"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

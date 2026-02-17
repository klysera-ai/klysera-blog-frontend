'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{error.message || 'An unexpected error occurred'}</p>
      <button
        onClick={reset}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors font-medium"
      >
        Try Again
      </button>
    </div>
  );
}

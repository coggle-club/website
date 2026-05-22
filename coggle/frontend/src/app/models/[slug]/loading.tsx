export default function ModelDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-4 h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-9 w-96 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-4 h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-8 flex gap-3">
        {[1, 2, 3].map((btn) => (
          <div key={btn} className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900" />
    </div>
  );
}

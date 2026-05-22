export default function ModelsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="mb-2 h-9 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      {[1, 2, 3].map((section) => (
        <div key={section} className="mb-12">
          <div className="mb-4 h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="h-44 animate-pulse rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

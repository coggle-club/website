import { Skeleton } from "@/components/common/Skeleton";

export default function TutorialsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-20" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-3 h-5 w-20 rounded-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-2/3" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-14 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/common/Skeleton";

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-20" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="mb-6">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-3 h-4 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

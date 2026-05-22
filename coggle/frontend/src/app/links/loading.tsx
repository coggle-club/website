import { Skeleton } from "@/components/common/Skeleton";

export default function LinksLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-24" />
        <Skeleton className="h-5 w-72" />
      </div>
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-12 w-48 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

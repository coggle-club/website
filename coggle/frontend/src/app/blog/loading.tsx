import { BlogListSkeleton } from "@/components/common/Skeleton";
import { Skeleton } from "@/components/common/Skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-20" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <BlogListSkeleton />
        </div>
      </div>
    </div>
  );
}

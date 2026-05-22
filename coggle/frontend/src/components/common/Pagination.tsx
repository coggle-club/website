"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getPaginationRange } from "@/lib/utils";

interface PaginationProps {
  current: number;
  total: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export default function Pagination({
  current,
  total,
  basePath,
  queryParams,
}: PaginationProps) {
  if (total <= 1) return null;

  const pages = getPaginationRange(current, total);

  function buildHref(page: number): string {
    const params = new URLSearchParams(queryParams);
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1"
      aria-label="分页导航"
    >
      {/* Prev */}
      {current > 1 && (
        <Link
          href={buildHref(current - 1)}
          className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <ChevronLeft size={16} className="mr-1" />
          上一页
        </Link>
      )}

      {/* Pages */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm",
              page === current
                ? "bg-primary-600 text-white"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next */}
      {current < total && (
        <Link
          href={buildHref(current + 1)}
          className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          下一页
          <ChevronRight size={16} className="ml-1" />
        </Link>
      )}
    </nav>
  );
}

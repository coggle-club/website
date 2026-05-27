"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { LinksResponse } from "@/types/content";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

const defaultColors = {
  badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  dot: "bg-gray-400",
  border: "border-gray-200 dark:border-gray-700",
};

export default function LinksPage() {
  const [data, setData] = useState<LinksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/links`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json: LinksResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-pulse space-y-3">
          <div className="h-9 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-72 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                <span className="h-5 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
                <span className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-12 w-48 rounded-lg bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          常见链接
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          暂时无法加载链接信息，请稍后再试。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          常见链接
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          数据科学相关资源与友情链接
        </p>
      </div>

      <div className="space-y-10">
        {data!.categories.map((category) => {
          const colors = defaultColors;
          return (
            <section key={category.category}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {category.category}
                </h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
                >
                  {category.items.length} 项
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((item, idx) => (
                  <a
                    key={`${item.name}-${idx}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2.5 rounded-lg border bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${colors.border} dark:bg-gray-900`}
                  >
                    <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="hidden text-xs text-gray-400 transition-colors group-hover:text-gray-500 sm:inline dark:text-gray-500 dark:group-hover:text-gray-400">
                        {item.description}
                      </span>
                    )}
                    <ExternalLink
                      size={12}
                      className="shrink-0 text-gray-300 transition-colors group-hover:text-primary-500 dark:text-gray-600"
                    />
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { fetchApi } from "@/lib/api";
import { ExternalLink } from "lucide-react";
import type { LinksResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "常见链接",
  description: "Coggle 社区推荐的数据科学资源与友情链接",
};

export const revalidate = 3600;

const categoryColors: Record<string, { badge: string; dot: string; border: string }> = {
  "竞赛平台": { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", dot: "bg-blue-500", border: "border-blue-200 dark:border-blue-800" },
  "数据平台": { badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300", dot: "bg-green-500", border: "border-green-200 dark:border-green-800" },
  "友情链接": { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300", dot: "bg-purple-500", border: "border-purple-200 dark:border-purple-800" },
};

function getCategoryColor(category: string) {
  return categoryColors[category] ?? { badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", dot: "bg-gray-400", border: "border-gray-200 dark:border-gray-700" };
}

export default async function LinksPage() {
  let data: LinksResponse;

  try {
    data = await fetchApi<LinksResponse>("/links");
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">常见链接</h1>
        <p className="text-gray-500 dark:text-gray-400">暂时无法加载链接信息，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">常见链接</h1>
        <p className="text-gray-600 dark:text-gray-400">
          数据科学相关资源与友情链接
        </p>
      </div>

      <div className="space-y-10">
        {data.categories.map((category) => {
          const colors = getCategoryColor(category.category);
          return (
            <section key={category.category}>
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {category.category}
                </h2>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}>
                  {category.items.length} 项
                </span>
              </div>

              {/* Horizontal items */}
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

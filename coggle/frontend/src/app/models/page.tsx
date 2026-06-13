import type { Metadata } from "next";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import Tag from "@/components/common/Tag";
import { Share2 } from "lucide-react";
import type { ModelSummary } from "@/types/content";

export const metadata: Metadata = {
  title: "模型",
  description: "Coggle 模型库，涵盖大语言模型、计算机视觉、自然语言处理等方向的经典模型介绍",
};

export const dynamic = "force-dynamic";

export default async function ModelsPage() {
  let categories: Record<string, ModelSummary[]>;

  try {
    categories = await fetchApi<Record<string, ModelSummary[]>>("/models");
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">模型库</h1>
        <p className="text-gray-500">暂时无法加载模型数据，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">模型库</h1>
            <p className="text-gray-600 dark:text-gray-400">经典模型介绍与资源汇总</p>
          </div>
          <Link
            href="/models/graph"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Share2 size={16} />
            关系图
          </Link>
        </div>
      </div>

      {Object.entries(categories).map(([category, models]) => (
        <section key={category} className="mb-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">{category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Link
                key={model.slug}
                href={`/models/${model.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-600"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                  {model.name}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {model.description}
                </p>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {model.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{model.publisher}</span>
                  <span>{formatDate(model.date)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

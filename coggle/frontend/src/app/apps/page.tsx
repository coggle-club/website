import type { Metadata } from "next";
import { fetchApi } from "@/lib/api";
import AppCard from "@/components/apps/AppCard";
import type { AppListResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "应用",
  description: "Coggle 社区应用生态，数据看板、AI 助手等",
};

export const dynamic = "force-dynamic";

export default async function AppsPage() {
  let data: AppListResponse | null = null;

  try {
    data = await fetchApi<AppListResponse>("/apps");
  } catch {
    // fallback handled below
  }

  if (!data || !Array.isArray(data.apps)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          应用
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          暂时无法加载应用信息，请稍后再试。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          应用
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Coggle 社区应用生态
        </p>
      </div>

      {data.apps.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-16 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">暂无应用</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}

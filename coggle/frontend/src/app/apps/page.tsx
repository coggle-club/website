import type { Metadata } from "next";
import { fetchApi } from "@/lib/api";
import AppsPageClient from "@/components/apps/AppsPageClient";
import type { AppListResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "应用",
  description: "Coggle 社区应用生态，数据看板、AI 助手等",
};

export const dynamic = "force-dynamic";

export default async function AppsPage() {
  let data: AppListResponse | null = null;

  try {
    data = await fetchApi<AppListResponse>("/apps?show_hidden=true");
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
      <AppsPageClient apps={data.apps} />
    </div>
  );
}

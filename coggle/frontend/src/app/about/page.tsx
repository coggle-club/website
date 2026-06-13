import type { Metadata } from "next";
import { fetchApi } from "@/lib/api";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import type { PageContent } from "@/types/content";

export const metadata: Metadata = {
  title: "关于 Coggle",
  description: "了解 Coggle 数据科学社区",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let page: PageContent;

  try {
    page = await fetchApi<PageContent>("/pages/about");
  } catch {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">关于 Coggle</h1>
        <p className="text-gray-500">暂时无法加载此页面，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
      </div>
      <div className="prose-coggle">
        <MarkdownRenderer content={page.content} />
      </div>
    </div>
  );
}

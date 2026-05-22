import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import MarkdownTool from "@/components/tools/MarkdownTool";

export const metadata: Metadata = {
  title: "Markdown 渲染器",
  description: "在线 Markdown 渲染工具，支持 HTML 自动转 Markdown 并实时预览",
};

export default function MarkdownRendererPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/markdown-renderer", label: "Markdown 渲染器" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Markdown 渲染器
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          粘贴 Markdown 或网页 HTML 内容，自动转换为 Markdown 并实时渲染预览
        </p>
      </div>

      <MarkdownTool />
    </div>
  );
}

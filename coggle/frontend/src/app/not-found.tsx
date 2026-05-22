import Link from "next/link";
import type { Metadata } from "next";
import SearchBar from "@/components/common/SearchBar";

export const metadata: Metadata = {
  title: "404 - 页面未找到",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="mb-8 text-7xl font-bold text-primary-600">404</div>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">页面未找到</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        您访问的页面不存在或已被移除。请检查链接是否正确，或使用搜索功能查找内容。
      </p>
      <div className="mx-auto mb-8 max-w-md">
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          浏览博客
        </Link>
      </div>
    </div>
  );
}

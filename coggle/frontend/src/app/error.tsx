"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <div className="mb-8 text-7xl font-bold text-red-500">500</div>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        出错了
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        页面加载时发生了错误。请尝试刷新页面，或稍后再试。
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          重试
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import AppCard from "@/components/apps/AppCard";
import type { AppInfo } from "@/types/content";

interface AppsPageClientProps {
  apps: AppInfo[];
}

export default function AppsPageClient({ apps }: AppsPageClientProps) {
  const [showHidden, setShowHidden] = useState(false);

  const visibleApps = showHidden ? apps : apps.filter((app) => !app.hidden);
  const hiddenCount = apps.filter((app) => app.hidden).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          应用
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Coggle 社区应用生态
        </p>
      </div>

      {hiddenCount > 0 && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowHidden((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span
              className={`h-4 w-4 rounded border border-gray-400 flex items-center justify-center transition-colors ${
                showHidden ? "bg-primary-600 border-primary-600" : ""
              }`}
            >
              {showHidden && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            显示隐藏应用（{hiddenCount}）
          </button>
        </div>
      )}

      {visibleApps.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-16 text-center dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">暂无应用</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visibleApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
    </>
  );
}

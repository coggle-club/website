import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import SqlFormatter from "@/components/tools/SqlFormatter";

export const metadata: Metadata = {
  title: "SQL 格式化",
  description: "在线 SQL 格式化与压缩工具，支持 15 种数据库方言",
};

export default function SqlFormatterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/sql-formatter", label: "SQL 格式化" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          SQL 格式化 / 压缩
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          美化或压缩 SQL 语句，支持 MySQL、PostgreSQL、BigQuery 等 15 种方言
        </p>
      </div>

      <SqlFormatter />
    </div>
  );
}

import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import JsonFormatter from "@/components/tools/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON 格式化",
  description: "在线 JSON 校验与格式化工具，支持语法校验和错误定位",
};

export default function JsonFormatterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/json-formatter", label: "JSON 格式化" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          JSON 校验 / 格式化
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          校验 JSON 语法，格式化或压缩 JSON 文本，快速定位错误位置
        </p>
      </div>

      <JsonFormatter />
    </div>
  );
}

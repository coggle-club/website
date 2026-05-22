import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import TextDiff from "@/components/tools/TextDiff";

export const metadata: Metadata = {
  title: "文本 Diff",
  description: "在线文本差异对比工具，高亮显示新增和删除内容",
};

export default function TextDiffPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/text-diff", label: "文本 Diff" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          文本 Diff
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          对比两段文本的差异，快速定位新增和删除的内容
        </p>
      </div>

      <TextDiff />
    </div>
  );
}

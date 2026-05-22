import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import BaseConverter from "@/components/tools/BaseConverter";

export const metadata: Metadata = {
  title: "进制转换",
  description: "在线进制转换工具，支持二进制、八进制、十进制、十六进制及 2-36 任意进制互转",
};

export default function BaseConverterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/base-converter", label: "进制转换" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          进制转换
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          二进制、八进制、十进制、十六进制及 2-36 任意进制互转
        </p>
      </div>

      <BaseConverter />
    </div>
  );
}

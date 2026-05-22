import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import UnixTimestampConverter from "@/components/tools/UnixTimestampConverter";

export const metadata: Metadata = {
  title: "Unix 时间戳转换",
  description: "在线 Unix 时间戳与日期时间相互转换工具",
};

export default function UnixTimestampPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/unix-timestamp", label: "Unix 时间戳转换" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Unix 时间戳转换
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Unix 时间戳与北京时间相互转换
        </p>
      </div>

      <UnixTimestampConverter />
    </div>
  );
}

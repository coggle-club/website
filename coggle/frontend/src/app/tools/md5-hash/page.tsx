import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import Md5Hash from "@/components/tools/Md5Hash";

export const metadata: Metadata = {
  title: "MD5 / SHA 哈希",
  description: "在线 MD5、SHA-1、SHA-256 哈希计算工具，支持大小写输出",
};

export default function Md5HashPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/tools", label: "在线工具" },
          { href: "/tools/md5-hash", label: "MD5 / SHA 哈希" },
        ]}
      />

      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          MD5 / SHA 哈希计算
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          计算文本的 MD5、SHA-1、SHA-256 哈希值，支持大小写输出
        </p>
      </div>

      <Md5Hash />
    </div>
  );
}

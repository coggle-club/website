import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/common/Card";
import { Clock, FileDiff, Database, Braces, ArrowRightLeft, Hash, Eye, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "在线工具",
  description: "Coggle 社区在线工具，Unix 时间戳转换、文本 Diff 等",
};

const tools = [
  {
    slug: "unix-timestamp",
    name: "Unix 时间戳转换",
    description: "Unix 时间戳与日期时间相互转换，支持即时查看北京时间",
    icon: Clock,
  },
  {
    slug: "text-diff",
    name: "文本 Diff",
    description: "对比两段文本的差异，高亮显示新增和删除的行",
    icon: FileDiff,
  },
  {
    slug: "sql-formatter",
    name: "SQL 格式化",
    description: "SQL 格式化与压缩，支持 15 种数据库方言",
    icon: Database,
  },
  {
    slug: "json-formatter",
    name: "JSON 校验 / 格式化",
    description: "JSON 语法校验、格式化与压缩，精准定位错误",
    icon: Braces,
  },
  {
    slug: "base-converter",
    name: "进制转换",
    description: "二进制、八进制、十进制、十六进制及 2-36 任意进制互转",
    icon: ArrowRightLeft,
  },
  {
    slug: "md5-hash",
    name: "MD5 / SHA 哈希",
    description: "MD5、SHA-1、SHA-256 哈希值计算，支持大小写输出",
    icon: Hash,
  },
  {
    slug: "markdown-renderer",
    name: "Markdown 渲染器",
    description: "HTML 自动转 Markdown，实时渲染预览",
    icon: Eye,
  },
  {
    slug: "llm-chat",
    name: "大模型对话",
    description: "支持配置 baseURL / API Key / 模型，双模型速度对比",
    icon: Bot,
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          在线工具
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          实用小工具，在浏览器内直接使用
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group block">
            <Card className="h-full transition-all hover:border-primary-300 hover:shadow-md dark:hover:border-primary-700">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary-50 p-3 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <tool.icon size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="mb-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tool.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary-400">
                    开始使用 &rarr;
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

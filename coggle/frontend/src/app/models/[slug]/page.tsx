import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import Tag from "@/components/common/Tag";
import Breadcrumb from "@/components/common/Breadcrumb";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { ExternalLink, BookOpen, Github } from "lucide-react";
import type { ModelDetail } from "@/types/content";

interface ModelDetailProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ModelDetailProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const model = await fetchApi<ModelDetail>(`/models/${slug}`);
    return {
      title: model.name,
      description: model.description,
    };
  } catch {
    return { title: "模型未找到" };
  }
}

export default async function ModelDetailPage({ params }: ModelDetailProps) {
  const { slug } = await params;
  let model: ModelDetail;

  try {
    model = await fetchApi<ModelDetail>(`/models/${slug}`);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/models", label: "模型库" },
          { href: `/models/${model.slug}`, label: model.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {model.name}
        </h1>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
          {model.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>发布方：{model.publisher}</span>
          <span>发布日期：{formatDate(model.date)}</span>
          <span>类别：{model.category}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {model.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mb-8 flex flex-wrap gap-3">
        {model.paper_url && (
          <a
            href={model.paper_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <BookOpen size={16} />
            论文
            <ExternalLink size={14} />
          </a>
        )}
        {model.github_url && (
          <a
            href={model.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Github size={16} />
            代码仓库
            <ExternalLink size={14} />
          </a>
        )}
        {model.official_url && (
          <a
            href={model.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
          >
            官方网站
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <MarkdownRenderer content={model.content} />
      </div>
    </div>
  );
}

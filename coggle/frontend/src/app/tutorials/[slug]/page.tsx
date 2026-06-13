import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { formatDate, getDifficultyLabel, getDifficultyColor } from "@/lib/utils";
import Tag from "@/components/common/Tag";
import Breadcrumb from "@/components/common/Breadcrumb";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import TutorialCard from "@/components/tutorials/TutorialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TutorialDetail } from "@/types/content";

interface TutorialDetailProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: TutorialDetailProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const tutorial = await fetchApi<TutorialDetail>(`/tutorials/${slug}`);
    return {
      title: tutorial.title,
      description: tutorial.description,
    };
  } catch {
    return { title: "教程未找到" };
  }
}

export default async function TutorialDetailPage({
  params,
}: TutorialDetailProps) {
  const { slug } = await params;
  let tutorial: TutorialDetail;

  try {
    tutorial = await fetchApi<TutorialDetail>(`/tutorials/${slug}`);
  } catch {
    notFound();
    return null;
  }

  if (tutorial.draft) {
    notFound();
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar - TOC */}
        {tutorial.toc.length > 0 && (
          <aside className="w-full shrink-0 lg:w-56">
            <div className="sticky top-24">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                目录
              </h3>
              <nav className="space-y-1">
                {tutorial.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <Breadcrumb
            items={[
              { href: "/", label: "首页" },
              { href: "/tutorials", label: "教程" },
              { href: `/tutorials/${slug}`, label: tutorial.title },
            ]}
          />
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}
                >
                  {getDifficultyLabel(tutorial.difficulty)}
                </span>
                {tutorial.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                {tutorial.title}
              </h1>
              {tutorial.series && (
                <p className="mb-3 text-sm text-primary-600">
                  系列：{tutorial.series.name}（第 {tutorial.series.order}{" "}
                  篇，共 {tutorial.series.total} 篇）
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{tutorial.author}</span>
                <span>&middot;</span>
                <time dateTime={tutorial.date}>{formatDate(tutorial.date)}</time>
              </div>
            </header>

            {/* Content */}
            <div className="prose-coggle">
              <MarkdownRenderer content={tutorial.content} />
            </div>

            {/* Series nav (prev/next) */}
            {(tutorial.prev || tutorial.next) && (
              <nav className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
                <div>
                  {tutorial.prev && (
                    <Link
                      href={`/tutorials/${tutorial.prev.slug}`}
                      className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-600"
                    >
                      <ChevronLeft size={16} />
                      <span>{tutorial.prev.title}</span>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {tutorial.next && (
                    <Link
                      href={`/tutorials/${tutorial.next.slug}`}
                      className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-600"
                    >
                      <span>{tutorial.next.title}</span>
                      <ChevronRight size={16} />
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </article>

          {/* Related tutorials */}
          {tutorial.related.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                相关教程
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {tutorial.related.map((related) => (
                  <TutorialCard
                    key={related.slug}
                    tutorial={related}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

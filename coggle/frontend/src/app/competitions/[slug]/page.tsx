import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import Tag from "@/components/common/Tag";
import Breadcrumb from "@/components/common/Breadcrumb";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import { ExternalLink } from "lucide-react";
import type { CompetitionDetail } from "@/types/content";

interface CompetitionDetailProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CompetitionDetailProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const competition = await fetchApi<CompetitionDetail>(
      `/competitions/${slug}`,
    );
    return {
      title: competition.title,
      description: competition.description,
    };
  } catch {
    return { title: "竞赛未找到" };
  }
}

export default async function CompetitionDetailPage({
  params,
}: CompetitionDetailProps) {
  const { slug } = await params;
  let competition: CompetitionDetail;

  try {
    competition = await fetchApi<CompetitionDetail>(`/competitions/${slug}`);
  } catch {
    notFound();
    return null;
  }

  if (competition.draft) {
    notFound();
    return null;
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/competitions", label: "竞赛" },
          { href: `/competitions/${slug}`, label: competition.title },
        ]}
      />
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(competition.status)}`}
          >
            {getStatusLabel(competition.status)}
          </span>
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
            {competition.platform}
          </span>
          {competition.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {competition.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <time dateTime={competition.date}>{formatDate(competition.date)}</time>
          {competition.end_date && (
            <>
              <span>&rarr;</span>
              <time dateTime={competition.end_date}>
                {formatDate(competition.end_date)}
              </time>
            </>
          )}
          {competition.award && (
            <>
              <span>&middot;</span>
              <span className="font-medium text-yellow-600">
                {competition.award}
              </span>
            </>
          )}
        </div>
        <div className="mt-4">
          <Link
            href={competition.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
          >
            <ExternalLink size={14} />
            查看竞赛详情
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="prose-coggle">
        <MarkdownRenderer content={competition.content} />
      </div>

      {/* Related competitions */}
      {competition.related.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">相关竞赛</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {competition.related.map((related) => (
              <CompetitionCard
                key={related.slug}
                competition={related}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

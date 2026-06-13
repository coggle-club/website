import type { Metadata } from "next";
import { fetchApi, buildQueryString } from "@/lib/api";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import Pagination from "@/components/common/Pagination";
import { cn, getStatusLabel } from "@/lib/utils";
import type { CompetitionSummary, PaginatedResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "竞赛",
  description: "Coggle 社区参与的 Kaggle、天池等数据科学竞赛记录",
};

export const dynamic = "force-dynamic";

interface CompetitionsPageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    platform?: string;
    status?: string;
  }>;
}

const statusOptions = ["ongoing", "ended"] as const;

export default async function CompetitionsPage({
  searchParams,
}: CompetitionsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const tag = params.tag;
  const platform = params.platform;
  const status = params.status;

  const qs = buildQueryString({ page, page_size: 20, tag, platform, status });

  let data: PaginatedResponse<CompetitionSummary>;

  try {
    data = await fetchApi<PaginatedResponse<CompetitionSummary>>(
      `/competitions${qs}`,
    );
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">竞赛</h1>
        <p className="text-gray-500">暂时无法加载竞赛信息，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">竞赛</h1>
        <p className="text-gray-600">
          数据科学竞赛参赛记录与经验分享
        </p>
      </div>

      {/* Status filter */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">状态：</span>
        <a
          href="/competitions"
          className={cn(
            "rounded-full px-3 py-1 text-sm transition-colors",
            !status
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          )}
        >
          全部
        </a>
        {statusOptions.map((s) => (
          <a
            key={s}
            href={`/competitions?status=${s}`}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              status === s
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {getStatusLabel(s)}
          </a>
        ))}
      </div>

      {/* Filter hints */}
      {(tag || platform) && (
        <p className="mb-4 text-sm text-gray-500">
          {tag && (
            <>标签：<span className="font-medium text-primary-600">{tag}</span></>
          )}
          {platform && (
            <>平台：<span className="font-medium text-purple-600">{platform}</span></>
          )}
          <a
            href="/competitions"
            className="ml-2 text-primary-600 hover:text-primary-700"
          >
            清除筛选
          </a>
        </p>
      )}

      {data.items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-16 text-center">
          <p className="text-gray-500">暂无符合条件的竞赛</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.items.map((competition) => (
            <CompetitionCard
              key={competition.slug}
              competition={competition}
            />
          ))}
        </div>
      )}

      <Pagination
        current={data.page}
        total={data.total_pages}
        basePath="/competitions"
        queryParams={{
          ...(tag && { tag }),
          ...(platform && { platform }),
          ...(status && { status }),
        }}
      />
    </div>
  );
}

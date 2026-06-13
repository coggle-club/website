import type { Metadata } from "next";
import { fetchApi, buildQueryString } from "@/lib/api";
import TutorialList from "@/components/tutorials/TutorialList";
import Pagination from "@/components/common/Pagination";
import Tag from "@/components/common/Tag";
import { cn, getDifficultyLabel } from "@/lib/utils";
import type { TutorialSummary, PaginatedResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "教程",
  description: "Coggle 社区数据科学与机器学习教程，从入门到进阶",
};

export const dynamic = "force-dynamic";

interface TutorialsPageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    difficulty?: string;
  }>;
}

const difficulties = ["beginner", "intermediate", "advanced"] as const;

export default async function TutorialsPage({
  searchParams,
}: TutorialsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const tag = params.tag;
  const difficulty = params.difficulty;

  const qs = buildQueryString({
    page,
    page_size: 20,
    tag,
    difficulty,
  });

  let data: PaginatedResponse<TutorialSummary>;

  try {
    data = await fetchApi<PaginatedResponse<TutorialSummary>>(
      `/tutorials${qs}`,
    );
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">教程</h1>
        <p className="text-gray-500">暂时无法加载教程，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">教程</h1>
        <p className="text-gray-600">
          系统化的数据科学与机器学习教程
        </p>
      </div>

      {/* Difficulty filter */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">难度：</span>
        <a
          href="/tutorials"
          className={cn(
            "rounded-full px-3 py-1 text-sm transition-colors",
            !difficulty
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          )}
        >
          全部
        </a>
        {difficulties.map((d) => (
          <a
            key={d}
            href={`/tutorials?difficulty=${d}`}
            className={cn(
              "rounded-full px-3 py-1 text-sm transition-colors",
              difficulty === d
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {getDifficultyLabel(d)}
          </a>
        ))}
      </div>

      {/* Tag filter hint */}
      {tag && (
        <p className="mb-4 text-sm text-gray-500">
          筛选标签：
          <span className="font-medium text-primary-600">{tag}</span>
          <a
            href="/tutorials"
            className="ml-2 text-primary-600 hover:text-primary-700"
          >
            清除筛选
          </a>
        </p>
      )}

      {data.items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-16 text-center">
          <p className="text-gray-500">暂无符合条件的教程</p>
        </div>
      ) : (
        <TutorialList tutorials={data.items} />
      )}

      <Pagination
        current={data.page}
        total={data.total_pages}
        basePath="/tutorials"
        queryParams={{
          ...(tag && { tag }),
          ...(difficulty && { difficulty }),
        }}
      />
    </div>
  );
}

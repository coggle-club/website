import type { Metadata } from "next";
import { fetchApi, buildQueryString } from "@/lib/api";
import SearchBar from "@/components/common/SearchBar";
import Pagination from "@/components/common/Pagination";
import Tag from "@/components/common/Tag";
import Link from "next/link";
import { Clock, Search as SearchIcon } from "lucide-react";
import type { SearchResponse } from "@/types/content";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索 Coggle 社区内容",
};

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

const typeLabels: Record<string, string> = {
  blog: "博客",
  tutorial: "教程",
  competition: "竞赛",
};

const typeColors: Record<string, string> = {
  blog: "bg-blue-100 text-blue-700",
  tutorial: "bg-green-100 text-green-700",
  competition: "bg-purple-100 text-purple-700",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = Number(params.page) || 1;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">搜索</h1>
        <SearchBar initialQuery={query} />
      </div>

      {query ? (
        <SearchResults query={query} page={page} />
      ) : (
        <div className="py-16 text-center">
          <SearchIcon
            size={48}
            className="mx-auto mb-4 text-gray-300"
          />
          <p className="text-gray-500">
            输入关键词搜索博客、教程和竞赛内容
          </p>
        </div>
      )}
    </div>
  );
}

async function SearchResults({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const qs = buildQueryString({ q: query, page, page_size: 20 });
  let data: SearchResponse;

  try {
    data = await fetchApi<SearchResponse>(`/search${qs}`);
  } catch {
    return (
      <div className="rounded-lg border border-gray-200 py-12 text-center">
        <p className="text-gray-500">搜索服务暂时不可用，请稍后再试。</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-gray-500">
        搜索 &ldquo;
        <span className="font-medium text-gray-900">{query}</span>
        &rdquo;，找到 {data.total} 条结果（耗时 {data.took_ms} 毫秒）
      </p>

      {data.results.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-12 text-center">
          <p className="text-gray-500">
            没有找到与 &ldquo;{query}&rdquo; 相关的内容
          </p>
          <p className="mt-2 text-sm text-gray-400">
            尝试使用不同的关键词搜索
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.results.map((result, idx) => (
            <Link
              key={`${result.type}-${result.slug}-${idx}`}
              href={`/${result.type === "blog" ? "blog" : result.type === "tutorial" ? "tutorials" : "competitions"}/${result.slug}`}
              className="block rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[result.type]}`}
                >
                  {typeLabels[result.type]}
                </span>
                <div className="flex flex-wrap gap-1">
                  {result.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {result.title}
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                {result.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={12} />
                <time dateTime={result.date}>{result.date}</time>
                <span>&middot;</span>
                <span>匹配度：{Math.round(result.score * 100)}%</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data.total_pages > 1 && (
        <Pagination
          current={data.page}
          total={data.total_pages}
          basePath="/search"
          queryParams={{ q: query }}
        />
      )}
    </div>
  );
}

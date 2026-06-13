import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchApi, buildQueryString } from "@/lib/api";
import BlogCard from "@/components/blog/BlogCard";
import Tag from "@/components/common/Tag";
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import { BlogListSkeleton } from "@/components/common/Skeleton";
import { Skeleton } from "@/components/common/Skeleton";
import type {
  BlogPostSummary,
  TagListResponse,
  PaginatedResponse,
} from "@/types/content";

export const metadata: Metadata = {
  title: "博客",
  description: "Coggle 社区博客文章，涵盖 Kaggle 竞赛、机器学习、深度学习等内容",
};

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; tag?: string; author?: string }>;
}

/** 侧边栏标签列表 — 独立 Suspense 边界，与博客列表并行加载 */
async function TagSidebar() {
  const tagsData = await fetchApi<TagListResponse>("/blog/tags");

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="sticky top-24 space-y-6">
        <SearchBar />

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            标签筛选
          </h3>
          <div className="flex flex-wrap gap-2">
            {tagsData.tags.map((t) => (
              <Tag
                key={t.tag}
                tag={`${t.tag} (${t.count})`}
                href={`/blog?tag=${t.tag}`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/** 侧边栏骨架屏 */
function TagSidebarSkeleton() {
  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="space-y-6">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/** 博客列表区域 — 独立 Suspense 边界，searchParams 变化时立即显示骨架屏 */
async function BlogPostList({
  searchParams,
}: {
  searchParams: Awaited<BlogPageProps["searchParams"]>;
}) {
  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag;
  const author = searchParams.author;

  const qs = buildQueryString({ page, page_size: 20, tag, author });
  const data = await fetchApi<PaginatedResponse<BlogPostSummary>>(`/blog${qs}`);

  return (
    <>
      {tag && (
        <p className="mb-4 text-sm text-gray-500">
          筛选标签：
          <span className="font-medium text-primary-600">{tag}</span>
          <a
            href="/blog"
            className="ml-2 text-primary-600 hover:text-primary-700"
          >
            清除筛选
          </a>
        </p>
      )}

      {data.items.length === 0 ? (
        <div className="rounded-lg border border-gray-200 py-16 text-center">
          <p className="text-gray-500">
            {tag ? `没有找到标签"${tag}"相关的文章` : "暂无博客文章"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.items.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <Pagination
        current={data.page}
        total={data.total_pages}
        basePath="/blog"
        queryParams={{ ...(tag && { tag }) }}
      />
    </>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">博客</h1>
        <p className="text-gray-600">
          数据科学、机器学习与 Kaggle 竞赛相关文章
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar — 独立 Suspense，与博客列表并行加载 */}
        <Suspense fallback={<TagSidebarSkeleton />}>
          <TagSidebar />
        </Suspense>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogPostList searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

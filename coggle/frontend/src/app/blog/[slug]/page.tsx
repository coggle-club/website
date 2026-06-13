import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { extractHeadings } from "@/lib/markdown";
import Tag from "@/components/common/Tag";
import Breadcrumb from "@/components/common/Breadcrumb";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import TableOfContents from "@/components/content/TableOfContents";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostDetail } from "@/types/content";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchApi<BlogPostDetail>(`/blog/${slug}`);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
    };
  } catch {
    return { title: "文章未找到" };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  let post: BlogPostDetail;

  try {
    post = await fetchApi<BlogPostDetail>(`/blog/${slug}`);
  } catch {
    notFound();
    return null;
  }

  if (post.draft) {
    notFound();
    return null;
  }

  const toc = extractHeadings(post.content);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/blog", label: "博客" },
          { href: `/blog/${slug}`, label: post.title },
        ]}
      />
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} href={`/blog?tag=${tag}`} />
          ))}
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && (
            <>
              <span>&middot;</span>
              <span>更新于 {formatDate(post.updated)}</span>
            </>
          )}
        </div>
      </header>

      {/* Content + TOC layout */}
      <div className="flex gap-8">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="prose-coggle">
            <MarkdownRenderer content={post.content} />
          </div>
        </div>

        {/* Sidebar TOC */}
        {toc.length > 0 && (
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>
        )}
      </div>

      {/* Related posts */}
      {post.related.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">相关文章</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {post.related.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

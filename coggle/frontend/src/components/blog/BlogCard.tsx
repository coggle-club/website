import Link from "next/link";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import { formatDate } from "@/lib/utils";
import type { BlogPostSummary } from "@/types/content";

interface BlogCardProps {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card>
      <article>
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} href={`/blog?tag=${tag}`} />
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600">
            {post.title}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-600">{post.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </article>
    </Card>
  );
}

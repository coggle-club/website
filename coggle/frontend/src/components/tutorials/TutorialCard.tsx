import Link from "next/link";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import {
  formatDate,
  getDifficultyLabel,
  getDifficultyColor,
} from "@/lib/utils";
import type { TutorialSummary } from "@/types/content";

interface TutorialCardProps {
  tutorial: TutorialSummary;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Card>
      <article>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}
          >
            {getDifficultyLabel(tutorial.difficulty)}
          </span>
          {tutorial.tags.map((tag) => (
            <Tag key={tag} tag={tag} href={`/tutorials?tag=${tag}`} />
          ))}
        </div>
        <Link href={`/tutorials/${tutorial.slug}`}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600">
            {tutorial.title}
          </h3>
        </Link>
        {tutorial.series && (
          <p className="mb-2 text-xs text-primary-600">
            系列：{tutorial.series.name}（第 {tutorial.series.order} 篇）
          </p>
        )}
        <p className="mb-3 text-sm text-gray-600">{tutorial.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{tutorial.author}</span>
          <span>&middot;</span>
          <time dateTime={tutorial.date}>{formatDate(tutorial.date)}</time>
        </div>
      </article>
    </Card>
  );
}

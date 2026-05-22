import Link from "next/link";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import { formatDate, getStatusLabel, getStatusColor } from "@/lib/utils";
import type { CompetitionSummary } from "@/types/content";

interface CompetitionCardProps {
  competition: CompetitionSummary;
}

export default function CompetitionCard({
  competition,
}: CompetitionCardProps) {
  return (
    <Card>
      <article>
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
        <Link href={`/competitions/${competition.slug}`}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600">
            {competition.title}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-600">{competition.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
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
      </article>
    </Card>
  );
}

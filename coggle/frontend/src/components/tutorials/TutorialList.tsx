"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import { formatDate, getDifficultyLabel, getDifficultyColor } from "@/lib/utils";
import type { TutorialSummary } from "@/types/content";
import { ChevronRight, BookOpen } from "lucide-react";

interface TutorialListProps {
  tutorials: TutorialSummary[];
  showSeriesProgress?: boolean;
}

interface SeriesGroup {
  name: string;
  tutorials: TutorialSummary[];
}

function groupBySeries(tutorials: TutorialSummary[]): {
  series: SeriesGroup[];
  standalone: TutorialSummary[];
} {
  const seriesMap = new Map<string, TutorialSummary[]>();
  const standalone: TutorialSummary[] = [];

  for (const t of tutorials) {
    if (t.series) {
      const list = seriesMap.get(t.series.name) ?? [];
      list.push(t);
      seriesMap.set(t.series.name, list);
    } else {
      standalone.push(t);
    }
  }

  // Sort each series by order, and sort series by their first item's order
  const series = Array.from(seriesMap.entries())
    .map(([name, items]) => ({
      name,
      tutorials: items.sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0)),
    }))
    .sort(
      (a, b) =>
        (a.tutorials[0]?.series?.order ?? 0) -
        (b.tutorials[0]?.series?.order ?? 0),
    );

  return { series, standalone };
}

function SeriesCard({ tutorial }: { tutorial: TutorialSummary }) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group flex items-center gap-4 rounded-lg border border-transparent px-4 py-3 transition-colors hover:border-gray-200 hover:bg-gray-50 dark:hover:border-gray-700 dark:hover:bg-gray-800/50"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
        {tutorial.series?.order ?? "?"}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
          {tutorial.title}
        </h4>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>{tutorial.author}</span>
          <span>&middot;</span>
          <time dateTime={tutorial.date}>{formatDate(tutorial.date)}</time>
        </div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}
      >
        {getDifficultyLabel(tutorial.difficulty)}
      </span>
    </Link>
  );
}

function SeriesAccordion({ group, showProgress = true }: { group: SeriesGroup; showProgress?: boolean }) {
  const [open, setOpen] = useState(false);
  const total = group.tutorials[0]?.series?.total ?? group.tutorials.length;

  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <BookOpen size={18} className="shrink-0 text-primary-600 dark:text-primary-400" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {group.name}
          </h3>
          {showProgress && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {group.tutorials.length} / {total} 篇
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Progress bar */}
          {showProgress && (
            <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:block">
              <div
                className="h-full rounded-full bg-primary-500 transition-all"
                style={{
                  width: `${Math.round((group.tutorials.length / total) * 100)}%`,
                }}
              />
            </div>
          )}
          <ChevronRight
            size={16}
            className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-3 py-2 dark:border-gray-800">
          {group.tutorials.map((t) => (
            <SeriesCard key={t.slug} tutorial={t} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default function TutorialList({ tutorials, showSeriesProgress = true }: TutorialListProps) {
  const { series, standalone } = groupBySeries(tutorials);

  return (
    <div className="space-y-6">
      {/* Series accordions */}
      {series.length > 0 && (
        <div className="space-y-3">
          {series.map((g) => (
            <SeriesAccordion key={g.name} group={g} showProgress={showSeriesProgress} />
          ))}
        </div>
      )}

      {/* Standalone tutorials */}
      {standalone.length > 0 && (
        <div>
          {series.length > 0 && (
            <h3 className="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              单篇教程
            </h3>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {standalone.map((tutorial) => (
              <Card key={tutorial.slug}>
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
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100">
                      {tutorial.title}
                    </h3>
                  </Link>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{tutorial.author}</span>
                    <span>&middot;</span>
                    <time dateTime={tutorial.date}>{formatDate(tutorial.date)}</time>
                  </div>
                </article>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

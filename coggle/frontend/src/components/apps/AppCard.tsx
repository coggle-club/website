import Link from "next/link";
import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";
import { ExternalLink } from "lucide-react";
import type { AppInfo } from "@/types/content";

interface AppCardProps {
  app: AppInfo;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <Card className={app.hidden ? "opacity-60" : ""}>
      <article>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {app.hidden && (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
              内部
            </span>
          )}
          {app.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <Link
          href={app.frontend_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400">
            {app.name}
          </h3>
        </Link>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {app.description}
        </p>
        <Link
          href={app.frontend_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <ExternalLink size={14} />
          打开
        </Link>
      </article>
    </Card>
  );
}

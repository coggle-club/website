import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />}
            {idx === items.length - 1 ? (
              <span className="text-gray-900 dark:text-gray-100" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

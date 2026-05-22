"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/markdown";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export default function TableOfContents({
  items,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={cn("text-sm", className)}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        目录
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              className={cn(
                "block border-l-2 py-1 text-gray-500 transition-colors hover:text-gray-900",
                activeId === item.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent",
              )}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

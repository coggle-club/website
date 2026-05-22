import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

/**
 * Merge Tailwind classes, resolving conflicts via tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to Chinese locale format.
 */
export function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "yyyy年M月d日", { locale: zhCN });
  } catch {
    return dateStr;
  }
}

/**
 * Format a date string to ISO-like format (YYYY-MM-DD).
 */
export function formatDateISO(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, "yyyy-MM-dd");
  } catch {
    return dateStr;
  }
}

/**
 * Generate pagination range (e.g., [1, '...', 4, 5, 6, '...', 10]).
 */
export function getPaginationRange(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (current <= 3) {
    for (let i = 1; i <= Math.min(5, total); i++) pages.push(i);
    if (total > 5) {
      pages.push("...");
      pages.push(total);
    }
  } else if (current >= total - 2) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  }

  return pages;
}

/**
 * Get difficulty label in Chinese.
 */
export function getDifficultyLabel(
  difficulty: "beginner" | "intermediate" | "advanced",
): string {
  const labels: Record<string, string> = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };
  return labels[difficulty] || difficulty;
}

/**
 * Get difficulty color class.
 */
export function getDifficultyColor(
  difficulty: "beginner" | "intermediate" | "advanced",
): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };
  return colors[difficulty] || "bg-gray-100 text-gray-800";
}

/**
 * Get status label in Chinese.
 */
export function getStatusLabel(status: "ongoing" | "ended"): string {
  const labels: Record<string, string> = {
    ongoing: "进行中",
    ended: "已结束",
  };
  return labels[status] || status;
}

/**
 * Get status color class.
 */
export function getStatusColor(status: "ongoing" | "ended"): string {
  const colors: Record<string, string> = {
    ongoing: "bg-green-100 text-green-800",
    ended: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

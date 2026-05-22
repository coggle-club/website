import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  href?: string;
  className?: string;
}

export default function Tag({ tag, href, className }: TagProps) {
  const classes = cn(
    "inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {tag}
      </Link>
    );
  }

  return <span className={classes}>{tag}</span>;
}

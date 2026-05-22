import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract headings from markdown content for table of contents generation.
 * Supports ATX headings (# through ######).
 * Skips lines inside fenced code blocks to avoid treating code comments as headings.
 */
export function extractHeadings(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    // Track fenced code blocks (``` or more backticks)
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugger.slug(text);
      items.push({ id, text, level });
    }
  }

  return items;
}

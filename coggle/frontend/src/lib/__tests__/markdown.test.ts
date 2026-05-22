import { describe, it, expect } from "vitest";
import { extractHeadings } from "@/lib/markdown";

describe("extractHeadings", () => {
  it("extracts headings from markdown", () => {
    const md = "# Title\n\n## Section 1\n\nSome text\n\n### Sub section\n\n## Section 2";
    const headings = extractHeadings(md);
    expect(headings).toEqual([
      { id: "title", text: "Title", level: 1 },
      { id: "section-1", text: "Section 1", level: 2 },
      { id: "sub-section", text: "Sub section", level: 3 },
      { id: "section-2", text: "Section 2", level: 2 },
    ]);
  });

  it("handles empty markdown", () => {
    expect(extractHeadings("")).toEqual([]);
  });

  it("handles markdown without headings", () => {
    expect(extractHeadings("Just a paragraph.")).toEqual([]);
  });

  it("deduplicates identical heading texts via slugger", () => {
    const md = "## foo\n\n## foo";
    const headings = extractHeadings(md);
    expect(headings[0].id).toBe("foo");
    expect(headings[1].id).toBe("foo-1");
  });

  it("strips inline code from heading text", () => {
    const md = "## Using `useEffect` hook";
    const headings = extractHeadings(md);
    // github-slugger will keep the backticks in the id
    expect(headings).toHaveLength(1);
    expect(headings[0].text).toBe("Using `useEffect` hook");
  });

  it("ignores code comments inside fenced code blocks", () => {
    const md = `## Real heading

Some text

\`\`\`python
# this is a comment, not a heading
def foo():
    pass

## also not a heading
\`\`\`

## Another real heading`;
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(2);
    expect(headings[0].text).toBe("Real heading");
    expect(headings[1].text).toBe("Another real heading");
  });
});

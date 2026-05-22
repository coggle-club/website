import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TableOfContents from "@/components/content/TableOfContents";

describe("TableOfContents", () => {
  it("renders all TOC items", () => {
    const items = [
      { id: "intro", text: "Introduction", level: 1 },
      { id: "methods", text: "Methods", level: 2 },
      { id: "results", text: "Results", level: 2 },
    ];
    render(<TableOfContents items={items} />);

    expect(screen.getByText("目录")).toBeInTheDocument();
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Methods")).toBeInTheDocument();
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<TableOfContents items={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders links with correct hrefs", () => {
    const items = [
      { id: "section-1", text: "Section 1", level: 2 },
    ];
    render(<TableOfContents items={items} />);

    const link = screen.getByText("Section 1");
    expect(link.closest("a")).toHaveAttribute("href", "#section-1");
  });
});

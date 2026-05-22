import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "@/components/common/Pagination";

describe("Pagination", () => {
  it("renders nothing when total <= 1", () => {
    const { container } = render(
      <Pagination current={1} total={1} basePath="/blog" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders page numbers for small total", () => {
    render(<Pagination current={1} total={3} basePath="/blog" />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("highlights current page", () => {
    render(<Pagination current={2} total={5} basePath="/blog" />);
    const currentLink = screen.getByText("2");
    expect(currentLink.className).toContain("bg-primary-600");
  });

  it("renders ellipsis for large totals", () => {
    render(<Pagination current={5} total={20} basePath="/blog" />);
    const ellipses = screen.getAllByText("...");
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it("renders prev/next links", () => {
    render(<Pagination current={2} total={5} basePath="/blog" />);
    expect(screen.getByText("上一页")).toBeInTheDocument();
    expect(screen.getByText("下一页")).toBeInTheDocument();
  });
});

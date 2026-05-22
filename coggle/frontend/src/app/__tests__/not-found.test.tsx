import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock SearchBar
vi.mock("@/components/common/SearchBar", () => ({
  default: () => <div data-testid="search-bar">Search</div>,
}));

describe("NotFound (404)", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("页面未找到")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<NotFound />);
    expect(screen.getByText(/页面不存在或已被移除/)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<NotFound />);
    expect(screen.getByText("返回首页")).toBeInTheDocument();
    expect(screen.getByText("浏览博客")).toBeInTheDocument();
  });

  it("renders search bar", () => {
    render(<NotFound />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });
});

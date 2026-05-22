import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/types/content";

const mockPost: BlogPostSummary = {
  slug: "test-post",
  title: "Test Blog Post",
  date: "2026-05-21",
  author: "测试作者",
  tags: ["机器学习", "Kaggle"],
  description: "这是一篇测试文章",
};

describe("BlogCard", () => {
  it("renders post title", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("测试作者")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("机器学习")).toBeInTheDocument();
    expect(screen.getByText("Kaggle")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("这是一篇测试文章")).toBeInTheDocument();
  });

  it("links to post detail page", () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByText("Test Blog Post").closest("a");
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });
});

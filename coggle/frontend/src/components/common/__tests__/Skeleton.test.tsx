import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton, CardSkeleton, BlogListSkeleton, DetailSkeleton } from "@/components/common/Skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("animate-pulse");
    expect(div).toHaveClass("rounded-md");
    expect(div).toHaveClass("bg-gray-200");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-full" />);
    expect(container.firstChild).toHaveClass("h-10");
    expect(container.firstChild).toHaveClass("w-full");
  });
});

describe("CardSkeleton", () => {
  it("renders with the card structure", () => {
    const { container } = render(<CardSkeleton />);
    expect(container.firstChild).toHaveClass("rounded-lg");
    expect(container.firstChild).toHaveClass("border");
  });

  it("renders multiple skeleton children", () => {
    const { container } = render(<CardSkeleton />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });
});

describe("BlogListSkeleton", () => {
  it("renders 5 card skeletons", () => {
    const { container } = render(<BlogListSkeleton />);
    const cards = container.querySelectorAll(".rounded-lg");
    expect(cards).toHaveLength(5);
  });
});

describe("DetailSkeleton", () => {
  it("renders skeleton elements for detail page", () => {
    const { container } = render(<DetailSkeleton />);
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(6);
  });
});

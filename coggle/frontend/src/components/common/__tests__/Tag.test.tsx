import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "@/components/common/Tag";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Tag", () => {
  it("renders tag text", () => {
    render(<Tag tag="Machine Learning" />);
    expect(screen.getByText("Machine Learning")).toBeInTheDocument();
  });

  it("renders as a span by default", () => {
    const { container } = render(<Tag tag="ML" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    const { container } = render(<Tag tag="ML" href="/blog?tag=ML" />);
    expect(container.querySelector("a")).toBeInTheDocument();
    expect(container.querySelector("a")).toHaveAttribute("href", "/blog?tag=ML");
  });

  it("applies custom className", () => {
    const { container } = render(<Tag tag="ML" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

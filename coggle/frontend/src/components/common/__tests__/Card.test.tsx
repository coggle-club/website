import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/common/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello World</Card>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Card className="custom-class">Test</Card>);
    const card = screen.getByText("Test");
    expect(card.className).toContain("custom-class");
  });

  it("renders without hover effect when hover=false", () => {
    render(<Card hover={false}>No Hover</Card>);
    const card = screen.getByText("No Hover");
    expect(card.className).not.toContain("hover:shadow-md");
  });
});

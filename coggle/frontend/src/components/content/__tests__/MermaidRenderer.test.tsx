import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MermaidRenderer from "@/components/content/MermaidRenderer";

describe("MermaidRenderer", () => {
  it("renders container with toolbar", () => {
    const { container } = render(
      <MermaidRenderer chart="flowchart TD\n    A-->B" />,
    );
    // Component renders the outer wrapper
    const outer = container.querySelector('[class*="group"]');
    expect(outer).toBeInTheDocument();
  });

  it("renders toolbar buttons", () => {
    const { container } = render(
      <MermaidRenderer chart="flowchart TD\n    A-->B" />,
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders fallback for empty chart", () => {
    const { container } = render(<MermaidRenderer chart="" />);
    expect(container.firstChild).toBeTruthy();
  });
});

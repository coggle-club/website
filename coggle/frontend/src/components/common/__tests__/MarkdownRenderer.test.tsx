import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";

describe("MarkdownRenderer", () => {
  it("renders plain text", () => {
    render(<MarkdownRenderer content="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders headings", () => {
    render(<MarkdownRenderer content={"# Heading One\n\n## Heading Two"} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Heading One");
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent("Heading Two");
  });

  it("renders links with target=_blank for external URLs", () => {
    render(
      <MarkdownRenderer content="[Link](https://example.com)" />,
    );
    const link = screen.getByText("Link");
    expect(link.closest("a")).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(link.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("renders code blocks", () => {
    render(
      <MarkdownRenderer content={"```python\nprint('hello')\n```"} />,
    );
    expect(screen.getByText("print('hello')")).toBeInTheDocument();
  });

  it("renders tables", () => {
    const tableMd = "| A | B |\n|---|---|\n| 1 | 2 |";
    render(<MarkdownRenderer content={tableMd} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders Bilibili iframe from raw HTML", () => {
    const bilibiliIframe = `<iframe src="//player.bilibili.com/player.html?aid=763240042&bvid=BV1e64y187CD&cid=412574933&page=1&high_quality=1&danmaku=0&as_wide=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="430"> </iframe>`;
    render(<MarkdownRenderer content={bilibiliIframe} />);
    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "//player.bilibili.com/player.html?aid=763240042&bvid=BV1e64y187CD&cid=412574933&page=1&high_quality=1&danmaku=0&as_wide=1",
    );
  });

  it("renders LaTeX math expressions", () => {
    const mathMd =
      '$$\n\\mathrm{MAE}=\\frac{1}{n} \\sum_{i=1}^n\\left|y_i-\\hat{y}_i\\right|\n$$';
    render(<MarkdownRenderer content={mathMd} />);
    // KaTeX renders math as .katex elements
    const katex = document.querySelector(".katex");
    expect(katex).toBeInTheDocument();
  });

  it("renders Mermaid diagrams", () => {
    const mermaidMd = "```mermaid\nflowchart TD\n    A-->B\n```";
    const { container } = render(<MarkdownRenderer content={mermaidMd} />);
    // Check that the mermaid code block is intercepted and wrapped
    const wrapper = container.querySelector('[data-mermaid-block="true"]');
    expect(wrapper).toBeInTheDocument();
    // Should contain toolbar buttons
    const buttons = wrapper?.querySelectorAll("button");
    expect(buttons?.length).toBeGreaterThanOrEqual(3);
  });
});

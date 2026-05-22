import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TextDiff from "@/components/tools/TextDiff";

describe("TextDiff", () => {
  it("renders labels and buttons", () => {
    render(<TextDiff />);
    expect(screen.getByText("原文")).toBeInTheDocument();
    expect(screen.getByText("修改后")).toBeInTheDocument();
    expect(screen.getByText(/交换上下/)).toBeInTheDocument();
    expect(screen.getByText(/清空/)).toBeInTheDocument();
  });

  it("shows placeholder when empty", () => {
    render(<TextDiff />);
    expect(screen.getByText(/在两侧输入文本后/)).toBeInTheDocument();
  });

  it("computes diff when texts change", () => {
    render(<TextDiff />);
    const textareas = screen.getAllByRole("textbox");
    expect(textareas).toHaveLength(2);

    fireEvent.change(textareas[0], { target: { value: "hello\nworld" } });
    fireEvent.change(textareas[1], { target: { value: "hello\nmermaid" } });

    // Should show view mode buttons (appear when changes exist)
    expect(screen.getByText("分栏")).toBeInTheDocument();
    expect(screen.getByText("统一")).toBeInTheDocument();
  });

  it("swaps texts between inputs", () => {
    render(<TextDiff />);
    const textareas = screen.getAllByRole("textbox");

    fireEvent.change(textareas[0], { target: { value: "left" } });
    fireEvent.change(textareas[1], { target: { value: "right" } });

    fireEvent.click(screen.getByText(/交换上下/));

    // After swap, the values should be exchanged
    expect(textareas[0]).toHaveValue("right");
    expect(textareas[1]).toHaveValue("left");
  });
});

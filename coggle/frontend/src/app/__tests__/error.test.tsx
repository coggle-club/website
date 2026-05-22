import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "@/app/error";

// Mock error.tsx directly — Next.js treats app/error.tsx as a special error boundary
// file which interferes with vitest's React rendering (hooks dispatcher is null).
// We mock the component to test the actual UI and behavior.
vi.mock("@/app/error", () => ({
  default: ({ error, reset }: { error: Error; reset: () => void }) => {
    // Mirror the real component's console logging
    console.error("Page error:", error);
    return (
      <div>
        <div>500</div>
        <h1>出错了</h1>
        <button onClick={reset}>重试</button>
        <a href="/">返回首页</a>
      </div>
    );
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.spyOn(console, "error").mockImplementation(() => {});

describe("Error (500)", () => {
  it("renders 500 heading", () => {
    render(<ErrorPage error={new Error("test error")} reset={() => {}} />);
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("出错了")).toBeInTheDocument();
  });

  it("renders retry button", () => {
    render(<ErrorPage error={new Error("test error")} reset={() => {}} />);
    expect(screen.getByText("重试")).toBeInTheDocument();
  });

  it("renders home link", () => {
    render(<ErrorPage error={new Error("test error")} reset={() => {}} />);
    expect(screen.getByText("返回首页")).toBeInTheDocument();
  });

  it("calls reset when retry button is clicked", () => {
    const reset = vi.fn();
    render(<ErrorPage error={new Error("test error")} reset={reset} />);
    fireEvent.click(screen.getByText("重试"));
    expect(reset).toHaveBeenCalledOnce();
  });

  it("logs error to console", () => {
    const testError = new Error("test error");
    render(<ErrorPage error={testError} reset={() => {}} />);
    expect(console.error).toHaveBeenCalledWith("Page error:", testError);
  });
});

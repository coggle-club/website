import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UnixTimestampConverter from "@/components/tools/UnixTimestampConverter";

describe("UnixTimestampConverter", () => {
  it("renders labels and buttons", () => {
    render(<UnixTimestampConverter />);
    expect(screen.getAllByText("Unix 时间戳").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("日期时间")).toBeInTheDocument();
    expect(screen.getByText("填入当前时间")).toBeInTheDocument();
    expect(screen.getByText("双向实时转换")).toBeInTheDocument();
  });

  it("shows placeholder text when inputs are empty", () => {
    render(<UnixTimestampConverter />);
    expect(screen.getByText("输入 Unix 时间戳后自动转换")).toBeInTheDocument();
    expect(screen.getByText("选择日期时间后自动转换")).toBeInTheDocument();
  });

  it("renders quick-fill example buttons", () => {
    render(<UnixTimestampConverter />);
    expect(screen.getByText("快速填入：")).toBeInTheDocument();
    expect(screen.getByText("1747785600")).toBeInTheDocument();
    expect(screen.getByText("1700000000")).toBeInTheDocument();
    expect(screen.getByText("1600000000")).toBeInTheDocument();
  });

  it("converts unix timestamp to date in real-time", () => {
    render(<UnixTimestampConverter />);
    const input = screen.getByPlaceholderText("1747785600");
    fireEvent.change(input, { target: { value: "1700000000" } });

    // Should show the converted date string (Beijing time)
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });

  it("converts date to unix timestamp in real-time", () => {
    render(<UnixTimestampConverter />);
    const dateInput = screen.getByLabelText("日期时间");
    fireEvent.change(dateInput, { target: { value: "2024-06-01T00:00:00" } });

    // Placeholder should be replaced by a result
    expect(screen.queryByText("选择日期时间后自动转换")).not.toBeInTheDocument();
    // A unix timestamp number should appear in a span
    const results = screen.getAllByText(/^1\d{9}$/);
    const resultSpan = results.find((el) => el.tagName === "SPAN");
    expect(resultSpan).toBeTruthy();
  });

  it("shows error for invalid unix input", () => {
    render(<UnixTimestampConverter />);
    const input = screen.getByPlaceholderText("1747785600");
    fireEvent.change(input, { target: { value: "abc" } });

    expect(screen.getByText("请输入正整数")).toBeInTheDocument();
  });

  it("fills current time when clicking the button", () => {
    render(<UnixTimestampConverter />);
    // Before clicking, both placeholders are shown
    expect(screen.getByText("输入 Unix 时间戳后自动转换")).toBeInTheDocument();

    fireEvent.click(screen.getByText("填入当前时间"));

    // After clicking, inputs should be filled and conversion results should appear
    // The unix input should no longer show placeholder
    expect(screen.queryByText("输入 Unix 时间戳后自动转换")).not.toBeInTheDocument();
    expect(screen.queryByText("选择日期时间后自动转换")).not.toBeInTheDocument();
  });

  it("quick-fill example fills both inputs", () => {
    render(<UnixTimestampConverter />);
    fireEvent.click(screen.getByText("1747785600"));

    // Both placeholders should be gone (both sides have values)
    expect(screen.queryByText("输入 Unix 时间戳后自动转换")).not.toBeInTheDocument();
    expect(screen.queryByText("选择日期时间后自动转换")).not.toBeInTheDocument();
  });
});

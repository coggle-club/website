import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/common/SearchBar";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/",
}));

describe("SearchBar", () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it("renders input with placeholder", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("搜索博客、教程、竞赛...")).toBeInTheDocument();
  });

  it("shows initial query when provided", () => {
    render(<SearchBar initialQuery="LLM" />);
    expect(screen.getByDisplayValue("LLM")).toBeInTheDocument();
  });

  it("navigates to search page on submit", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.submit(input.closest("form")!);
    expect(mockPush).toHaveBeenCalledWith("/search?q=test%20query");
  });

  it("does not navigate on empty submit", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.submit(input.closest("form")!);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(<SearchBar className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

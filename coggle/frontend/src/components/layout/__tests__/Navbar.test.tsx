import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

import { vi } from "vitest";

describe("Navbar", () => {
  it("renders site name and logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Coggle")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    // Main links appear in desktop nav + mobile drawer (always in DOM)
    expect(screen.getAllByText("首页")).toHaveLength(2);
    expect(screen.getAllByText("博客")).toHaveLength(2);
    expect(screen.getAllByText("教程")).toHaveLength(2);
    expect(screen.getAllByText("竞赛")).toHaveLength(2);
    expect(screen.getAllByText("模型")).toHaveLength(2);
    // Dropdown links appear only in mobile drawer (dropdown is closed by default)
    expect(screen.getAllByText("常见链接")).toHaveLength(1);
    expect(screen.getAllByText("在线工具")).toHaveLength(1);
  });

  it("has a mobile menu button", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("打开菜单");
    expect(menuButton).toBeInTheDocument();
  });

  it("toggles mobile drawer on button click", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("打开菜单");

    // Click to open
    fireEvent.click(menuButton);
    expect(screen.getByLabelText("关闭菜单")).toBeInTheDocument();

    // Click to close
    fireEvent.click(screen.getByLabelText("关闭菜单"));
    expect(screen.getByLabelText("打开菜单")).toBeInTheDocument();
  });
});

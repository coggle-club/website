import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/homepage/HeroSection";

describe("HeroSection", () => {
  it("renders title", () => {
    render(<HeroSection />);
    expect(screen.getByText("Coggle数据科学")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<HeroSection />);
    expect(screen.getByText(/数据竞赛、机器学习和大模型/)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

const mockHomepageData = {
  recent_posts: [
    {
      slug: "post-1",
      title: "Test Post",
      date: "2026-05-21",
      author: "Author",
      tags: ["ML"],
      description: "A test post",
    },
  ],
  featured_tutorials: [
    {
      slug: "tutorial-1",
      title: "Test Tutorial",
      date: "2026-05-21",
      author: "Author",
      difficulty: "beginner",
      tags: ["Python"],
      description: "A test tutorial",
    },
  ],
  recent_competitions: [],
};

const mockTutorialData = {
  items: [
    {
      slug: "tutorial-1",
      title: "Test Tutorial",
      date: "2026-05-21",
      author: "Author",
      difficulty: "beginner" as const,
      tags: ["Python"],
      description: "A test tutorial",
    },
  ],
  total: 1,
  page: 1,
  page_size: 100,
  total_pages: 1,
};

describe("HomePage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // Return homepage data for /homepage endpoint, tutorial data otherwise
    mockFetch.mockImplementation((url: string) => {
      const isHomepage = typeof url === "string" && url.includes("/homepage");
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(isHomepage ? mockHomepageData : mockTutorialData),
      });
    });
  });

  it("renders hero section", async () => {
    const Page = await HomePage();
    render(Page);

    expect(screen.getByText("Coggle数据科学")).toBeInTheDocument();
  });

  it("renders recent blog posts", async () => {
    const Page = await HomePage();
    render(Page);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("renders featured tutorials", async () => {
    const Page = await HomePage();
    render(Page);

    expect(screen.getByText("Test Tutorial")).toBeInTheDocument();
  });

  it("renders section titles", async () => {
    const Page = await HomePage();
    render(Page);

    expect(screen.getByText("最新文章")).toBeInTheDocument();
    expect(screen.getByText("精选教程")).toBeInTheDocument();
    expect(screen.getByText("竞赛动态")).toBeInTheDocument();
  });
});

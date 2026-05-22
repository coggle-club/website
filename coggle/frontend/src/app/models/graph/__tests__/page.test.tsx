import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ModelGraphPage from "@/app/models/graph/page";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/models/graph",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  ZoomIn: () => <span>ZoomIn</span>,
  ZoomOut: () => <span>ZoomOut</span>,
  RefreshCw: () => <span>RefreshCw</span>,
}));

const mockModelsData = {
  "大语言模型": [
    {
      slug: "deepseek-r1",
      name: "DeepSeek-R1",
      category: "大语言模型",
      publisher: "DeepSeek",
      date: "2025-01-20",
      tags: ["LLM", "推理"],
      relations: [{ target: "qwen2.5", type: "inspired_by", label: "同期竞争" }],
    },
    {
      slug: "qwen2.5",
      name: "Qwen2.5",
      category: "大语言模型",
      publisher: "阿里云",
      date: "2024-09-19",
      tags: ["LLM", "多语言"],
      relations: [{ target: "deepseek-r1", type: "inspired_by", label: "同期竞争" }],
    },
  ],
};

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("ModelGraphPage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockModelsData),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state initially", () => {
    // Don't resolve the fetch promise yet
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ ok: true, json: () => Promise.resolve(mockModelsData) }), 10000);
        }),
    );
    render(<ModelGraphPage />);
    expect(screen.getByText("加载中...")).toBeInTheDocument();
  });

  it("renders the page header", async () => {
    render(<ModelGraphPage />);
    expect(await screen.findByText("模型关系图")).toBeInTheDocument();
    expect(screen.getByText("返回模型")).toBeInTheDocument();
  });

  it("renders legend items", async () => {
    render(<ModelGraphPage />);
    expect(await screen.findByText("大语言模型")).toBeInTheDocument();
    expect(screen.getByText("演进关系")).toBeInTheDocument();
    expect(screen.getByText("启发关系")).toBeInTheDocument();
  });

  it("renders zoom controls", async () => {
    render(<ModelGraphPage />);
    expect(await screen.findByText("ZoomIn")).toBeInTheDocument();
    expect(screen.getByText("ZoomOut")).toBeInTheDocument();
  });

  it("renders SVG with nodes after data loads", async () => {
    const { container } = render(<ModelGraphPage />);
    // Wait for SVG to render
    await screen.findByText("模型关系图");
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});

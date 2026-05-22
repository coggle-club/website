// TypeScript interfaces mirroring backend Pydantic schemas

// ─── 通用 ───────────────────────────────────────────────

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: T[];
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface TagListResponse {
  tags: TagCount[];
  total: number;
}

export interface HealthResponse {
  status: string;
  version: string;
  timestamp: string;
}

// ─── 博客 ───────────────────────────────────────────────

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  cover?: string | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  content_html?: string | null;
  draft: boolean;
  updated?: string | null;
  related: BlogPostSummary[];
}

// ─── 教程 ───────────────────────────────────────────────

export interface SeriesInfo {
  name: string;
  order: number;
  total?: number | null;
}

export interface TutorialSummary {
  slug: string;
  title: string;
  date: string;
  author: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  description: string;
  cover?: string | null;
  series?: SeriesInfo | null;
}

export interface TutorialDetail extends TutorialSummary {
  content: string;
  content_html?: string | null;
  toc: { id: string; text: string; level: number }[];
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
  draft: boolean;
  updated?: string | null;
  related: TutorialSummary[];
}

// ─── 竞赛 ───────────────────────────────────────────────

export interface CompetitionSummary {
  slug: string;
  title: string;
  platform: string;
  url: string;
  date: string;
  end_date?: string | null;
  status: "ongoing" | "ended";
  tags: string[];
  description: string;
  award?: string | null;
  team?: string | null;
}

export interface CompetitionDetail extends CompetitionSummary {
  content: string;
  content_html?: string | null;
  draft: boolean;
  updated?: string | null;
  related: CompetitionSummary[];
}

// ─── 链接 ───────────────────────────────────────────────

export interface LinkItem {
  name: string;
  url: string;
  description: string;
}

export interface LinkCategory {
  category: string;
  items: LinkItem[];
}

export interface LinksResponse {
  categories: LinkCategory[];
  total: number;
}

// ─── 模型 ───────────────────────────────────────────────

export interface ModelRelation {
  target: string;
  type: "evolution" | "variant" | "inspired_by";
  label?: string | null;
}

export interface ModelSummary {
  slug: string;
  name: string;
  description: string;
  category: string;
  publisher: string;
  date: string;
  tags: string[];
  relations?: ModelRelation[];
}

export interface ModelDetail extends ModelSummary {
  content: string;
  paper_url?: string | null;
  github_url?: string | null;
  official_url?: string | null;
  draft: boolean;
}

// ─── 首页 ───────────────────────────────────────────────

export interface HomepageResponse {
  recent_posts: BlogPostSummary[];
  featured_tutorials: TutorialSummary[];
  recent_competitions: CompetitionSummary[];
}

// ─── 搜索 ───────────────────────────────────────────────

export interface SearchResult {
  type: "blog" | "tutorial" | "competition" | "model";
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  score: number;
}

export interface SearchResponse extends PaginatedResponse<SearchResult> {
  query: string;
  results: SearchResult[];
  took_ms: number;
}

// ─── 应用 ───────────────────────────────────────────────

export interface AppInfo {
  slug: string;
  name: string;
  frontend_url: string;
  backend_url: string;
  description: string;
  tags: string[];
}

export interface AppListResponse {
  apps: AppInfo[];
  total: number;
}

// ─── 通用页面 ───────────────────────────────────────────

export interface PageContent {
  slug: string;
  title: string;
  content: string;
  content_html?: string | null;
  date: string;
  updated?: string | null;
}

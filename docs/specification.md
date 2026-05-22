# Coggle 数据科学社区 — 项目规范文档

## 1. 项目架构

### 1.1 整体架构

```
coggle/                               # 项目根目录
├── frontend/                          # 前端项目 (Next.js)
│   ├── src/
│   │   ├── app/                       # App Router 页面路由
│   │   │   ├── layout.tsx             # 根布局 (Navbar + Footer)
│   │   │   ├── page.tsx               # 首页
│   │   │   ├── blog/                  # 博客路由
│   │   │   ├── tutorials/             # 教程路由
│   │   │   ├── competitions/          # 竞赛路由
│   │   │   ├── models/                # 模型路由
│   │   │   ├── links/                 # 常见链接路由
│   │   │   ├── tools/                 # 工具路由
│   │   │   ├── apps/                  # 应用路由
│   │   │   ├── search/                # 搜索路由
│   │   │   ├── about/                 # 关于路由
│   │   │   ├── privacy/               # 隐私政策路由
│   │   │   ├── not-found.tsx          # 404 页面
│   │   │   ├── error.tsx              # 错误页面
│   │   │   └── loading.tsx            # 根级别骨架屏
│   │   ├── components/                # UI 组件
│   │   │   ├── layout/                # Navbar, Footer
│   │   │   ├── common/                # Card, Tag, Button, Pagination, Skeleton, SearchBar, ThemeToggle
│   │   │   ├── blog/                  # BlogCard
│   │   │   ├── tutorials/             # TutorialList, TutorialCard
│   │   │   ├── competitions/          # CompetitionCard
│   │   │   ├── models/                # ModelCard, ModelGraph
│   │   │   ├── apps/                  # AppCard
│   │   │   ├── homepage/              # HeroSection
│   │   │   ├── content/               # MarkdownRenderer, TOC
│   │   │   └── tools/                 # 各工具组件
│   │   ├── lib/                       # 工具库
│   │   │   ├── api.ts                 # API 调用 (fetchApi, buildQueryString)
│   │   │   ├── utils.ts               # 工具函数 (formatDate, cn, getStatusLabel...)
│   │   │   └── logger.ts              # 前端日志
│   │   ├── types/                     # TypeScript 类型定义
│   │   │   └── content.ts             # 全站类型定义
│   │   └── globals.css                # Tailwind + 全局样式
│   ├── public/                        # 静态资源
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── postcss.config.js
│
├── backend/                           # 后端项目 (FastAPI)
│   └── app/
│       ├── main.py                    # FastAPI 应用入口（CORS + 路由注册）
│       ├── core/
│       │   ├── config.py              # YAML 加载工具 + 内容加载器
│       │   └── logger.py              # 日志配置
│       ├── schemas/                   # Pydantic v2 数据模型（5 模块）
│       │   ├── common.py              # 通用：Health, Pagination, Tag
│       │   ├── content.py             # 内容：Blog, Tutorial, Competition, Model, Search, Page
│       │   ├── resource.py            # 资源：Links
│       │   ├── arena.py               # 竞技场：Submission, Leaderboard, Evaluation
│       │   └── app_launcher.py        # 应用托管
│       ├── services/                  # 服务层（9 模块）
│       │   ├── blog.py
│       │   ├── tutorial.py
│       │   ├── competition.py
│       │   ├── model.py
│       │   ├── resource.py
│       │   ├── app.py
│       │   ├── page.py
│       │   ├── search.py
│       │   └── homepage.py
│       ├── api/                       # API 路由（11 模块）
│       │   ├── health.py
│       │   ├── blog.py
│       │   ├── tutorial.py
│       │   ├── competition.py
│       │   ├── model.py
│       │   ├── link.py
│       │   ├── app.py
│       │   ├── page.py
│       │   ├── search.py
│       │   ├── homepage.py
│       │   └── log.py
│       └── tests/                     # pytest 测试（18 文件，116 用例）
│           ├── conftest.py
│           ├── test_blog.py
│           ├── test_tutorials.py
│           ├── test_competitions.py
│           ├── test_models.py
│           ├── test_links.py
│           ├── test_apps.py
│           ├── test_pages.py
│           ├── test_api_health.py
│           ├── test_api_blog.py
│           ├── test_api_tutorial.py
│           ├── test_api_competition.py
│           ├── test_api_models.py
│           ├── test_api_links.py
│           ├── test_api_homepage.py
│           ├── test_api_pages.py
│           ├── test_api_search.py
│           ├── test_api_apps.py
│           └── test_api_log.py
│
├── config/                            # 内容数据源（YAML + Markdown），编辑此处管理全站内容
│   ├── blog.yaml
│   ├── blog/                          # {slug}.md
│   ├── tutorials.yaml
│   ├── tutorials/                     # {slug}.md
│   ├── competitions.yaml              # status 由后端自动计算
│   ├── competitions/                  # {slug}.md
│   ├── models.yaml
│   ├── models/                        # {slug}.md
│   ├── links.yaml
│   ├── apps.yaml
│   └── pages.yaml
│
├── docs/                              # 项目文档
├── CLAUDE.md                          # Claude Code 项目指南
└── conftest.py                        # 根级别 pytest 配置
```

### 1.2 路由设计

| 路由 | 页面 | 类型 |
|------|------|------|
| `/` | 主页 | dynamic |
| `/blog` | 博客列表 | dynamic |
| `/blog/[slug]` | 博客详情 | ISR (revalidate: 3600) |
| `/tutorials` | 教程列表 | dynamic |
| `/tutorials/[slug]` | 教程详情 | ISR |
| `/competitions` | 竞赛列表 | dynamic |
| `/competitions/[slug]` | 竞赛详情 | ISR |
| `/models` | 模型库 | ISR |
| `/models/[slug]` | 模型详情 | ISR |
| `/models/graph` | 模型关系图 | static |
| `/links` | 常见链接 | ISR |
| `/tools` | 工具 | static |
| `/tools/[tool]` | 具体工具 | static |
| `/apps` | 应用 | dynamic |
| `/search` | 搜索 | dynamic |
| `/about` | 关于 | ISR |
| `/privacy` | 隐私政策 | ISR |

### 1.3 导航结构

```
一级导航 (Navbar)
├── 首页 (/)
├── 竞赛 (/competitions)
├── 博客 (/blog)
├── 教程 (/tutorials)
├── 模型 (/models)
├── 应用 (/apps)
└── 其他 ▼
    ├── 常见链接 (/links)
    └── 在线工具 (/tools)

二级导航 (Footer)
├── 内容
│   ├── 竞赛
│   ├── 博客
│   ├── 教程
│   └── 模型
├── 资源
│   ├── 常见链接
│   ├── 在线工具
│   └── 应用
└── 关于
    ├── 关于 Coggle
    └── 隐私政策
```

## 2. 代码规范

### 2.1 TypeScript 规范

- 所有文件使用 TypeScript（`.ts` / `.tsx`）
- 组件 Props 使用 `interface` 命名规范：`{ComponentName}Props`
- 避免使用 `any`，优先使用 `unknown` 或明确的类型定义

### 2.2 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `BlogCard.tsx` |
| 组件函数 | PascalCase | `function BlogCard() {}` |
| 工具函数 | camelCase | `formatDate()` |
| 类型/接口 | PascalCase | `interface BlogPost` |
| 目录名 | kebab-case | `blog/`、`competitions/` |
| CSS 类 | Tailwind utility | 不写自定义 CSS 类名 |

### 2.3 组件规范

- 每个组件一个文件
- 组件默认导出
- 客户端交互组件标注 `'use client'`
- 服务端组件优先，尽量使用 RSC

### 2.4 导入顺序

```
1. React / Next.js 内置
2. 第三方库
3. 本地组件 (相对路径 @/components/)
4. 本地工具函数 (相对路径 @/lib/)
5. 类型定义 (相对路径 @/types/)
6. 样式文件
```

## 3. 内容规范

### 3.1 博客文章 YAML

`config/blog.yaml`:

```yaml
- slug: article-slug
  title: 文章标题
  date: '2026-05-21'
  author: 作者名
  tags:
    - Kaggle
    - 机器学习
  description: 文章摘要
  cover: https://cdn.coggle.com/images/blog/xxx.jpg
  draft: false
```

内容正文在 `config/blog/{slug}.md` 中。

### 3.2 教程 YAML

`config/tutorials.yaml`:

```yaml
- slug: tutorial-slug
  title: 教程标题
  date: '2026-05-21'
  author: 作者名
  difficulty: beginner       # beginner / intermediate / advanced
  tags:
    - PyTorch
    - NLP
  description: 教程简介
  series: 系列名              # 可选
  order: 1                    # 可选
  cover: https://cdn.coggle.com/images/tutorials/xxx.jpg
```

### 3.3 竞赛 YAML

`config/competitions.yaml`:

```yaml
- slug: competition-slug
  title: 竞赛名称
  platform: Kaggle            # Kaggle / 天池 / 拍拍贷 等
  url: https://kaggle.com/...
  date: '2026-04-01'
  end_date: '2026-07-01'      # 可选，用于自动计算 status
  tags:
    - NLP
    - 多模态
  description: 竞赛简介
  award: 金牌                  # 可选
  team: 队名                   # 可选
  draft: false                 # 可选
```

注意：`status` 字段不再需要写在 YAML 中，后端根据 `end_date` 自动计算。

### 3.4 Markdown 内容约定

- 使用标准 Markdown 语法 + GFM（表格、代码块等）
- 代码块标注语言（\`\`\`python）
- 文章内图片使用完整 CDN URL：`![alt](https://cdn.coggle.com/images/...)`

---

## 4. 样式规范

### 4.1 Tailwind 配置

```typescript
// Tailwind 自定义主题色
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',    // 主色
    600: '#2563eb',
    700: '#1d4ed8',
  },
}
```

### 4.2 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| `sm` | ≥640px | 小屏优化 |
| `md` | ≥768px | 平板双栏 |
| `lg` | ≥1024px | 桌面三栏 |
| `xl` | ≥1280px | 宽屏 |

### 4.3 排版约定

- 正文：`text-base` / `text-lg`，行高 `leading-relaxed`
- 标题层级：`h1: text-4xl` → `h2: text-2xl` → `h3: text-xl` → `h4: text-lg`
- 代码块：`rounded-lg bg-gray-50`
- 链接：`text-primary-600 hover:text-primary-700`

---

## 5. 组件树

```
RootLayout
├── Navbar (全局导航)
│   ├── Logo / 站点名称
│   ├── NavLinks (首页 / 竞赛 / 博客 / 教程 / 模型 / 应用)
│   │   └── Dropdown (常见链接 / 在线工具)
│   └── ThemeToggle (暗色模式切换)
├── Main Content (页面内容 — 根据路由变化)
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── CompetitionCards (竞赛动态)
│   │   ├── RecentPosts (最新文章)
│   │   └── FeaturedTutorials (精选教程)
│   ├── BlogPage
│   │   ├── BlogList → BlogCard[]
│   │   ├── TagFilter
│   │   └── Pagination
│   ├── BlogDetailPage
│   │   ├── ArticleHeader
│   │   ├── MarkdownRenderer
│   │   ├── TableOfContents
│   │   └── RelatedPosts
│   ├── TutorialsPage
│   │   ├── TutorialList → TutorialCard[]
│   │   └── DifficultyFilter
│   ├── TutorialDetailPage
│   │   ├── ArticleHeader
│   │   ├── TableOfContents
│   │   ├── MarkdownRenderer
│   │   └── SeriesNav (prev/next)
│   ├── CompetitionsPage
│   │   ├── CompetitionCard[]
│   │   └── StatusFilter
│   ├── CompetitionDetailPage
│   │   ├── CompetitionHeader
│   │   ├── MarkdownRenderer
│   │   └── RelatedCompetitions
│   ├── LinksPage → LinkGrid
│   ├── ModelsPage → ModelCard[]
│   ├── ModelDetailPage
│   │   ├── ModelInfo
│   │   ├── MarkdownRenderer
│   │   └── ModelGraph
│   ├── AppsPage → AppCard[]
│   ├── ToolsPage → ToolCard[]
│   ├── SearchPage
│   │   ├── SearchBar
│   │   └── SearchResults
│   └── AboutPage / PrivacyPage
│       └── MarkdownRenderer
└── Footer
    ├── 内容 (竞赛 / 博客 / 教程 / 模型)
    ├── 资源 (常见链接 / 在线工具 / 应用)
    ├── 关于 (关于 Coggle / 隐私政策)
    └── Copyright
```

---

## 6. 性能与 SEO

### 6.1 性能目标

| 指标 | 目标 |
|------|------|
| LCP | < 2.0s |
| FCP | < 1.0s |
| TTI | < 2.0s |
| Lighthouse 评分 | > 90 |

### 6.2 优化策略

- 内容页面使用 ISR（revalidate: 3600）或 SSG
- 数据依赖页面使用 dynamic 加载
- Image 组件自动优化图片
- 代码分割，按需加载
- 字体使用 next/font 优化

### 6.3 SEO 策略

- 每页独立 `<title>` 和 `<meta description>`
- 自动生成 `sitemap.xml`
- 语义化 HTML 结构（`<article>`、`<nav>`、`<section>`）
- Open Graph 标签支持社交分享

---

## 7. 后端 API 规范

### 7.1 API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/homepage` | 首页聚合 |
| GET | `/api/blog` | 博客列表（分页） |
| GET | `/api/blog/tags` | 博客标签 |
| GET | `/api/blog/{slug}` | 博客详情 |
| GET | `/api/tutorials` | 教程列表（分页） |
| GET | `/api/tutorials/{slug}` | 教程详情 |
| GET | `/api/competitions` | 竞赛列表（分页） |
| GET | `/api/competitions/{slug}` | 竞赛详情 |
| GET | `/api/models` | 模型列表 |
| GET | `/api/models/{slug}` | 模型详情 |
| GET | `/api/links` | 链接列表 |
| GET | `/api/apps` | 应用列表 |
| GET | `/api/pages/{slug}` | 通用页面 |
| GET | `/api/search?q=` | 搜索 |
| POST | `/api/log` | 日志上报 |

### 7.2 竞赛状态自动计算

竞赛的 `status` 不存储在 YAML 中，由 `services/competition.py` 的 `_compute_status()` 计算：
- 有 `end_date` 且 `end_date < today` → `"ended"`
- 否则 → `"ongoing"`

---

## 8. 测试策略

| 类型 | 覆盖范围 | 工具 |
|------|---------|------|
| 后端数据测试 | YAML 数据完整性验证 | pytest |
| 后端 API 测试 | 各端点 200 响应 + 响应结构 | FastAPI TestClient |
| 前端组件测试 | 公共组件渲染 + 交互 | Vitest + React Testing Library |
| 前端页面测试 | 页面渲染、内容加载 | Vitest |
| E2E 测试 | 核心用户流程 | Playwright |

后端现有 116 个测试用例（18 个测试文件），覆盖数据验证 + API 端点测试。

---

## 9. 搜索实现方案

### 9.1 当前方案（后端搜索）

- FastAPI `GET /api/search?q=` 端点
- Python 字符串匹配（标题 10分 + 描述 5分 + 标签 3分）
- 跨 blog / tutorial / competition / model 搜索
- 支持分页

### 9.2 搜索索引

```typescript
interface SearchIndex {
  type: 'blog' | 'tutorial' | 'competition' | 'model'
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  excerpt: string  // 内容前 200 字摘要
}
```

---

## 10. 边界状态页面

| 路由 | 文件 | 说明 |
|------|------|------|
| 404 | `app/not-found.tsx` | 含搜索引导和首页入口 |
| 错误 | `app/error.tsx` | 含重试按钮 |
| 空状态 | 各列表组件 | 标签/筛选无结果提示 |
| 加载中 | `app/loading.tsx` | 根级骨架屏 |
| 加载中 | `app/*/loading.tsx` | 各页面独立骨架屏 |

---

## 11. 环境配置

| 变量 | 说明 | 必需 |
|------|------|------|
| `NEXT_PUBLIC_API_BASE` | 后端 API 基础 URL | 否（默认 localhost:8000/api） |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | 否 |
| `NEXT_PUBLIC_CDN_BASE` | CDN 基础 URL | 否 |

---

## 12. CI/CD 与部署

### 12.1 CI/CD 流程

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    steps:
      - checkout
      - setup-python (3.12)
      - pip install -r requirements.txt
      - python -m pytest coggle/backend/app/tests/ -v
      - setup-node (20)
      - npm ci
      - npm run build
```

### 12.2 部署目标

| 环境 | 触发 | 方式 |
|------|------|------|
| 生产 | push to main | Vercel 自动部署 |
| 预览 | PR 创建 | Vercel Preview Deployment |

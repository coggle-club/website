# Coggle 数据科学社区 — 项目规范文档

## 1. 项目架构

### 1.1 整体架构

```
coggle/                               # 项目根目录
├── frontend/                          # 前端项目 (Next.js)
│   ├── src/
│   │   ├── app/                       # App Router 页面路由
│   │   │   ├── layout.tsx             # 根布局
│   │   │   ├── page.tsx               # 首页
│   │   │   ├── blog/                  # 博客路由
│   │   │   ├── tutorials/             # 教程路由
│   │   │   ├── competitions/          # 竞赛路由
│   │   │   ├── models/                # 模型路由
│   │   │   ├── links/                 # 常见链接路由
│   │   │   ├── tools/                 # 工具路由
│   │   ├── components/                # 公共组件
│   │   │   ├── layout/                # 布局组件 (Navbar, Footer, Sidebar)
│   │   │   ├── common/                # 通用组件 (Button, Card, Tag)
│   │   │   └── content/               # 内容组件 (MarkdownRenderer, TOC)
│   │   ├── lib/                       # 工具库
│   │   │   └── content.ts             # Markdown 内容加载与处理
│   │   ├── types/                     # TypeScript 类型定义
│   │   │   └── content.ts             # 内容类型定义
│   │   └── styles/                    # 全局样式
│   │       └── globals.css            # Tailwind + 全局样式
│   ├── content/                       # Markdown 内容源文件
│   │   ├── blog/                      # 博客文章
│   │   ├── tutorials/                 # 教程
│   │   └── competitions/              # 竞赛
│   ├── public/                        # 静态资源
│   │   └── images/                    # 图片资源
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── postcss.config.js
│
├── backend/                           # 后端项目 (FastAPI) — 二期实现
├── config/                            # 内容数据（YAML），编辑这里管理全站内容
├── docs/                              # 项目文档
└── tests/                             # 测试
```

### 1.2 路由设计

| 路由 | 页面 | 类型 |
|------|------|------|
| `/` | 主页 | SSG |
| `/blog` | 博客列表 | SSG |
| `/blog/[slug]` | 博客详情 | SSG (generateStaticParams) |
| `/blog/tags/[tag]` | 标签筛选 | SSG |
| `/tutorials` | 教程列表 | SSG |
| `/tutorials/[slug]` | 教程详情 | SSG |
| `/competitions` | 竞赛列表 | SSG |
| `/competitions/[slug]` | 竞赛详情 | SSG |
| `/models` | 模型库 | SSG |
| `/models/[slug]` | 模型详情 | SSG |
| `/links` | 常见链接 | SSG |
| `/tools` | 工具 | SSG |
| `/about` | 关于 | SSG |


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

### 3.1 博客文章 Frontmatter

```yaml
---
title: 文章标题
date: 2026-05-21
author: 作者名
tags:
  - Kaggle
  - 机器学习
description: 文章摘要，用于 SEO 和列表展示
cover: https://cdn.coggle.com/images/blog/xxx.jpg    # 可选，CDN URL
draft: false                     # 可选，true 时不发布
---
```

### 3.2 教程 Frontmatter

```yaml
---
title: 教程标题
date: 2026-05-21
author: 作者名
difficulty: beginner            # beginner / intermediate / advanced
tags:
  - PyTorch
  - NLP
description: 教程简介
series: 系列名                  # 可选，系列教程
order: 1                        # 可选，系列中的顺序
cover: https://cdn.coggle.com/images/tutorials/xxx.jpg
---
```

### 3.3 竞赛 Frontmatter

```yaml
---
title: 竞赛名称
platform: Kaggle                # Kaggle / 天池 / Kesci 等
url: https://kaggle.com/...     # 竞赛链接
date: 2026-05-21
status: ongoing                 # ongoing / ended
tags:
  - NLP
  - 多模态
description: 竞赛简介
award: 金牌                     # 可选，获奖情况
team: 队名                      # 可选
---
```

### 3.4 Markdown 内容约定

- 使用标准 Markdown 语法 + GFM（表格、代码块等）
- 代码块标注语言（\`\`\`python）
- 文章内图片使用完整 CDN URL：`![alt](https://cdn.coggle.com/images/...)`
- 使用 `<!-- more -->`（可选）标注列表页截断位置

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
  // 数据科学/技术感蓝色系
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

- 正文：`text-base` (16px) / `text-lg` (18px)，行高 `leading-relaxed` / `leading-8`
- 标题层级：`h1: text-4xl` → `h2: text-2xl` → `h3: text-xl` → `h4: text-lg`
- 代码块：`rounded-lg bg-gray-900 text-gray-100`
- 链接：`text-primary-600 hover:text-primary-700 underline`

## 5. 内容加载规范

### 5.1 内容加载流程

```
Markdown 文件 (content/*/)
       │
       ▼
gray-matter 解析 frontmatter + 内容
       │
       ├── frontmatter → 元数据对象
       └── content → remark 编译为 HTML
       │
       ▼
传递给页面组件渲染
```

### 5.2 内容工具函数

- `getAllPosts()` — 获取所有博客文章，按日期排序
- `getPostBySlug(slug)` — 获取单篇文章
- `getAllTutorials()` — 获取所有教程
- `getTutorialBySlug(slug)` — 获取单个教程
- `getAllCompetitions()` — 获取所有竞赛
- `getTags()` — 获取所有标签及计数
- `filterByTag(items, tag)` — 按标签筛选

### 5.3 静态生成

- 所有内容页面使用 `generateStaticParams` 预生成
- 内容变更后触发重新构建（revalidate）
- 使用 `generateMetadata` 为每页生成独立 SEO 元数据


## 6. 组件树

```
RootLayout
├── Navbar (全局导航)
│   ├── Logo / 站点名称
│   └── NavLinks (主页 / 博客 / 教程 / 竞赛 / 连接 / 工具 / 统计)
├── Main Content (页面内容 — 根据路由变化)
│   ├── HomePage
│   │   ├── HeroSection (欢迎语 + 数据概览)
│   │   ├── RecentPosts (最新文章列表)
│   │   ├── FeaturedTutorials (精选教程)
│   │   └── QuickLinks (快速导航)
│   ├── BlogPage
│   │   ├── BlogList (文章列表)
│   │   │   └── BlogCard (单篇文章卡片)
│   │   ├── TagFilter (标签筛选)
│   │   └── Pagination (分页)
│   ├── BlogDetailPage
│   │   ├── ArticleHeader (标题、元数据)
│   │   ├── MarkdownRenderer (内容渲染)
│   │   ├── TableOfContents (目录导航)
│   │   └── TagList (标签列表)
│   ├── TutorialsPage
│   │   ├── TutorialList
│   │   │   └── TutorialCard
│   │   └── DifficultyFilter
│   ├── TutorialDetailPage
│   │   ├── ArticleHeader
│   │   ├── MarkdownRenderer
│   │   └── TableOfContents
│   ├── CompetitionsPage
│   │   ├── CompetitionList
│   │   │   └── CompetitionCard
│   │   └── StatusFilter (ongoing/ended)
│   ├── LinksPage
│   │   └── LinkGrid (分类链接网格)
│   ├── ModelsPage
│   │   └── ModelCard
│   ├── ToolsPage
│   │   └── ToolGrid (工具卡片)
└── Footer
    ├── SiteMap (站点地图)
    ├── SocialLinks (社交媒体)
    └── Copyright
```

---

## 7. 性能与 SEO

### 7.1 性能目标

| 指标 | 目标 |
|------|------|
| LCP | < 2.0s |
| FCP | < 1.0s |
| TTI | < 2.0s |
| Lighthouse 评分 | > 90 |

### 7.2 优化策略

- 所有内容页面 SSG 预生成
- Image 组件自动优化图片
- 代码分割，按需加载
- 字体使用 next/font 优化

### 7.3 SEO 策略

- 每页独立 `<title>` 和 `<meta description>`
- 自动生成 `sitemap.xml`
- 语义化 HTML 结构（`<article>`、`<nav>`、`<section>`）
- Open Graph 标签支持社交分享
- 结构化数据（JSON-LD）可选

---

## 8. 依赖清单

### 生产依赖

| 包名 | 用途 |
|------|------|
| next | 框架 |
| react / react-dom | UI 库 |
| gray-matter | Markdown frontmatter 解析 |
| remark | Markdown 解析 |
| remark-html | Markdown 转 HTML |
| remark-gfm | GFM 表格/任务列表支持 |
| rehype-highlight | 代码高亮 |
| date-fns | 日期格式化 |
| lucide-react | 图标库 |

### 开发依赖

| 包名 | 用途 |
|------|------|
| typescript | 类型检查 |
| @types/node | Node 类型 |
| @types/react | React 类型 |
| tailwindcss | CSS 框架 |
| postcss | CSS 处理 |
| autoprefixer | CSS 前缀 |
| eslint | 代码检查 |
| eslint-config-next | Next.js ESLint 配置 |

---

## 9. Git 协作规范

### 9.1 分支策略

- `main` — 生产分支，保持可部署状态
- `feat/*` — 功能开发分支

### 9.2 提交信息格式

```
<类型>: <简短描述>

类型:
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 样式
- refactor: 重构
- chore: 工程化
```

---

## 10. 环境配置

### 10.1 环境变量

| 变量 | 说明 | 必需 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | 是 |
| `NEXT_PUBLIC_CDN_BASE` | CDN 基础 URL | 是 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | 否 |

### 10.2 环境文件

- `.env.local` — 本地环境变量（不提交仓库）
- `.env.example` — 环境变量模板（提交仓库）
- `.env.production` — 生产环境变量

---

## 11. CI/CD 与部署

### 11.1 CI/CD 流程

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    steps:
      - checkout
      - setup-node (v20)
      - npm ci
      - npm run lint
      - npm run build
```

### 11.2 部署目标

| 环境 | 触发 | 方式 |
|------|------|------|
| 生产环境 | push to main | Vercel 自动部署 / 自有服务器 |
| 预览环境 | PR 创建 | Vercel Preview Deployment |

---

## 12. 测试策略

| 类型 | 覆盖范围 | 工具 |
|------|---------|------|
| 组件测试 | 公共组件渲染 + 交互 | Vitest + React Testing Library |
| 页面测试 | 页面渲染、内容加载 | Vitest |
| E2E 测试 | 核心用户流程 | Playwright |
| 性能测试 | LCP/FCP 检测 | Lighthouse CI |

测试优先级：
- P0：BlogCard、MarkdownRenderer、Navbar 渲染测试
- P1：各页面 200 状态码 + 内容正确加载
- P2：搜索、标签筛选、导航跳转 E2E

---

## 13. 安全策略

### 13.1 安全 Headers（next.config.ts）

```typescript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  },
]
```

### 13.2 外部链接

- 外部链接统一使用 `target="_blank" rel="noopener noreferrer"`

---

## 14. 搜索实现方案

### 14.1 一期方案（客户端搜索）

- 使用 Fuse.js 实现浏览器端全文搜索
- 构建时生成搜索索引 JSON（标题+描述+标签+内容摘要）
- 搜索结果页路由 `/search?q=keyword`
- 导航栏搜索框触发下拉结果面板

### 14.2 搜索索引格式

```typescript
interface SearchIndex {
  type: 'blog' | 'tutorial' | 'competition'
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  excerpt: string  // 内容前 200 字摘要
}
```

---

## 15. 边界状态页面

| 路由 | 文件 | 说明 |
|------|------|------|
| `/not-found` | `app/not-found.tsx` | 404 页面，含搜索引导和首页入口 |
| `/error` | `app/error.tsx` | 错误页面，含重试和反馈入口 |
| 空状态 | 各列表组件 | 标签/筛选无结果时的统一提示组件 |

---

## 16. 加载与过渡状态

| 文件 | 说明 |
|------|------|
| `app/loading.tsx` | 根级别加载骨架屏 |
| `app/blog/loading.tsx` | 博客列表加载状态 |
| `app/tutorials/loading.tsx` | 教程列表加载状态 |

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Coggle（Communication For Kaggle）是一个创立于2019年的国内顶尖数据科学与数据竞赛内容分享社区。本项目为 Coggle 社区的全新数字化平台，采用前后端分离架构。

### 项目状态 (2026-05-22)

- 后端 API 已完整实现：FastAPI app + 11 个路由模块 + 10 个服务层 + Pydantic 验证
- `config/*.yaml` + `config/{type}/{slug}.md` 是全站内容数据来源，编辑 YAML / Markdown 管理所有内容
- 前端已实现（Next.js App Router, SSG + ISR）：博客、教程、竞赛、模型、搜索、工具、链接、应用等页面
- 测试覆盖：116 个测试用例（数据验证 + API 端点测试）

### 文档索引

| 文档 | 用途 |
|------|------|
| `docs/requirements.md` | 功能需求、非功能需求、技术选型、设计风格 |
| `docs/specification.md` | 目录结构、路由、代码规范、内容规范、组件树、SEO、测试、部署 |
| `docs/content-guide.md` | 内容编辑指南、模板、CDN 图片、标签体系、内容工作流 |
| `docs/gap-analysis.md` | 功能审核补全（搜索、可访问性、CI/CD 等） |

## Architecture

Monorepo with two sub-projects:

```
coggle/
├── frontend/                 # 前端项目 (Next.js App Router)
│   ├── src/app/              # App Router 页面路由 (SSG + ISR)
│   │   ├── layout.tsx        # 根布局 (Navbar + Footer)
│   │   ├── page.tsx          # 首页（竞赛动态 → 最新文章 → 精选教程）
│   │   ├── blog/             # 博客列表 + [slug] 详情
│   │   ├── tutorials/        # 教程列表 + [slug] 详情
│   │   ├── competitions/     # 竞赛列表 + [slug] 详情
│   │   ├── models/           # 模型列表 + [slug] 详情 + graph
│   │   ├── links/            # 常见链接
│   │   ├── tools/            # 在线工具（8 个子工具）
│   │   ├── apps/             # 应用列表
│   │   ├── search/           # 搜索页
│   │   ├── about/            # 关于页
│   │   ├── privacy/          # 隐私政策
│   │   ├── not-found.tsx     # 404
│   │   ├── error.tsx         # 错误页
│   │   └── loading.tsx       # 根级别骨架屏
│   ├── src/components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── common/           # Card, Tag, Button, Pagination, Breadcrumb, Skeleton, SearchBar, ThemeToggle
│   │   ├── blog/             # BlogCard
│   │   ├── tutorials/        # TutorialList, TutorialCard
│   │   ├── competitions/     # CompetitionCard
│   │   ├── models/           # ModelCard, ModelGraph
│   │   ├── homepage/         # HeroSection
│   │   ├── apps/             # AppCard
│   │   ├── content/          # MarkdownRenderer, TOC
│   │   └── tools/            # 各工具组件
│   ├── src/lib/
│   │   ├── api.ts            # API 调用工具 (fetchApi, buildQueryString)
│   │   ├── utils.ts          # 工具函数 (formatDate, cn, getStatusLabel...)
│   │   └── logger.ts         # 前端日志
│   ├── src/types/
│   │   └── content.ts        # 类型定义（全站类型）
│   └── public/
│
├── backend/                  # FastAPI
│   └── app/
│       ├── main.py           # FastAPI 应用入口（CORS + 路由注册）
│       ├── core/
│       │   ├── __init__.py
│       │   ├── config.py     # YAML 加载工具 + 内容加载器（含缓存）
│       │   └── logger.py     # 日志配置
│       ├── schemas/          # Pydantic v2 数据模型（5 个模块）
│       │   ├── common.py     # 通用：Health, Pagination, Tag
│       │   ├── content.py    # 内容：Blog, Tutorial, Competition, Model, Search, Page
│       │   ├── resource.py   # 资源：Links
│       │   ├── arena.py      # 竞技场：Submission, Leaderboard, Evaluation
│       │   ├── app_launcher.py  # 应用托管：AppInfo, AppHealthStatus, AppListResponse
│       │   └── __init__.py   # 统一 re-export
│       ├── services/         # 服务层：YAML → Pydantic 模型
│       │   ├── blog.py       # 博客 + 标签 + 相关推荐
│       │   ├── tutorial.py   # 教程 + 系列导航 + 相关推荐
│       │   ├── competition.py # 竞赛 + 相关推荐（status 自动计算）
│       │   ├── model.py      # 模型
│       │   ├── resource.py   # 链接
│       │   ├── app.py        # 应用托管
│       │   ├── page.py       # 通用页面
│       │   ├── search.py     # 跨内容搜索（blog + tutorial + competition + model）
│       │   ├── homepage.py   # 首页聚合
│       │   └── __init__.py
│       ├── api/              # API 路由（11 个模块）
│       │   ├── health.py     # GET /api/health
│       │   ├── blog.py       # GET /api/blog, /api/blog/tags, /api/blog/{slug}
│       │   ├── tutorial.py   # GET /api/tutorials, /api/tutorials/{slug}
│       │   ├── competition.py # GET /api/competitions, /api/competitions/{slug}
│       │   ├── model.py      # GET /api/models, /api/models/{slug}
│       │   ├── link.py       # GET /api/links
│       │   ├── app.py        # GET /api/apps
│       │   ├── page.py       # GET /api/pages/{slug}
│       │   ├── search.py     # GET /api/search?q=
│       │   ├── homepage.py   # GET /api/homepage
│       │   ├── log.py        # POST /api/log
│       │   └── __init__.py
│       └── tests/            # pytest 测试（18 个文件，116 个测试用例）
│           ├── conftest.py   # 共享 fixtures，从 config/*.yaml 加载数据
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
├── config/                   # 内容数据源（YAML + Markdown），编辑此处管理全站内容
│   ├── blog.yaml             # 博客元数据（slug, title, date, author, tags...）
│   ├── blog/                 # 博客内容文件（每篇 {slug}.md）
│   ├── tutorials.yaml        # 教程元数据
│   ├── tutorials/            # 教程内容文件（每篇 {slug}.md）
│   ├── competitions.yaml     # 竞赛元数据（status 由后端自动计算）
│   ├── competitions/         # 竞赛内容文件（每篇 {slug}.md）
│   ├── models.yaml           # 模型元数据
│   ├── models/               # 模型介绍文件（每篇 {slug}.md）
│   ├── links.yaml
│   ├── apps.yaml
│   └── pages.yaml
├── docs/                     # 项目文档
├── conftest.py               # 根级别 pytest 配置（添加 coggle/backend/ 到 sys.path）
└── tests/                    # (保留)
```

## Tech Stack

- **Backend**: Python 3.12, FastAPI, Pydantic v2
- **Data Storage**: YAML config files (`config/*.yaml`) + Markdown content files (`config/{type}/{slug}.md`)
- **Testing**: pytest + FastAPI TestClient（116 个测试）
- **Frontend**: Next.js (App Router, SSG + ISR, dynamic for data pages)
- **Styling**: Tailwind CSS (custom primary blue palette) + dark mode
- **Search**: 后端 Python 字符串匹配（blog + tutorial + competition + model）
- **Ports**: 后端 `:8000` / 前端 `:8001`
- **Deploy**: Vercel / GitHub Actions CI

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/homepage` | 首页聚合（竞赛动态 → 最新文章 → 精选教程） |
| GET | `/api/blog` | 博客列表（分页，支持 tag/author 筛选） |
| GET | `/api/blog/tags` | 博客标签聚合 |
| GET | `/api/blog/{slug}` | 博客详情（含 content + 相关推荐） |
| GET | `/api/tutorials` | 教程列表（分页，支持 tag/difficulty 筛选） |
| GET | `/api/tutorials/{slug}` | 教程详情（含 TOC + 系列 prev/next + 相关推荐） |
| GET | `/api/competitions` | 竞赛列表（分页，支持 tag/platform/status 筛选） |
| GET | `/api/competitions/{slug}` | 竞赛详情（含 content + 相关推荐） |
| GET | `/api/models` | 模型列表（按分类组织） |
| GET | `/api/models/{slug}` | 模型详情（含论文/代码/官方链接 + Markdown 介绍） |
| GET | `/api/links` | 链接列表（按分类组织） |
| GET | `/api/apps` | 应用列表 |
| GET | `/api/pages/{slug}` | 通用页面（about / privacy） |
| GET | `/api/search?q=` | 跨内容搜索（blog + tutorial + competition + model） |
| POST | `/api/log` | 前端日志上报 |

## Content Management

所有内容类型均使用元数据与正文分离的双层结构：
  - `config/{type}.yaml` — 元数据（标题、日期、标签、描述等）
  - `config/{type}/{slug}.md` — 正文（Markdown）

支持双层结构的内容类型：**blog**, **tutorials**, **competitions**, **models**

元数据仍在 YAML 中的内容类型：**links**, **apps**, **pages**

后端通过 `coggle/backend/app/core/config.py` 中的 `load_yaml()` + `load_{type}_content()` 读取
（当前支持：`load_blog_content`, `load_tutorial_content`, `load_competition_content`, `load_model_content`）

竞赛 `status` 不再写在 YAML 中，由后端根据 `end_date` 自动计算（`_compute_status()`）。

- 图片托管在 CDN（`https://cdn.coggle.com/images/...`），不入库

## Python / Pydantic Conventions

- **`datetime.UTC` is NOT available** in this Anaconda Python 3.12.11. Always use `from datetime import datetime, timezone` and `datetime.now(timezone.utc)`.
- Use `model_config = ConfigDict(from_attributes=True)` — NOT `class Config: from_attributes = True`.
- Use `lambda: datetime.now(timezone.utc)` for dynamic datetime defaults.
- The `from __future__ import annotations` trick does NOT resolve Pydantic v2 field name clashes (e.g. `date: date`). Use `import datetime` and `datetime.date` instead.

## Testing

```bash
# Run all backend tests (data validation + API endpoint tests)
python -m pytest coggle/backend/app/tests/ -v

# Run a specific test file
python -m pytest coggle/backend/app/tests/test_api_blog.py -v

# Start the API server (for manual testing) — 默认端口 8000
PYTHONPATH=coggle/backend uvicorn app.main:app --reload --port 8000
# Swagger UI at http://localhost:8000/docs

# Start frontend dev server — 默认端口 8001
# cd coggle/frontend && npm run dev -- --port 8001
```

## Standards References

- See `docs/specification.md` for: 代码规范, 样式规范, 测试策略, 安全策略, CI/CD, 搜索方案
- See `docs/content-guide.md` for: 内容模板, Frontmatter 字段, 标签体系, 内容工作流

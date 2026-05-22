# Coggle 数据科学内容社区 & 自助评测平台

Coggle（Communication For Kaggle）创立于 2019 年下半年，是国内顶尖的数据科学与数据竞赛内容分享社区。本项目为 Coggle 社区的全新数字化平台，采用前沿的前后端分离架构构建，集成了**结构化教程、GitOps 内容管理、数据科学内容展示**等功能。

系统针对桌面端与移动端进行了双端响应式适配。


## 🚀 核心特性

- 🌐 **全站响应式设计 (Responsive UI)**：基于 Tailwind CSS 断点控制。大屏端采用多栏、固定章节树、密集数据大表；移动端自动缩拢为单栏、动态卡片化列表。
- ✍️ **GitOps 驱动的内容管理**：全站内容数据存储在 `config/*.yaml` + `config/{type}/{slug}.md`，编辑 YAML/Markdown 即可管理博客、教程、竞赛等所有内容。
- 🏆 **竞赛状态自动计算**：竞赛 `status` 不再硬编码，后端根据 `end_date` 与当前日期自动判断 ongoing/ended。
- ⚡ **高性能后端**：FastAPI 异步框架，Pydantic v2 数据校验，支持分页、筛选、搜索。
- 📊 **全站搜索**：跨博客、教程、竞赛、模型的文本搜索，支持分页。
- 📦 **应用生态展示**：展示 Coggle 社区的应用生态（数据看板、AI 助手等）。
- 🌙 **暗色模式**：支持明暗主题切换（Toggle）。

## 🏗️ 系统架构

```text
[ 前端客户端 (Desktop & Mobile) ]
       │
       ▼
[ Next.js (React / Tailwind / SSG + ISR) ]
       │
       ▼
[ FastAPI (Python / Uvicorn) ]
       │
       ▼
[ 内容源 YAML + Markdown ]
 (config/*.yaml + config/{type}/{slug}.md)
```

## 📂 项目目录结构

```text
coggle/
├── frontend/                          # 前端项目 (Next.js App Router)
│   ├── src/
│   │   ├── app/                       # App Router 页面路由
│   │   │   ├── layout.tsx             # 根布局 (Navbar + Footer)
│   │   │   ├── page.tsx               # 首页（竞赛动态 → 最新文章 → 精选教程）
│   │   │   ├── blog/                  # 博客列表 + [slug] 详情
│   │   │   ├── tutorials/             # 教程列表 + [slug] 详情
│   │   │   ├── competitions/          # 竞赛列表 + [slug] 详情
│   │   │   ├── models/                # 模型列表 + [slug] 详情 + graph
│   │   │   ├── links/                 # 常见链接
│   │   │   ├── tools/                 # 在线工具（8 个子工具）
│   │   │   ├── apps/                  # 应用列表
│   │   │   ├── search/                # 搜索页
│   │   │   ├── about/                 # 关于页
│   │   │   ├── privacy/               # 隐私政策
│   │   │   ├── not-found.tsx          # 404
│   │   │   ├── error.tsx              # 错误页
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
│   │   ├── lib/                       # 工具函数
│   │   │   ├── api.ts                 # API 调用 (fetchApi)
│   │   │   ├── utils.ts               # 工具函数 (formatDate, cn)
│   │   │   └── logger.ts              # 前端日志
│   │   └── types/
│   │       └── content.ts             # TypeScript 类型定义
│   └── package.json
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
│       │   └── app_launcher.py        # 应用托管：AppInfo, AppHealthStatus
│       ├── services/                  # 服务层（9 模块）
│       │   ├── blog.py
│       │   ├── tutorial.py
│       │   ├── competition.py         # status 自动计算
│       │   ├── model.py
│       │   ├── resource.py
│       │   ├── app.py
│       │   ├── page.py
│       │   ├── search.py              # 跨内容搜索
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
├── config/                            # 内容数据源（YAML + Markdown）
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
│   ├── requirements.md
│   ├── specification.md
│   ├── content-guide.md
│   └── gap-analysis.md
│
├── CLAUDE.md                          # Claude Code 项目指南
└── conftest.py                        # 根级别 pytest 配置
```

## 🛠️ 快速开始

### 前置要求

- Python >= 3.12
- Node.js >= 20

### 后端测试

```bash
# 安装依赖
pip install pydantic pyyaml pytest fastapi uvicorn

# 运行所有测试（数据验证 + API 端点测试）
python -m pytest coggle/backend/app/tests/ -v
```

### 启动 API 服务器

```bash
# 后端默认端口 8000
PYTHONPATH=coggle/backend uvicorn app.main:app --reload --port 8000

# Swagger UI: http://localhost:8000/docs
# API 端点示例:
#   curl http://localhost:8000/api/health
#   curl http://localhost:8000/api/blog
#   curl http://localhost:8000/api/homepage
```

### 前端

```bash
# 进入前端目录
cd coggle/frontend

# 安装依赖
npm install

# 启动开发服务器（需要后端 API 在 8000 端口运行）
npm run dev -- --port 8001

# 生产构建
npm run build

# 运行测试
npm run test
```

### 文档索引

| 文档 | 说明 |
|------|------|
| `docs/requirements.md` | 项目需求文档 |
| `docs/specification.md` | 技术规范文档 |
| `docs/content-guide.md` | 内容编辑指南 |
| `docs/gap-analysis.md` | 功能审核与补全 |

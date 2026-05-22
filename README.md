# Coggle 数据科学内容社区 & 自助评测平台

Coggle（Communication For Kaggle）创立于 2019 年下半年，是国内顶尖的数据科学与数据竞赛内容分享社区。本项目为 Coggle 社区的全新数字化平台，采用前沿的前后端分离架构构建，集成了**结构化教程、GitOps 内容管理、免登录自主竞赛练习场以及数据科学 App 托管中心**。

系统针对桌面端（密集信息大表、沉浸式阅读）与移动端（流式卡片、抽屉式交互）进行了深度的双端响应式适配。


## 🚀 核心特性

- 🌐 **全站响应式设计 (Responsive UI)**：基于 Tailwind CSS 断点控制。大屏端采用多栏、固定章节树、密集数据大表；移动端自动缩拢为单栏、动态卡片化列表（表格自动转卡片）、全屏内嵌 `100vh` 应用以及隐藏式底部抽屉（Drawer）目录。
- ✍️ **GitOps 驱动的内容管理**：全站内容数据存储在 `config/*.yaml` + `config/blog/`，编辑 YAML 即可管理博客、教程、竞赛等所有内容。
- 🏆 **免登录自主比赛评测 (Low-barrier Kaggle-like Arena)**：用户无需注册登录，依靠浏览器硬件指纹 (`Canvas Fingerprint`) 与加密 Cookie 追踪身份。支持拖拽/调用系统文件上传 CSV 提交，后端基于 Redis 令牌桶实施防刷限流。
- ⚡ **高性能异步评测引擎**：FastAPI 接收到提交文件后秒级返回 `202 Accepted`，通过后台异步进程（`BackgroundTasks`）利用 Pandas/Polars 与 Scikit-learn 快速计算指标（AUC/F1/MSE），秒级刷新排行榜。
- 📊 **Redis 高性能排行榜缓存**：利用 Redis 的 `Sorted Set (ZSET)` 结构缓存比赛榜单，前端高频刷新时直接读取内存，完全不穿透至关系型数据库。
- 📦 **数据科学 App 托管中心 (App Launcher)**：提供一站式平台托管 Streamlit 数据大屏、Gradio 模型交互界面或 AI 智能体，支持后端自动化健康检查（自动化 Ping）与双端适配标识。

## 🏗️ 系统架构

```text
[ 前端客户端 (Desktop & Mobile) ]
       │ (Responsive UI / Hybrid State)
       ▼
[ Nginx 反向代理 / 负载均衡 ]
       │
       ├── (静态路由 & SSR 页面) ──────> [ Next.js (React / Tailwind) ]
       └── (API 请求 /api/*) ─────────> [ FastAPI (Python / Uvicorn) ]
                                             │
                                             ▼
                                      [ 服务层 (Services) ]
                                         /          \
                                        /            \
                  [ 内容源 YAML ] <┘              └─> [ 异步评测 Worker ]
                  (config/*.yaml)                    (提交评估/排行榜)

```

## 📂 项目目录结构

```text
coggle/
├── frontend/                          # 前端项目 (Next.js) — 待初始化
│   ├── src/
│   │   ├── components/                # 响应式 UI 组件
│   │   ├── app/                       # App Router 页面路由
│   │   ├── styles/                    # 全局样式
│   │   └── lib/                       # 工具函数
│   ├── content/                       # Markdown 源文件
│   └── package.json
│
├── backend/                           # 后端项目 (FastAPI)
│   └── app/
│       ├── main.py                    # FastAPI 应用入口（CORS + 路由注册）
│       ├── core/
│       │   ├── __init__.py
│       │   └── config.py              # YAML 加载工具
│       ├── schemas/                   # Pydantic v2 数据模型（5 模块, 36 模型）
│       │   ├── common.py              # 通用：健康检查、分页、标签
│       │   ├── content.py             # 内容：博客、教程、竞赛、搜索、通用页面
│       │   ├── resource.py            # 资源：链接、统计
│       │   ├── arena.py               # 竞技场：提交、排行榜、评估
│       │   ├── app_launcher.py        # 应用托管：应用信息、健康状态
│       │   └── __init__.py            # 统一导出
│       ├── services/                  # 服务层（8 模块）
│       │   ├── blog.py                # 博客 + 标签 + 相关推荐
│       │   ├── tutorial.py            # 教程 + 系列导航 + 相关推荐
│       │   ├── competition.py         # 竞赛 + 相关推荐
│       │   ├── resource.py            # 链接 + 统计
│       │   ├── app.py                 # 应用托管
│       │   ├── page.py                # 通用页面
│       │   ├── search.py              # 跨内容搜索
│       │   └── homepage.py            # 首页聚合
│       ├── api/                       # API 路由（10 模块）
│       │   ├── health.py              # GET /api/health
│       │   ├── blog.py                # GET /api/blog[/tags|/{slug}]
│       │   ├── tutorial.py            # GET /api/tutorials[/{slug}]
│       │   ├── competition.py         # GET /api/competitions[/{slug}]
│       │   ├── link.py                # GET /api/links
│       │   ├── stats.py               # GET /api/stats
│       │   ├── app.py                 # GET /api/apps
│       │   ├── page.py                # GET /api/pages/{slug}
│       │   ├── search.py              # GET /api/search?q=
│       │   └── homepage.py            # GET /api/homepage
│       └── tests/                     # pytest 测试（16 文件，81 用例）
│           ├── conftest.py            # 共享 fixtures
│           ├── test_blog.py
│           ├── test_tutorials.py
│           ├── test_competitions.py
│           ├── test_links.py
│           ├── test_stats.py
│           ├── test_apps.py
│           ├── test_pages.py
│           ├── test_api_health.py
│           ├── test_api_blog.py
│           ├── test_api_tutorial.py
│           ├── test_api_competition.py
│           ├── test_api_links.py
│           ├── test_api_stats.py
│           ├── test_api_homepage.py
│           ├── test_api_pages.py
│           ├── test_api_search.py
│           └── test_api_apps.py
│
├── config/                            # 内容数据源（YAML），编辑此处管理全站内容
│   ├── blog.yaml                      # 博客元数据（slug, title, date, author, tags...）
│   ├── blog/                          # 博客内容文件（每篇 {slug}.yaml）
│   │   ├── llm-finetuning-guide.yaml
│   │   ├── feature-engineering-tips.yaml
│   │   ├── xgboost-vs-lightgbm.yaml
│   │   ├── time-series-forecasting.yaml
│   │   └── cross-validation-strategies.yaml
│   ├── tutorials.yaml
│   ├── competitions.yaml
│   ├── links.yaml
│   ├── stats.yaml
│   ├── apps.yaml
│   └── pages.yaml
│
├── docs/                              # 项目文档
│   ├── requirements.md                # 功能需求
│   ├── specification.md               # 技术规范
│   ├── content-guide.md               # 内容编辑指南
│   └── gap-analysis.md                # 功能审核补全
│
├── conftest.py                        # 根级别 pytest 配置
└── CLAUDE.md                          # Claude Code 项目指南
```

## 🛠️ 快速开始

### 前置要求

- Python >= 3.12
- Node.js >= 20（前端开发时）

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

# 生产构建（SSG + ISR，构建时会请求后端 API 预渲染页面）
npm run build
npm run start

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

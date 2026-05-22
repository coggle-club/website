# Coggle 数据科学社区 — 文档审核与补全

本文档记录了针对 `README.md`、`docs/requirements.md`、`docs/specification.md`、`docs/content-guide.md` 的功能完整性审核结果，并对缺失内容进行补充。

---

## 一、审核结果总览

| 文档 | 核心完备项 | 缺失/不足项 |
|------|-----------|------------|
| README.md | 项目定位、核心特性、架构拓扑 | ~~缺少开发环境搭建指南、快速启动步骤~~ |
| requirements.md | 7大功能模块需求、非功能需求 | ~~缺少信息架构、边界状态、搜索设计、用户流程、可访问性、内容集合~~ |
| specification.md | 目录结构、路由、代码规范、组件树、SEO | ~~缺少CI/CD、环境配置、测试策略、部署方案、安全策略、搜索方案、数据格式定义~~ |
| content-guide.md | 目录组织、模板、CDN图片 | ~~缺少链接/工具数据格式、标签分类体系、内容工作流、内容集合~~ |

> 以上所有缺失项已在 2026-05-22 更新中补全。

---

## 二、最新补全项 (2026-05-22)

### 2.1 竞赛状态自动计算

竞赛的 `status` 不再存储在 YAML 中。后端 `services/competition.py` 新增 `_compute_status()` 函数，根据 `end_date` 自动计算。

逻辑：
- `end_date` 存在且 `< 今日` → `"ended"`
- 否则 → `"ongoing"`

涉及文件：
- `config/competitions.yaml` — 移除 `status` 字段
- `coggle/backend/app/schemas/content.py` — `CompetitionSummary.status` 默认值改为 `"ongoing"`
- `coggle/backend/app/services/competition.py` — 新增 `_compute_status()`, `_parse_date()`, `_enrich()`
- `coggle/backend/app/services/homepage.py` — 竞赛部分使用 `_compute_status()`

### 2.2 前端应用页面

新增 `/apps` 页面展示 Coggle 社区应用生态。

涉及文件：
- `coggle/frontend/src/app/apps/page.tsx`
- `coggle/frontend/src/app/apps/loading.tsx`
- `coggle/frontend/src/components/apps/AppCard.tsx`
- `coggle/frontend/src/types/content.ts` — 新增 `AppInfo`, `AppListResponse`

### 2.3 导航结构与菜单更新

- 导航栏顺序：首页 → 竞赛 → 博客 → 教程 → 模型 → 应用 → [其他 ▼]
- 页脚顺序同步更新
- 修复下拉菜单 hover 间隙问题（移除 `mt-1`）
- 页脚标签统一：`模型库` → `模型`，`工具` → `在线工具`

### 2.4 文档更新

所有文档已同步更新，反映最新的代码结构。

---

## 三、导航结构

### 3.1 导航层级

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

页脚 (Footer)
├── 内容：竞赛 → 博客 → 教程 → 模型
├── 资源：常见链接 → 在线工具 → 应用
└── 关于：关于 Coggle → 隐私政策
```

---

## 四、前端页面清单

| 路由 | 文件 | 渲染方式 |
|------|------|----------|
| `/` | `page.tsx` | dynamic |
| `/blog` | `blog/page.tsx` | dynamic |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | ISR |
| `/tutorials` | `tutorials/page.tsx` | dynamic |
| `/tutorials/[slug]` | `tutorials/[slug]/page.tsx` | ISR |
| `/competitions` | `competitions/page.tsx` | dynamic |
| `/competitions/[slug]` | `competitions/[slug]/page.tsx` | ISR |
| `/models` | `models/page.tsx` | ISR |
| `/models/[slug]` | `models/[slug]/page.tsx` | ISR |
| `/models/graph` | `models/graph/page.tsx` | static |
| `/links` | `links/page.tsx` | ISR |
| `/tools` | `tools/page.tsx` | static |
| `/tools/[tool]` | `tools/[tool]/page.tsx` | static |
| `/apps` | `apps/page.tsx` | dynamic |
| `/search` | `search/page.tsx` | dynamic |
| `/about` | `about/page.tsx` | ISR |
| `/privacy` | `privacy/page.tsx` | ISR |
| 404 | `not-found.tsx` | static |
| error | `error.tsx` | static |

---

## 五、API 端点清单

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/homepage` | 首页聚合 |
| GET | `/api/blog` | 博客列表（分页 + 筛选） |
| GET | `/api/blog/tags` | 博客标签聚合 |
| GET | `/api/blog/{slug}` | 博客详情 |
| GET | `/api/tutorials` | 教程列表（分页 + 筛选） |
| GET | `/api/tutorials/{slug}` | 教程详情 |
| GET | `/api/competitions` | 竞赛列表（分页 + 筛选） |
| GET | `/api/competitions/{slug}` | 竞赛详情 |
| GET | `/api/models` | 模型列表 |
| GET | `/api/models/{slug}` | 模型详情 |
| GET | `/api/links` | 链接列表 |
| GET | `/api/apps` | 应用列表 |
| GET | `/api/pages/{slug}` | 通用页面 |
| GET | `/api/search?q=` | 跨内容搜索 |
| POST | `/api/log` | 前端日志上报 |

---

## 六、后端测试覆盖

| 文件 | 测试数 | 说明 |
|------|--------|------|
| `test_api_health.py` | 2 | 健康检查 |
| `test_api_blog.py` | 11 | 博客 API |
| `test_api_tutorial.py` | 11 | 教程 API |
| `test_api_competition.py` | 10 | 竞赛 API |
| `test_api_models.py` | 10 | 模型 API |
| `test_api_links.py` | 3 | 链接 API |
| `test_api_homepage.py` | 3 | 首页 API |
| `test_api_pages.py` | 3 | 页面 API |
| `test_api_search.py` | 9 | 搜索 API |
| `test_api_apps.py` | 3 | 应用 API |
| `test_api_log.py` | 6 | 日志 API |
| `test_blog.py` | 7 | 博客数据验证 |
| `test_tutorials.py` | 5 | 教程数据验证 |
| `test_competitions.py` | 7 | 竞赛数据验证 |
| `test_models.py` | 6 | 模型数据验证 |
| `test_links.py` | 4 | 链接数据验证 |
| `test_apps.py` | 4 | 应用数据验证 |
| `test_pages.py` | 6 | 页面数据验证 |
| **合计** | **116** | |

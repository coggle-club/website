# Coggle 数据科学社区 — 文档审核与补全

本文档记录了针对 `README.md`、`docs/requirements.md`、`docs/specification.md`、`docs/content-guide.md` 的功能完整性审核结果，并对缺失内容进行补充。

---

## 一、审核结果总览

| 文档 | 核心完备项 | 缺失/不足项 |
|------|-----------|------------|
| README.md | 项目定位、核心特性、架构拓扑 | 缺少开发环境搭建指南、快速启动步骤 |
| requirements.md | 7大功能模块需求、非功能需求 | 缺少信息架构、边界状态、搜索设计、用户流程、可访问性、内容集合 |
| specification.md | 目录结构、路由、代码规范、组件树、SEO | 缺少CI/CD、环境配置、测试策略、部署方案、安全策略、搜索方案、数据格式定义 |
| content-guide.md | 目录组织、模板、CDN图片 | 缺少链接/工具数据格式、标签分类体系、内容工作流、内容集合 |

---

## 二、功能缺失补全

### 2.1 信息架构与导航设计

#### 2.1.1 导航层级

```
一级导航 (Navbar)
├── 主页 (/)
├── 博客 (/blog)
├── 教程 (/tutorials)
├── 竞赛 (/competitions)
├── 模型 (/models)
├── 工具 (/tools)
└── 关于 (/about)

二级导航 (Footer Sitemap)
├── 内容分类
│   ├── 全部博客
│   ├── 精选教程
│   └── 竞赛复盘
├── 社区
│   ├── 关于我们
│   ├── 加入我们
│   └── 联系我们
├── 资源
│   ├── 友情链接
│   ├── 数据科学工具
│   └── RSS 订阅
└── 法律
    ├── 隐私政策
    └── 使用条款
```

#### 2.1.2 面包屑导航

所有详情页需包含面包屑导航：

```
博客详情: 首页 > 博客 > 文章标题
教程详情: 首页 > 教程 > 教程标题
竞赛详情: 首页 > 竞赛 > 竞赛名称
```

---

### 2.2 边界状态页面

#### 2.2.1 404 页面

- 路由：`/not-found` 或 `app/not-found.tsx`
- 内容：友好的提示文案 + 搜索引导 + 返回首页按钮 + 热门文章推荐
- 状态码：404

#### 2.2.2 500 错误页面

- 路由：`app/error.tsx`
- 内容：抱歉文案 + 刷新按钮 + 联系反馈

#### 2.2.3 空状态

- 标签过滤无结果：显示"该标签下暂无内容" + 返回全部列表链接
- 搜索无结果：显示"未找到相关内容" + 换关键词提示
- 竞赛列表空：显示"暂无竞赛信息"

---

### 2.3 搜索功能设计

#### 2.3.1 需求

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 客户端搜索 | 基于标题+描述+标签的即时搜索 | P1 |
| 跨类型搜索 | 同时搜索博客、教程、竞赛 | P1 |
| 搜索高亮 | 搜索结果中高亮匹配关键词 | P2 |
| 搜索历史 | 本地存储最近搜索记录 | P2 |

#### 2.3.2 技术方案

- **前端方案**（一期）：使用 Fuse.js 实现客户端全文搜索
  - 构建时预索引所有内容元数据（title、description、tags、content摘要）
  - 搜索时在浏览器端执行模糊匹配
  - 无需后端支持，适合 SSG 站点
- **后端方案**（二期）：接入 Elasticsearch 或 Meilisearch

#### 2.3.3 搜索组件

- `SearchBar` — 导航栏搜索框，输入触发下拉结果面板
- `SearchResults` — 搜索结果页 `/search?q=keyword`

---

### 2.4 关于与联系页面

#### 2.4.1 关于页 (`/about`)

| 内容模块 | 说明 |
|---------|------|
| 社区介绍 | Coggle 成立背景、使命 |
| 核心成员 | 团队介绍（可选） |
| 里程碑 | 社区发展时间线 |
| 数据概览 | 文章数、竞赛数、成员数 |
| 联系方式 | 微信公众号、知乎、GitHub、邮箱 |

#### 2.4.2 内容来源

Markdown 文件 `content/pages/about.md`

```yaml
---
title: 关于 Coggle
date: 2026-01-01
---
```

---

### 2.5 内容集合与系列

#### 2.5.1 需求

允许将不同文章/教程组织为系列：

- **教程系列**：如"PyTorch 系列教程（第1-5篇）"，通过 frontmatter 的 `series` 和 `order` 字段关联
- **专题合集**：如"Kaggle 金牌方案合集"，手动精选
- **推荐阅读**：文章详情页底部展示相关文章（基于相同标签）

#### 2.5.2 系列导航

教程详情页需展示：
- 系列章节列表（带进度指示）
- 上一篇/下一篇导航

---

### 2.6 标签分类体系

#### 2.6.1 一级分类标签

```
技术方向: Python / R / SQL / PyTorch / TensorFlow / Scikit-learn / XGBoost
竞赛平台: Kaggle / 天池 / Kesci / DataFountain
应用领域: NLP / CV / 推荐系统 / 强化学习 / 时序预测 / 多模态
难度等级: beginner / intermediate / advanced
内容类型: 入门 / 实战 / 理论 / 工具 / 论文解读
```

#### 2.6.2 标签管理规范

- 标签统一小写英文（避免中英文混用）
- 新增标签需确认不重复
- 标签数量控制在 30 个以内，避免碎片化

---

### 2.7 数据格式补充

#### 2.7.1 链接数据格式

`content/links/index.md`:

```markdown
---
title: 常用连接
date: 2026-05-21
---

## 数据科学社区

- [Kaggle](https://kaggle.com) - 全球最大数据科学竞赛平台
- [天池](https://tianchi.aliyun.com) - 阿里云数据科学竞赛平台
- [DataFountain](https://datafountain.cn) - 中国数据科学竞赛平台

## 学习资源

- [Scikit-learn 文档](https://scikit-learn.org) - 经典 ML 库官方文档
- [PyTorch 教程](https://pytorch.org/tutorials) - PyTorch 官方教程

## 工具平台

- [Hugging Face](https://huggingface.co) - AI 模型与数据集托管
- [Papers With Code](https://paperswithcode.com) - 论文+代码+ benchmark
```

或采用 YAML 数据文件方式（便于维护）：

`content/links/data.yaml`:

```yaml
- category: 数据科学社区
  items:
    - name: Kaggle
      url: https://kaggle.com
      description: 全球最大数据科学竞赛平台
    - name: 天池
      url: https://tianchi.aliyun.com
      description: 阿里云数据科学竞赛平台

- category: 学习资源
  items:
    - name: Scikit-learn 文档
      url: https://scikit-learn.org
      description: 经典 ML 库官方文档
```

#### 2.7.2 工具数据格式

`content/tools/data.yaml`:

```yaml
- category: 可视化工具
  items:
    - name: Matplotlib
      url: https://matplotlib.org
      description: Python 基础绘图库
      icon: chart-line
    - name: Plotly
      url: https://plotly.com
      description: 交互式数据可视化
      icon: chart-bar

- category: AutoML
  items:
    - name: AutoGluon
      url: https://auto.gluon.ai
      description: 自动机器学习框架
      icon: robot
```

#### 2.7.3 模型数据来源

`config/models.yaml` + `config/models/{slug}.md`:

```yaml
- slug: deepseek-r1
  name: DeepSeek-R1
  description: DeepSeek 推出的推理模型
  category: 大语言模型
  publisher: DeepSeek
  date: '2025-01-20'
  tags:
  - LLM
  - 推理
  - MoE
  paper_url: ...
  github_url: ...
  official_url: ...
```

模型正文存储在 `config/models/{slug}.md` 中，元数据在 `config/models.yaml`。

---

### 2.8 内容工作流

#### 2.8.1 内容生命周期

```
创作 (本地编辑 Markdown)
  → 提交 PR (GitHub)
  → 审核 (Review)
  → 合并 (Merge to main)
  → 自动构建 & 部署 (CI/CD)
  → 发布上线
```

#### 2.8.2 draft 机制

- `draft: true` 的文章在开发/预览环境可见，生产环境隐藏
- 准备发布时改为 `draft: false`

#### 2.8.3 内容更新

- 直接编辑已有 `index.md` 文件
- 修改 frontmatter 的 `date` 字段记录更新日期（可选增加 `updated` 字段）

```yaml
---
title: 文章标题
date: 2026-05-01
updated: 2026-05-21   # 可选，内容最后更新日期
---
```

---

### 2.9 环境配置与 CI/CD

#### 2.9.1 环境变量

| 变量 | 说明 | 必需 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 站点 URL | 是 |
| `NEXT_PUBLIC_CDN_BASE` | CDN 基础 URL | 是 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | 否 |

#### 2.9.2 CI/CD 流程

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
      - npm run test (if applicable)
  deploy:
    steps:
      - deploy to Vercel /自有服务器
```

#### 2.9.3 部署目标

| 环境 | 域名 | 分支 | 部署方式 |
|------|------|------|---------|
| 生产 | `coggle.com` | main | Vercel / 自有服务器 |
| 预览 | PR 专属 URL | feat/* | Vercel Preview |

---

### 2.10 测试策略

| 测试类型 | 覆盖范围 | 工具 |
|---------|---------|------|
| 组件测试 | 公共组件渲染、交互 | Vitest + React Testing Library |
| 页面测试 | 页面渲染、内容正确加载 | Vitest |
| E2E 测试 | 核心用户流程 | Playwright |
| Lighthouse | 性能/SEO/可访问性 | Lighthouse CI |

测试优先级：
- P0：组件渲染测试（BlogCard、MarkdownRenderer、Navbar）
- P1：页面加载测试（各路由正常渲染 200）
- P2：E2E 流程测试（导航跳转、搜索、标签筛选）

---

### 2.11 安全策略

#### 2.11.1 安全 Headers（next.config.ts）

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

#### 2.11.2 外部链接处理

- 外部链接统一添加 `target="_blank" rel="noopener noreferrer"`
- 用户生成内容（UGC）需做 XSS 过滤（二期）

---

### 2.12 可访问性

| 要求 | 说明 | 优先级 |
|------|------|--------|
| 语义化 HTML | `<nav>`, `<main>`, `<article>`, `<aside>` 等 | P0 |
| 图片 alt 文本 | 所有 `<img>` 必须有 alt 属性 | P0 |
| 键盘导航 | Tab 顺序合理，焦点可见 | P1 |
| 对比度 | 文本/背景对比度 ≥ 4.5:1 | P1 |
| 字体缩放 | 支持浏览器 200% 字体缩放不溢出 | P2 |

---

### 2.13 README.md 补充：开发者快速上手

建议在 README.md 添加以下章节：

```markdown
## 🛠️ 快速开始

### 前置要求

- Node.js >= 20
- npm >= 9

### 安装

```bash
# 进入前端项目目录
cd coggle/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器将在 http://localhost:3000 启动。

### 项目脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 代码检查 |
| `npm run test` | 运行测试 |
```

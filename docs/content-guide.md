# Coggle 数据科学社区 — 内容结构指南

本文档定义了内容文件的目录结构、命名规则和模板示例。

## 1. 内容目录结构

```
config/                              # 内容数据源
├── blog.yaml                        # 博客元数据（slug, title, date, author, tags...）
├── blog/                            # 博客正文
│   └── {slug}.md                    # 每篇博客一个 .md 文件
│
├── tutorials.yaml                   # 教程元数据
├── tutorials/                       # 教程正文
│   └── {slug}.md
│
├── competitions.yaml                # 竞赛元数据（status 由后端自动计算）
├── competitions/                    # 竞赛正文
│   └── {slug}.md
│
├── models.yaml                      # 模型元数据
├── models/                          # 模型介绍
│   └── {slug}.md
│
├── links.yaml                       # 链接数据（纯 YAML）
├── apps.yaml                        # 应用数据（纯 YAML）
└── pages.yaml                       # 通用页面数据（纯 YAML）
```

### 关键说明

- **元数据与正文分离**：`config/{type}.yaml` 存元数据，`config/{type}/{slug}.md` 存正文
- 支持双层结构的内容类型：blog、tutorials、competitions、models
- 元数据仍在 YAML 中的内容类型：links、apps、pages
- 竞赛的 `status` 不再写在 YAML 中，由后端根据 `end_date` 自动计算

## 2. 命名规范

- **slug**：kebab-case，全小写，单词间用连字符
- **文件名**：`{slug}.md`
- **YAML 键名**：小写 snake_case

## 3. 模板

### 3.1 博客文章

`config/blog.yaml`:

```yaml
- slug: article-slug
  title: 文章标题
  date: '2026-05-20'
  author: Coggle 团队
  tags:
    - Kaggle
    - 入门
  description: 文章摘要
  cover: https://cdn.coggle.com/images/blog/xxx/cover.png
  draft: false
```

正文文件 `config/blog/article-slug.md`:

```markdown
## 引言

[内容正文]

## 章节一

...

## 总结

...
```

### 3.2 教程

`config/tutorials.yaml`:

```yaml
- slug: pytorch-basics-1
  title: PyTorch 深度学习入门教程
  date: '2026-05-15'
  author: Coggle 团队
  difficulty: beginner
  tags:
    - PyTorch
    - 深度学习
  description: 教程简介
  cover: https://cdn.coggle.com/images/tutorials/xxx/cover.png
  series: PyTorch 系列教程     # 可选
  order: 1                     # 可选
```

### 3.3 竞赛

`config/competitions.yaml`:

```yaml
- slug: competition-slug
  title: 竞赛名称
  platform: Kaggle
  url: https://kaggle.com/competitions/xxx
  date: '2026-04-01'
  end_date: '2026-07-01'        # 必填（用于自动计算状态）
  tags:
    - LLM
    - NLP
  description: 竞赛简介
  award: 银牌                    # 可选
  team: Coggle_Team             # 可选
  draft: false
```

注意：`status` 字段不再需要，后端会根据 `end_date` 自动判断 `ongoing` / `ended`。

### 3.4 模型

`config/models.yaml`:

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
  paper_url: https://...
  github_url: https://...
  official_url: https://...
  relations:
    - target: deepseek-v2
      type: evolution
```

正文文件 `config/models/deepseek-r1.md`:

```markdown
## 模型简介

...
```

### 3.5 应用

`config/apps.yaml`:

```yaml
- slug: coggle-dashboard
  name: Coggle 数据看板
  frontend_url: https://coggle.com/dashboard
  backend_url: https://api.coggle.com
  description: 社区数据实时可视化大屏
  tags:
    - 可视化
    - 实时数据
```

### 3.6 链接

`config/links.yaml`:

```yaml
- category: 数据科学社区
  items:
    - name: Kaggle
      url: https://kaggle.com
      description: 全球最大数据科学竞赛平台
```

## 4. 图片管理（CDN）

所有图片通过 CDN 上传和管理，不存储在项目仓库中。

### 4.1 CDN 地址格式

```
https://cdn.coggle.com/images/{类型}/{slug}/{文件名}
```

- `{类型}`：`blog` / `tutorials` / `competitions` / `general`
- `{slug}`：对应内容的 slug
- `{文件名}`：自定义文件名

### 4.2 封面图规范

- 封面图统一放在 CDN 路径下
- 在 YAML 的 `cover` 字段填写完整 CDN URL
- 建议尺寸：1200×630px（OG 标准）
- 格式：WebP 优先，PNG 备选

### 4.3 正文中引用

```markdown
![数据分布图](https://cdn.coggle.com/images/blog/article-slug/data-dist.png)
```

### 4.4 图片优化建议

- 格式优先级：WebP > PNG > JPG
- 单图不超过 500KB
- 封面图控制在 200KB 以内

## 5. 标签分类体系

### 5.1 标签分类

```
技术方向: Python / R / SQL / PyTorch / TensorFlow / Scikit-learn
竞赛平台: Kaggle / 天池 / Kesci / DataFountain
应用领域: NLP / CV / 推荐系统 / 强化学习 / 时序预测
难度等级: beginner / intermediate / advanced
内容类型: 入门 / 实战 / 理论 / 工具 / 论文解读
应用标签: 可视化 / AI / 数据分析 / 内容创作
```

### 5.2 标签管理规范

- 标签统一使用小写英文或中文（与现有数据一致）
- 新增标签前确认不重复
- 标签总数建议控制在 30 个以内

## 6. 内容工作流

### 6.1 生命周期

```
创作（编辑 YAML + Markdown）
  → 提交 PR（GitHub）
  → 审核（Review）
  → 合并（Merge to main）
  → 自动构建部署
  → 发布上线
```

### 6.2 draft 机制

- `draft: true`：文章存在但前端不展示（仅用于博客、教程、竞赛、模型）
- 准备发布时改为 `draft: false` 或直接删除 `draft` 字段

### 6.3 内容更新

- 直接编辑 `config/{type}/{slug}.md` 或 `config/{type}.yaml`
- 可额外添加 `updated` 字段记录更新日期

## 7. 内容维护检查清单

- [ ] YAML 字段完整（title, date, tags, description 等）
- [ ] 没有敏感信息
- [ ] 竞赛无需填写 `status`
- [ ] 代码块标注了语言类型
- [ ] 封面图和正文图片使用 CDN URL
- [ ] draft 状态正确（未完成时设为 true）

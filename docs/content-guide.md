# Coggle 数据科学社区 — 内容结构指南

本文档定义了 Markdown 内容文件的目录结构、命名规则和模板示例。

## 1. 内容目录结构

```
content/
├── blog/                          # 博客文章
│   ├── kaggle-titanic-guide/      # 每篇文章一个目录
│   │   └── index.md               # 文章正文（图片通过 CDN 引用）
│   ├── llm-finetuning-tips/
│   │   └── index.md
│   └── ...
│
├── tutorials/                     # 教程
│   ├── pytorch-basics/            # 每个教程一个目录
│   │   └── index.md
│   ├── ml-interpretability/
│   │   └── index.md
│   └── ...
│
└── competitions/                  # 竞赛
    ├── kaggle-llm-science/        # 每个竞赛一个目录
    │   └── index.md
    ├── tianke-xxx/
    │   └── index.md
    └── ...
```

## 2. 命名规范

- **目录名**：kebab-case，全小写，单词间用连字符
- **主文件**：统一使用 `index.md`

## 3. 模板

### 3.1 博客文章模板

`content/blog/article-slug/index.md`:

```markdown
---
title: 从零开始学习 Kaggle：Titanic 生存预测
date: 2026-05-20
author: Coggle 团队
tags:
  - Kaggle
  - 入门
  - Titanic
description: 本文带你从零开始完成 Kaggle 入门竞赛 Titanic 生存预测，涵盖数据分析、特征工程和模型训练全流程。
cover: https://cdn.coggle.com/images/blog/titanic-guide/cover.png
draft: false
---

## 引言

[Titanic: Machine Learning from Disaster](https://kaggle.com/c/titanic) 是 Kaggle 上最经典的入门竞赛...

## 数据探索

首先加载数据并进行探索性分析...

<!-- more -->

## 特征工程

...

## 模型训练

...

## 总结

...
```

### 3.2 教程模板

`content/tutorials/tutorial-slug/index.md`:

```markdown
---
title: PyTorch 深度学习入门教程
date: 2026-05-15
author: Coggle 团队
difficulty: beginner
tags:
  - PyTorch
  - 深度学习
  - 入门教程
description: 一个全面的 PyTorch 入门教程，从张量操作到完整的图像分类模型训练。
cover: https://cdn.coggle.com/images/tutorials/pytorch-basics/cover.png
series: PyTorch 系列教程
order: 1
---

## 概述

本教程将带你从零开始学习 PyTorch...

## 环境配置

```bash
pip install torch torchvision
```

## 张量基础

PyTorch 中的张量类似 NumPy 数组...

## 自动求导

...

## 构建模型

...

## 练习

1. 尝试修改网络结构...
2. 尝试不同的优化器...
```

### 3.3 竞赛模板

`content/competitions/competition-slug/index.md`:

```markdown
---
title: LLM Science Exam
platform: Kaggle
url: https://kaggle.com/competitions/llm-science-exam
date: 2026-04-01
end_date: 2026-07-01
status: ongoing
tags:
  - LLM
  - NLP
  - 问答
description: 使用 LLM 回答科学考试题目的竞赛，测试大语言模型的科学知识推理能力。
award: 银牌
team: Coggle_Team
---

## 竞赛简介

...

## 赛程

- 开始时间：2026-04-01
- 截止时间：2026-07-01

## 评估指标

...

## 我们的方案

...

## 关键代码

\`\`\`python
# 核心实现
\`\`\`
```

## 4. 图片管理（CDN）

所有图片通过 CDN 上传和管理，不存储在项目仓库中。

### 4.1 CDN 地址格式

```
https://cdn.coggle.com/images/{类型}/{文章slug}/{文件名}
```

- `{类型}`：`blog` / `tutorials` / `competitions` / `general`
- `{文章slug}`：对应内容目录名
- `{文件名}`：自定义文件名，建议带语义

### 4.2 封面图规范

- 封面图统一放在 CDN 路径下
- 在 frontmatter 的 `cover` 字段填写完整 CDN URL
- 建议尺寸：1200×630px（OG 标准）
- 格式：WebP 优先，PNG 备选

### 4.3 Markdown 正文中引用

图片通过完整 CDN URL 引用：

```markdown
![数据分布图](https://cdn.coggle.com/images/blog/titanic-guide/data-dist.png)

![模型结构](https://cdn.coggle.com/images/general/transformer-arch.png)
```

### 4.4 CDN 上传流程

1. 将图片上传至 CDN 管理后台（或通过 CLI 工具）
2. 在 Markdown 中使用对应的 CDN URL
3. 注意保持文件名语义化，便于后期维护

### 4.5 图片优化建议

- 格式优先级：WebP > PNG > JPG
- 单图不超过 500KB
- 封面图控制在 200KB 以内
- 截图类使用 PNG，照片类使用 WebP

## 5. 链接与工具数据格式

### 5.1 链接数据

`config/links.yaml`：

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
    - name: PyTorch 教程
      url: https://pytorch.org/tutorials
      description: PyTorch 官方教程
```

## 6. 标签分类体系

### 6.1 标签分类

```
技术方向: Python / R / SQL / PyTorch / TensorFlow / Scikit-learn
竞赛平台: Kaggle / 天池 / Kesci / DataFountain
应用领域: NLP / CV / 推荐系统 / 强化学习 / 时序预测
难度等级: beginner / intermediate / advanced
内容类型: 入门 / 实战 / 理论 / 工具 / 论文解读
```

### 6.2 标签管理规范

- 标签统一使用小写英文，避免中英文混用
- 新增标签前确认不重复
- 标签总数控制在 30 个以内

## 7. 内容工作流

### 7.1 生命周期

```
创作（Markdown 编辑）
  → 提交 PR（GitHub）
  → 审核（Review）
  → 合并（Merge to main）
  → 自动构建部署
  → 发布上线
```

### 7.2 draft 机制

- `draft: true`：开发/预览环境可见，生产环境隐藏
- `draft: false`：正式发布

### 7.3 内容更新

- 直接编辑已有 `index.md`
- 修改 `date` 字段记录更新日期，可额外添加 `updated` 字段：

```yaml
---
title: 文章标题
date: 2026-05-01
updated: 2026-05-21   # 可选，最后更新日期
---
```

## 8. 内容维护检查清单

- [ ] frontmatter 字段完整（title, date, author, tags, description, cover）
- [ ] 没有敏感信息
- [ ] 代码块标注了语言类型
- [ ] 封面图和正文图片使用 CDN URL
- [ ] 文章末尾有总结或下一步建议
- [ ] draft 状态正确（未完成时设为 true）

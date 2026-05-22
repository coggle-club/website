from __future__ import annotations

import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, HttpUrl

from .common import PaginatedResponse, PaginationParams


# ─── 博客 ───────────────────────────────────────────────────────


class BlogPostSummary(BaseModel):
    """博客文章列表摘要。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="URL 标识")
    title: str = Field(..., description="文章标题")
    date: datetime.date = Field(..., description="发布日期")
    author: str = Field(..., description="作者名")
    tags: list[str] = Field(default_factory=list, description="标签列表")
    description: str = Field(..., description="文章摘要 / SEO 描述")
    cover: Optional[HttpUrl] = Field(None, description="CDN 封面图 URL")


class BlogPostDetail(BlogPostSummary):
    """博客文章详情（含渲染内容）。"""

    content: str = Field(..., description="Markdown 原文内容")
    content_html: Optional[str] = Field(None, description="HTML 渲染内容（服务端生成）")
    draft: bool = Field(False, description="草稿标记")
    updated: Optional[datetime.date] = Field(None, description="最后更新日期")
    related: list[BlogPostSummary] = Field(
        default_factory=list, description="相关文章推荐（同标签，前 4 篇）"
    )


class BlogListQuery(PaginationParams):
    """博客列表查询参数。"""

    tag: Optional[str] = Field(None, description="按标签筛选")
    author: Optional[str] = Field(None, description="按作者筛选")


# ─── 教程 ────────────────────────────────────────────────────


class SeriesInfo(BaseModel):
    """教程系列信息。"""

    model_config = ConfigDict(from_attributes=True)

    name: str = Field(..., description="系列名称")
    order: int = Field(..., ge=1, description="在系列中的顺序")
    total: Optional[int] = Field(None, ge=1, description="系列总篇数")


class TutorialSummary(BaseModel):
    """教程列表摘要。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="URL 标识")
    title: str = Field(..., description="教程标题")
    date: datetime.date = Field(..., description="发布日期")
    author: str = Field(..., description="作者名")
    difficulty: str = Field(
        ..., pattern=r"^(beginner|intermediate|advanced)$",
        description="难度级别：beginner / intermediate / advanced",
    )
    tags: list[str] = Field(default_factory=list, description="标签列表")
    description: str = Field(..., description="教程简介")
    cover: Optional[HttpUrl] = Field(None, description="CDN 封面图 URL")
    series: Optional[SeriesInfo] = Field(None, description="所属系列")


class TutorialDetail(TutorialSummary):
    """教程详情（含渲染内容和目录）。"""

    content: str = Field(..., description="Markdown 原文内容")
    content_html: Optional[str] = Field(None, description="HTML 渲染内容（服务端生成）")
    toc: list[dict] = Field(
        default_factory=list,
        description="目录结构：[{id, text, level}]",
    )
    prev: Optional[dict] = Field(
        None, description="系列上一篇：{slug, title}"
    )
    next: Optional[dict] = Field(
        None, description="系列下一篇：{slug, title}"
    )
    draft: bool = Field(False, description="草稿标记")
    updated: Optional[datetime.date] = Field(None, description="最后更新日期")
    related: list[TutorialSummary] = Field(
        default_factory=list, description="相关教程推荐（同标签，前 4 篇）"
    )


class TutorialListQuery(PaginationParams):
    """教程列表查询参数。"""

    tag: Optional[str] = Field(None, description="按标签筛选")
    difficulty: Optional[str] = Field(
        None, pattern=r"^(beginner|intermediate|advanced)$",
        description="按难度筛选",
    )


# ─── 竞赛 ──────────────────────────────────────────────────────


class CompetitionSummary(BaseModel):
    """竞赛列表摘要。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="URL 标识")
    title: str = Field(..., description="竞赛名称")
    platform: str = Field(
        ..., description="竞赛平台（Kaggle / 天池 / Kesci）"
    )
    url: HttpUrl = Field(..., description="竞赛官方链接")
    date: datetime.date = Field(..., description="开始日期")
    end_date: Optional[datetime.date] = Field(None, description="结束日期")
    status: str = Field(
        "ongoing", description="竞赛状态：ongoing / ended（自动计算）"
    )
    tags: list[str] = Field(default_factory=list, description="标签列表")
    description: str = Field(..., description="竞赛简介")
    award: Optional[str] = Field(None, description="获奖情况")
    team: Optional[str] = Field(None, description="参赛队伍名")


class CompetitionDetail(CompetitionSummary):
    """竞赛详情（含渲染内容）。"""

    content: str = Field(..., description="Markdown 原文内容")
    content_html: Optional[str] = Field(None, description="HTML 渲染内容（服务端生成）")
    draft: bool = Field(False, description="草稿标记")
    updated: Optional[datetime.date] = Field(None, description="最后更新日期")
    related: list[CompetitionSummary] = Field(
        default_factory=list, description="相关竞赛推荐（同平台 / 同标签，前 4 个）"
    )


class CompetitionListQuery(PaginationParams):
    """竞赛列表查询参数。"""

    tag: Optional[str] = Field(None, description="按标签筛选")
    platform: Optional[str] = Field(None, description="按平台筛选（Kaggle / 天池）")
    status: Optional[str] = Field(
        None, pattern=r"^(ongoing|ended)$",
        description="按状态筛选：ongoing / ended",
    )


# ─── 搜索 ─────────────────────────────────────────────────────


class SearchIndex(BaseModel):
    """搜索索引条目，构建时预生成。"""

    type: str = Field(
        ..., pattern=r"^(blog|tutorial|competition|model)$",
        description="内容类型",
    )
    slug: str = Field(..., description="内容 URL 标识")
    title: str = Field(..., description="标题")
    description: str = Field(..., description="描述 / SEO 摘要")
    tags: list[str] = Field(default_factory=list, description="标签列表")
    date: str = Field(..., description="发布日期（ISO 格式）")
    excerpt: str = Field(..., description="内容前 200 字摘要")


class SearchResult(BaseModel):
    """单条搜索结果。"""

    type: str = Field(
        ..., pattern=r"^(blog|tutorial|competition|model)$",
        description="内容类型",
    )
    slug: str = Field(..., description="内容 URL 标识")
    title: str = Field(..., description="标题（含高亮标记）")
    description: str = Field(..., description="描述（含高亮标记）")
    tags: list[str] = Field(default_factory=list, description="标签列表")
    date: str = Field(..., description="发布日期")
    score: float = Field(..., ge=0, description="匹配分数，越高越相关")


class SearchResponse(PaginatedResponse):
    """搜索响应（带分页）。"""

    query: str = Field(..., description="搜索关键词")
    results: list[SearchResult] = Field(
        default_factory=list, description="搜索结果列表"
    )
    took_ms: int = Field(..., ge=0, description="搜索耗时（毫秒）")


class SearchQuery(BaseModel):
    """搜索查询参数。"""

    q: str = Field(..., min_length=1, max_length=100, description="搜索关键词")
    page: int = Field(1, ge=1, description="页码")
    page_size: int = Field(20, ge=1, le=50, description="每页条数")


# ─── 模型 ──────────────────────────────────────────────────────


class ModelRelation(BaseModel):
    """模型间关系。"""

    target: str = Field(..., description="目标模型 slug")
    type: str = Field(..., pattern=r"^(evolution|variant|inspired_by)$")
    label: Optional[str] = Field(None, description="关系描述标签")


class ModelSummary(BaseModel):
    """模型列表摘要。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="URL 标识")
    name: str = Field(..., description="模型名称")
    description: str = Field(..., description="模型简介")
    category: str = Field(..., description="模型类别（LLM / CV / NLP / 多模态 / 语音等）")
    publisher: str = Field(..., description="发布方")
    date: datetime.date = Field(..., description="发布日期")
    tags: list[str] = Field(default_factory=list, description="标签列表")
    relations: list[ModelRelation] = Field(
        default_factory=list, description="与其他模型的关系",
    )


class ModelDetail(ModelSummary):
    """模型详情（含论文链接、代码仓库和介绍内容）。"""

    content: str = Field(..., description="Markdown 介绍内容")
    paper_url: Optional[str] = Field(None, description="论文链接")
    github_url: Optional[str] = Field(None, description="代码仓库链接")
    official_url: Optional[str] = Field(None, description="官方链接")
    draft: bool = Field(False, description="草稿标记")


# ─── 首页 ─────────────────────────────────────────────────────


class HomepageResponse(BaseModel):
    """首页聚合数据响应。"""

    recent_posts: list[BlogPostSummary] = Field(
        default_factory=list, description="最新博客文章（前 6 篇）"
    )
    featured_tutorials: list[TutorialSummary] = Field(
        default_factory=list, description="精选教程（前 4 篇）"
    )
    recent_competitions: list[CompetitionSummary] = Field(
        default_factory=list, description="近期竞赛动态（前 4 个）"
    )


# ─── 通用页面（关于 / 隐私等）────────────────────────────────


class PageContent(BaseModel):
    """通用页面内容（关于、隐私政策、使用条款等）。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="页面标识")
    title: str = Field(..., description="页面标题")
    content: str = Field(..., description="Markdown 原文内容")
    content_html: Optional[str] = Field(None, description="HTML 渲染内容（服务端生成）")
    date: datetime.date = Field(..., description="发布日期")
    updated: Optional[datetime.date] = Field(None, description="最后更新日期")

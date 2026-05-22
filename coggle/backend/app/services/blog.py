"""博客服务：加载 YAML → Pydantic 模型，支持筛选与分页。"""

from math import ceil

from app.schemas import (
    BlogPostSummary,
    BlogPostDetail,
    PaginatedResponse,
    TagCount,
    TagListResponse,
)
from app.core.config import load_yaml, load_blog_content


def get_all_blogs() -> list[dict]:
    """加载博客元数据（来自 config/blog.yaml）。"""
    data = load_yaml("blog")
    assert isinstance(data, list), "blog.yaml must contain a list"
    return data


def _merge_detail(slug: str, meta: dict) -> dict | None:
    """合并元数据与内容文件，构造 BlogPostDetail 所需的完整 dict。"""
    content = load_blog_content(slug)
    if content is None:
        return None
    return {**meta, "content": content, "draft": meta.get("draft", False)}


def _get_related(slug: str, tags: list[str]) -> list[BlogPostSummary]:
    """基于同标签推荐相关文章（前 4 篇，按匹配标签数降序）。"""
    all_posts = get_all_blogs()
    candidates = []
    for p in all_posts:
        if p["slug"] == slug:
            continue
        overlap = len(set(p.get("tags", [])) & set(tags))
        if overlap > 0:
            candidates.append((overlap, p))
    candidates.sort(key=lambda x: (x[0], x[1].get("date", "")), reverse=True)
    return [BlogPostSummary(**p) for _, p in candidates[:4]]


def get_blog_by_slug(slug: str) -> BlogPostDetail | None:
    """根据 slug 查找博客详情（合并元数据 + 内容文件）。"""
    for post in get_all_blogs():
        if post["slug"] == slug:
            merged = _merge_detail(slug, post)
            if merged is None:
                return None
            detail = BlogPostDetail(**merged)
            detail.related = _get_related(slug, post.get("tags", []))
            return detail
    return None


def filter_blogs(
    tag: str | None = None,
    author: str | None = None,
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse:
    """筛选博客列表，支持分页和标签/作者筛选。"""
    posts = get_all_blogs()

    if tag:
        posts = [p for p in posts if tag in p.get("tags", [])]
    if author:
        posts = [p for p in posts if p.get("author") == author]

    posts.sort(key=lambda p: p.get("date", ""), reverse=True)

    total = len(posts)
    total_pages = max(1, ceil(total / page_size))
    start = (page - 1) * page_size
    end = start + page_size
    items = [BlogPostSummary(**p) for p in posts[start:end]]

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=items,
    )


def get_all_tags() -> TagListResponse:
    """聚合所有博客标签。"""
    tag_count: dict[str, int] = {}
    for post in get_all_blogs():
        for tag in post.get("tags", []):
            tag_count[tag] = tag_count.get(tag, 0) + 1

    tags = sorted(
        [TagCount(tag=t, count=c) for t, c in tag_count.items()],
        key=lambda x: (-x.count, x.tag),
    )
    return TagListResponse(tags=tags, total=len(tags))

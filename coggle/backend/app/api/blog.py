"""博客 API 路由。"""

from fastapi import APIRouter, HTTPException, Query

from app.schemas import BlogPostDetail, PaginatedResponse, TagListResponse
from app.services.blog import get_blog_by_slug, filter_blogs, get_all_tags

router = APIRouter(prefix="/api/blog", tags=["博客"])


@router.get("", response_model=PaginatedResponse)
def list_blogs(
    tag: str | None = Query(None, description="按标签筛选"),
    author: str | None = Query(None, description="按作者筛选"),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页条数"),
):
    """获取博客文章列表（分页）。"""
    return filter_blogs(tag=tag, author=author, page=page, page_size=page_size)


@router.get("/tags", response_model=TagListResponse)
def list_tags():
    """获取全站博客标签列表。"""
    return get_all_tags()


@router.get("/{slug}", response_model=BlogPostDetail)
def get_blog(slug: str):
    """获取博客文章详情。"""
    post = get_blog_by_slug(slug)
    if post is None:
        raise HTTPException(status_code=404, detail=f"博客 '{slug}' 不存在")
    return post

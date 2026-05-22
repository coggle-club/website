"""通用页面 API 路由。"""

from fastapi import APIRouter, HTTPException

from app.schemas import PageContent
from app.services.page import get_page_by_slug

router = APIRouter(prefix="/api/pages", tags=["页面"])


@router.get("/{slug}", response_model=PageContent)
def get_page(slug: str):
    """获取通用页面内容（关于、隐私政策等）。"""
    page = get_page_by_slug(slug)
    if page is None:
        raise HTTPException(status_code=404, detail=f"页面 '{slug}' 不存在")
    return page

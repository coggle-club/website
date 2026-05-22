"""搜索 API 路由。"""

from fastapi import APIRouter, Query

from app.schemas import SearchResponse
from app.services.search import search_content

router = APIRouter(prefix="/api/search", tags=["搜索"])


@router.get("", response_model=SearchResponse)
def search(
    q: str = Query(..., min_length=1, max_length=100, description="搜索关键词"),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=50, description="每页条数"),
):
    """搜索博客、教程和竞赛内容。"""
    return search_content(q=q, page=page, page_size=page_size)

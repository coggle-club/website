"""教程 API 路由。"""

from fastapi import APIRouter, HTTPException, Query

from app.schemas import PaginatedResponse, TutorialDetail
from app.services.tutorial import get_tutorial_by_slug, filter_tutorials

router = APIRouter(prefix="/api/tutorials", tags=["教程"])


@router.get("", response_model=PaginatedResponse)
def list_tutorials(
    tag: str | None = Query(None, description="按标签筛选"),
    difficulty: str | None = Query(
        None, pattern=r"^(beginner|intermediate|advanced)$",
        description="按难度筛选",
    ),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页条数"),
):
    """获取教程列表（分页）。"""
    return filter_tutorials(tag=tag, difficulty=difficulty, page=page, page_size=page_size)


@router.get("/{slug}", response_model=TutorialDetail)
def get_tutorial(slug: str):
    """获取教程详情（含系列导航）。"""
    tutorial = get_tutorial_by_slug(slug)
    if tutorial is None:
        raise HTTPException(status_code=404, detail=f"教程 '{slug}' 不存在")
    return tutorial

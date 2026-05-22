"""竞赛 API 路由。"""

from fastapi import APIRouter, HTTPException, Query

from app.schemas import CompetitionDetail, PaginatedResponse
from app.services.competition import get_competition_by_slug, filter_competitions

router = APIRouter(prefix="/api/competitions", tags=["竞赛"])


@router.get("", response_model=PaginatedResponse)
def list_competitions(
    tag: str | None = Query(None, description="按标签筛选"),
    platform: str | None = Query(None, description="按平台筛选"),
    status: str | None = Query(
        None, pattern=r"^(ongoing|ended)$",
        description="按状态筛选",
    ),
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(20, ge=1, le=100, description="每页条数"),
):
    """获取竞赛列表（分页）。"""
    return filter_competitions(
        tag=tag, platform=platform, status=status,
        page=page, page_size=page_size,
    )


@router.get("/{slug}", response_model=CompetitionDetail)
def get_competition(slug: str):
    """获取竞赛详情。"""
    competition = get_competition_by_slug(slug)
    if competition is None:
        raise HTTPException(status_code=404, detail=f"竞赛 '{slug}' 不存在")
    return competition

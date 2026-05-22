"""首页 API 路由。"""

from fastapi import APIRouter

from app.schemas import HomepageResponse
from app.services.homepage import get_homepage

router = APIRouter(prefix="/api/homepage", tags=["首页"])


@router.get("", response_model=HomepageResponse)
def homepage():
    """获取首页聚合数据（最新博客、精选教程、近期竞赛、社区统计）。"""
    return get_homepage()

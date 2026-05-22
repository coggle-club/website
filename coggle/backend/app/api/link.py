"""链接 API 路由。"""

from fastapi import APIRouter

from app.schemas import LinksResponse
from app.services.resource import get_links

router = APIRouter(prefix="/api/links", tags=["链接"])


@router.get("", response_model=LinksResponse)
def list_links():
    """获取全站链接列表（按分类）。"""
    return get_links()

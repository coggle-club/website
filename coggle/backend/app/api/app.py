"""应用托管 API 路由。"""

from fastapi import APIRouter, Query

from app.schemas import AppListResponse
from app.services.app import get_apps

router = APIRouter(prefix="/api/apps", tags=["应用"])


@router.get("", response_model=AppListResponse)
def list_apps(show_hidden: bool = Query(False, description="是否显示隐藏应用")):
    """获取应用列表。"""
    return get_apps(show_hidden=show_hidden)

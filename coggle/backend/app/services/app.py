"""应用信息服务。"""

from app.schemas import AppInfo, AppListResponse
from app.core.config import load_yaml


def get_apps() -> AppListResponse:
    """获取应用列表。"""
    data = load_yaml("apps")
    assert isinstance(data, list), "apps.yaml must contain a list"
    apps = [AppInfo(**item) for item in data]
    return AppListResponse(apps=apps, total=len(apps))

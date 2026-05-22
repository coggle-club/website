"""应用托管服务。"""

from datetime import datetime, timezone

from app.schemas import AppInfo, AppListResponse
from app.core.config import load_yaml


def get_apps() -> AppListResponse:
    """获取按分类分组的应用列表。"""
    data = load_yaml("apps")
    assert isinstance(data, list), "apps.yaml must contain a list"
    apps_list = data

    categories: dict[str, list[AppInfo]] = {}
    for app in apps_list:
        cat = app.get("category", "other")
        categories.setdefault(cat, []).append(AppInfo(**app))

    return AppListResponse(
        categories=categories,
        total=len(apps_list),
        updated_at=datetime.now(timezone.utc),
    )

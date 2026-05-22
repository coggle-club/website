"""应用信息服务。"""

from app.schemas import AppInfo, AppListResponse
from app.core.config import load_yaml


def get_apps(show_hidden: bool = False) -> AppListResponse:
    """获取应用列表。

    Args:
        show_hidden: 是否显示隐藏（内部/开发中）应用。
    """
    data = load_yaml("apps")
    assert isinstance(data, list), "apps.yaml must contain a list"
    apps = [AppInfo(**item) for item in data]
    if not show_hidden:
        apps = [app for app in apps if not app.hidden]
    return AppListResponse(apps=apps, total=len(apps))

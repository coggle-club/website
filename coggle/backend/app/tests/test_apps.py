"""应用数据测试。"""

from app.schemas import AppInfo, AppListResponse


class TestApps:
    """验证 config/apps.yaml 数据完整性。"""

    def test_load(self, apps_data):
        """应能解析为 AppListResponse。"""
        apps = [AppInfo(**app) for app in apps_data]
        resp = AppListResponse(apps=apps, total=len(apps))
        assert resp.total > 0

    def test_required_fields(self, apps_data):
        """每个应用必须有 slug / name / frontend_url / backend_url。"""
        for app in apps_data:
            assert app.get("slug"), "slug 不能为空"
            assert app.get("name"), "name 不能为空"
            assert app.get("frontend_url"), "frontend_url 不能为空"
            assert app.get("backend_url"), "backend_url 不能为空"

    def test_urls_valid(self, apps_data):
        """frontend_url 和 backend_url 必须是有效 URL。"""
        for app in apps_data:
            info = AppInfo(**app)
            assert str(info.frontend_url).startswith("https://")
            assert str(info.backend_url).startswith("https://")

    def test_tags_list(self, apps_data):
        """每个应用必须有 tags 列表。"""
        for app in apps_data:
            info = AppInfo(**app)
            assert isinstance(info.tags, list)

    def test_hidden_defaults_to_false(self, apps_data):
        """未指定 hidden 的应用默认应为 False。"""
        for item in apps_data:
            app = AppInfo(**item)
            if "hidden" not in item:
                assert app.hidden is False

    def test_hidden_apps_exist(self, apps_data):
        """至少有一个 hidden=True 的应用用于测试。"""
        apps = [AppInfo(**item) for item in apps_data]
        hidden = [a for a in apps if a.hidden]
        assert len(hidden) >= 1, "No hidden apps found in YAML; add one for testing"

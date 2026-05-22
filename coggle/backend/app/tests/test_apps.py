"""托管应用数据测试。"""

from app.schemas import AppInfo, AppListResponse


class TestApps:
    """验证 config/apps.json 数据完整性。"""

    def test_load(self, apps_data):
        """应能解析为 AppListResponse。"""
        categories = {}
        for app in apps_data:
            cat = app["category"]
            categories.setdefault(cat, []).append(AppInfo(**app))

        resp = AppListResponse(categories=categories, total=len(apps_data))
        assert resp.total > 0

    def test_framework_valid(self, apps_data):
        """framework 必须为 streamlit / gradio / custom 之一。"""
        valid = {"streamlit", "gradio", "custom"}
        for app in apps_data:
            assert app["framework"] in valid, f"{app['slug']} framework 不合法"

    def test_health_check_present(self, apps_data):
        """每个应用必须有健康检查数据。"""
        for app in apps_data:
            assert "health" in app and app["health"] is not None

    def test_all_frameworks_represented(self, apps_data):
        """至少包含两种不同框架。"""
        frameworks = {app["framework"] for app in apps_data}
        assert len(frameworks) >= 2

"""API 应用接口测试。"""

from fastapi.testclient import TestClient

from app.main import app
from app.services.app import get_apps

client = TestClient(app)


class TestApiApps:
    """测试 /api/apps 端点。"""

    def test_apps_returns_200(self):
        """应用列表应返回 200。"""
        resp = client.get("/api/apps")
        assert resp.status_code == 200

    def test_apps_shape(self):
        """响应应包含 apps 和 total。"""
        resp = client.get("/api/apps")
        data = resp.json()
        assert "apps" in data
        assert "total" in data
        assert data["total"] > 0

    def test_apps_items_have_required_fields(self):
        """每个应用应包含 slug / name / frontend_url / backend_url / description / tags。"""
        resp = client.get("/api/apps")
        data = resp.json()
        for item in data["apps"]:
            assert item["slug"]
            assert item["name"]
            assert item["frontend_url"]
            assert item["backend_url"]
            assert "description" in item
            assert isinstance(item["tags"], list)

    # ─── 隐藏应用测试 ───────────────────────────────────

    def test_default_excludes_hidden(self):
        """默认应排除 hidden=True 的应用。"""
        resp = client.get("/api/apps")
        data = resp.json()
        for item in data["apps"]:
            assert item["hidden"] is False, (
                f"Hidden app '{item['slug']}' should not appear by default"
            )

    def test_show_hidden_includes_all(self):
        """?show_hidden=true 应返回全部应用（含隐藏）。"""
        # 获取全部应用（含隐藏）
        all_resp = client.get("/api/apps?show_hidden=true")
        all_data = all_resp.json()

        # 获取默认（不含隐藏）
        default_resp = client.get("/api/apps")
        default_data = default_resp.json()

        # show_hidden=true 应返回更多或相等数量的应用
        assert all_data["total"] >= default_data["total"]

        # 验证隐藏应用确实出现在结果中
        hidden_apps = [a for a in all_data["apps"] if a["hidden"] is True]
        assert len(hidden_apps) >= 1, (
            "Expected at least one hidden app when show_hidden=true"
        )

    def test_hidden_field_present(self):
        """每个应用响应中应包含 hidden 字段。"""
        resp = client.get("/api/apps?show_hidden=true")
        data = resp.json()
        for item in data["apps"]:
            assert "hidden" in item
            assert isinstance(item["hidden"], bool)

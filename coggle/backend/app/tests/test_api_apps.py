"""API 应用接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

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

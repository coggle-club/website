"""API 应用托管接口测试。"""

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
        """响应应包含 categories、total、updated_at。"""
        resp = client.get("/api/apps")
        data = resp.json()
        assert "categories" in data
        assert "total" in data
        assert "updated_at" in data
        assert data["total"] > 0

    def test_apps_categories(self):
        """分类应包含已知的类别。"""
        resp = client.get("/api/apps")
        data = resp.json()
        categories = data["categories"]
        known_categories = {"visualization", "model-demo", "agent"}
        assert known_categories.issubset(categories.keys())

    def test_apps_items_have_required_fields(self):
        """每个应用应包含 slug/name/url/framework。"""
        resp = client.get("/api/apps")
        data = resp.json()
        for items in data["categories"].values():
            for item in items:
                assert item["slug"]
                assert item["name"]
                assert item["url"]
                assert item["framework"] in ("streamlit", "gradio", "custom")

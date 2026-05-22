"""API 链接接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiLinks:
    """测试 /api/links 端点。"""

    def test_links_returns_200(self):
        """链接列表应返回 200。"""
        resp = client.get("/api/links")
        assert resp.status_code == 200

    def test_links_shape(self):
        """响应应包含 categories 和 total。"""
        resp = client.get("/api/links")
        data = resp.json()
        assert "categories" in data
        assert "total" in data
        assert data["total"] > 0
        assert len(data["categories"]) >= 2

    def test_category_has_items(self):
        """每个分类下应有链接。"""
        resp = client.get("/api/links")
        data = resp.json()
        for cat in data["categories"]:
            assert "category" in cat
            assert len(cat["items"]) > 0

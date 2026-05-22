"""API 通用页面接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiPages:
    """测试 /api/pages 端点。"""

    def test_page_about_returns_200(self):
        """about 页面应返回 200。"""
        resp = client.get("/api/pages/about")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "about"
        assert data["title"]
        assert data["content"]

    def test_page_privacy_returns_200(self):
        """privacy 页面应返回 200。"""
        resp = client.get("/api/pages/privacy")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "privacy"

    def test_page_returns_404(self):
        """不存在的页面应返回 404。"""
        resp = client.get("/api/pages/nonexistent")
        assert resp.status_code == 404
        assert "不存在" in resp.json()["detail"]

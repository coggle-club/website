"""API 首页接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiHomepage:
    """测试 /api/homepage 端点。"""

    def test_homepage_returns_200(self):
        """首页应返回 200。"""
        resp = client.get("/api/homepage")
        assert resp.status_code == 200

    def test_homepage_shape(self):
        """响应应包含所有聚合字段。"""
        resp = client.get("/api/homepage")
        data = resp.json()
        assert "recent_posts" in data
        assert "featured_tutorials" in data
        assert "recent_competitions" in data

    def test_homepage_items_count(self):
        """各列表长度应符合预期。"""
        resp = client.get("/api/homepage")
        data = resp.json()
        assert len(data["recent_posts"]) <= 6
        assert len(data["featured_tutorials"]) <= 4
        assert len(data["recent_competitions"]) <= 4

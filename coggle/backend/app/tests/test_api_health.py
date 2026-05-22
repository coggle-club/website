"""API 健康检查接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiHealth:
    """测试 /api/health 端点。"""

    def test_health_returns_200(self):
        """健康检查应返回 200。"""
        resp = client.get("/api/health")
        assert resp.status_code == 200

    def test_health_shape(self):
        """响应应包含 status、version、timestamp。"""
        resp = client.get("/api/health")
        data = resp.json()
        assert data["status"] == "ok"
        assert data["version"] == "0.1.0"
        assert "timestamp" in data

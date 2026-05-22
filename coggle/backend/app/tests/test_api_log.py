"""日志 API 测试。"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestApiLog:
    """测试 POST /api/logs 端点。"""

    def test_post_log_default_level(self):
        """默认使用 INFO 级别。"""
        resp = client.post("/api/logs", json={"message": "test log"})
        assert resp.status_code == 200
        assert resp.json() == {"ok": True}

    def test_post_log_info_level(self):
        """显式 INFO 级别。"""
        resp = client.post("/api/logs", json={"level": "INFO", "message": "info msg"})
        assert resp.status_code == 200

    def test_post_log_warning_level(self):
        """WARNING 级别。"""
        resp = client.post("/api/logs", json={"level": "WARNING", "message": "warn msg"})
        assert resp.status_code == 200

    def test_post_log_error_level(self):
        """ERROR 级别。"""
        resp = client.post("/api/logs", json={"level": "ERROR", "message": "error msg"})
        assert resp.status_code == 200

    def test_post_log_invalid_level_falls_back_to_info(self):
        """无效 level 应回退到 INFO 而非报错。"""
        resp = client.post("/api/logs", json={"level": "INVALID", "message": "msg"})
        assert resp.status_code == 200

    def test_post_log_missing_message_returns_422(self):
        """缺少必填字段 message 应返回 422。"""
        resp = client.post("/api/logs", json={})
        assert resp.status_code == 422

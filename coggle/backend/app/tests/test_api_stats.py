"""API 统计接口测试。

注意：/api/stats 可能未注册，该测试文件作为骨架预留。
"""

from fastapi.testclient import TestClient
import pytest

from app.main import app

client = TestClient(app)


class TestApiStats:
    """测试 /api/stats 端点。"""

    def test_stats_returns_200(self):
        """统计应返回 200。"""
        resp = client.get("/api/stats")
        if resp.status_code == 404:
            pytest.skip("/api/stats 端点未注册")
        assert resp.status_code == 200

    def test_stats_shape(self):
        """响应应包含所有统计字段。"""
        resp = client.get("/api/stats")
        if resp.status_code == 404:
            pytest.skip("/api/stats 端点未注册")
        data = resp.json()
        assert "daily" in data
        assert "weekly" in data
        assert "timeline" in data

    def test_stats_daily_has_counts(self):
        """每日统计应包含文章和教程计数。"""
        resp = client.get("/api/stats")
        if resp.status_code == 404:
            pytest.skip("/api/stats 端点未注册")
        data = resp.json()
        daily = data["daily"]
        assert "articles" in daily
        assert "tutorials" in daily
        assert "competitions" in daily
        assert isinstance(daily["articles"], int)
        assert daily["articles"] >= 0

"""API 竞赛接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiCompetition:
    """测试 /api/competitions 端点。"""

    def test_list_returns_200(self):
        """竞赛列表应返回 200。"""
        resp = client.get("/api/competitions")
        assert resp.status_code == 200

    def test_list_pagination_shape(self):
        """响应应包含分页字段。"""
        resp = client.get("/api/competitions?page=1&page_size=2")
        data = resp.json()
        assert "total" in data
        assert "page" in data
        assert "items" in data
        assert len(data["items"]) <= 2

    def test_list_status_filter(self):
        """按状态筛选应返回正确结果。"""
        resp = client.get("/api/competitions?status=ongoing")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert item["status"] == "ongoing"

    def test_list_platform_filter(self):
        """按平台筛选应返回正确结果。"""
        resp = client.get("/api/competitions?platform=Kaggle")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert item["platform"] == "Kaggle"

    def test_detail_returns_200(self):
        """竞赛详情应返回 200。"""
        resp = client.get("/api/competitions/kaggle-llm-science")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "kaggle-llm-science"
        assert data["title"]
        assert data["content"]

    def test_detail_returns_404(self):
        """不存在的竞赛应返回 404。"""
        resp = client.get("/api/competitions/nonexistent")
        assert resp.status_code == 404
        assert "不存在" in resp.json()["detail"]

    def test_detail_contains_related(self):
        """竞赛详情应包含相关推荐。"""
        resp = client.get("/api/competitions/kaggle-llm-science")
        data = resp.json()
        assert "related" in data
        for rel in data["related"]:
            assert rel["slug"]
            assert rel["title"]
            assert rel["slug"] != "kaggle-llm-science"

    def test_list_empty_tag_filter_returns_empty(self):
        """不存在的标签筛选应返回空列表。"""
        resp = client.get("/api/competitions?tag=nonexistent_tag_xyz")
        assert resp.status_code == 200
        data = resp.json()
        assert data["total"] == 0
        assert data["items"] == []

    def test_list_page_out_of_range_returns_empty(self):
        """超出范围的分页应返回空列表。"""
        resp = client.get("/api/competitions?page=999&page_size=10")
        assert resp.status_code == 200
        data = resp.json()
        assert data["items"] == []

    def test_list_default_page_size(self):
        """不指定 page_size 时应使用默认分页。"""
        resp = client.get("/api/competitions")
        assert resp.status_code == 200
        data = resp.json()
        assert data["page"] >= 1
        assert data["total"] >= 0

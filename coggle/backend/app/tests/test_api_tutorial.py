"""API 教程接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiTutorial:
    """测试 /api/tutorials 端点。"""

    def test_list_returns_200(self):
        """教程列表应返回 200。"""
        resp = client.get("/api/tutorials")
        assert resp.status_code == 200

    def test_list_pagination_shape(self):
        """响应应包含分页字段。"""
        resp = client.get("/api/tutorials?page=1&page_size=2")
        data = resp.json()
        assert "total" in data
        assert "page" in data
        assert "items" in data
        assert len(data["items"]) <= 2

    def test_list_difficulty_filter(self):
        """按难度筛选应返回正确结果。"""
        resp = client.get("/api/tutorials?difficulty=beginner")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert item["difficulty"] == "beginner"

    def test_detail_returns_200(self):
        """教程详情应返回 200。"""
        resp = client.get("/api/tutorials/pytorch-basics-1")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "pytorch-basics-1"
        assert data["title"]
        assert data["content"]

    def test_detail_contains_series_nav(self):
        """系列教程详情应包含 prev/next 导航。"""
        resp = client.get("/api/tutorials/pytorch-basics-2")
        assert resp.status_code == 200
        data = resp.json()
        assert data["series"] is not None
        assert data["prev"] is not None
        assert data["next"] is not None
        assert data["prev"]["slug"] == "pytorch-basics-1"
        assert data["next"]["slug"] == "pytorch-basics-3"

    def test_detail_series_first_has_no_prev(self):
        """系列第一篇应有 next 但无 prev。"""
        resp = client.get("/api/tutorials/pytorch-basics-1")
        data = resp.json()
        assert data["prev"] is None
        assert data["next"] is not None

    def test_detail_series_last_has_no_next(self):
        """系列最后一篇应有 prev 但无 next。"""
        resp = client.get("/api/tutorials/pytorch-basics-5")
        data = resp.json()
        assert data["prev"] is not None
        assert data["next"] is None

    def test_detail_returns_404(self):
        """不存在的教程应返回 404。"""
        resp = client.get("/api/tutorials/nonexistent")
        assert resp.status_code == 404
        assert "不存在" in resp.json()["detail"]

    def test_detail_contains_related(self):
        """教程详情应包含相关推荐。"""
        resp = client.get("/api/tutorials/pytorch-basics-1")
        data = resp.json()
        assert "related" in data
        for rel in data["related"]:
            assert rel["slug"]
            assert rel["title"]
            assert rel["slug"] != "pytorch-basics-1"

    def test_list_empty_difficulty_returns_empty(self):
        """不存在的难度筛选应返回空列表或 422（取决于校验）。"""
        resp = client.get("/api/tutorials?difficulty=nonexistent")
        # 如果 Pydantic 校验拦截了非法值，返回 422
        # 如果通过校验，返回空结果
        if resp.status_code == 422:
            return
        data = resp.json()
        assert data["total"] == 0

    def test_list_tag_filter(self):
        """按标签筛选应返回正确结果。"""
        resp = client.get("/api/tutorials?tag=PyTorch")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert "PyTorch" in item["tags"]

    def test_list_standalone_tutorial_no_series_nav(self):
        """独立教程不应有 series/prev/next 字段。"""
        # 找一个独立教程（不在系列中）
        resp = client.get("/api/tutorials")
        data = resp.json()
        standalone = [t for t in data["items"] if not t.get("series")]
        # 如果存在独立教程，验证详情
        for t in standalone[:1]:
            detail = client.get(f"/api/tutorials/{t['slug']}")
            detail_data = detail.json()
            assert detail_data["series"] is None
            assert detail_data["prev"] is None
            assert detail_data["next"] is None

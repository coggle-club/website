"""API 博客接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiBlog:
    """测试 /api/blog 端点。"""

    def test_list_returns_200(self):
        """博客列表应返回 200。"""
        resp = client.get("/api/blog")
        assert resp.status_code == 200

    def test_list_pagination_shape(self):
        """响应应包含分页字段。"""
        resp = client.get("/api/blog?page=1&page_size=2")
        data = resp.json()
        assert "total" in data
        assert "page" in data
        assert "page_size" in data
        assert "total_pages" in data
        assert "items" in data
        assert data["page"] == 1
        assert data["page_size"] == 2
        assert len(data["items"]) <= 2

    def test_list_tag_filter(self):
        """按标签筛选应返回正确结果。"""
        resp = client.get("/api/blog?tag=BERT")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert "BERT" in item["tags"]

    def test_list_author_filter(self):
        """按作者筛选应返回正确结果。"""
        resp = client.get("/api/blog?author=Coggle+阿水")
        assert resp.status_code == 200
        data = resp.json()
        for item in data["items"]:
            assert item["author"] == "Coggle 阿水"

    def test_detail_returns_200(self):
        """博客详情应返回 200。"""
        resp = client.get("/api/blog/time-series")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "time-series"
        assert data["title"]
        assert data["content"]

    def test_detail_returns_404(self):
        """不存在的博客应返回 404。"""
        resp = client.get("/api/blog/nonexistent")
        assert resp.status_code == 404
        assert "不存在" in resp.json()["detail"]

    def test_tags_returns_200(self):
        """标签列表应返回 200。"""
        resp = client.get("/api/blog/tags")
        assert resp.status_code == 200
        data = resp.json()
        assert "tags" in data
        assert "total" in data
        assert data["total"] > 0

    def test_detail_contains_related(self):
        """博客详情应包含相关推荐。"""
        resp = client.get("/api/blog/time-series")
        data = resp.json()
        assert "related" in data
        for rel in data["related"]:
            assert rel["slug"]
            assert rel["title"]
            assert rel["slug"] != "time-series"

    def test_list_empty_tag_returns_empty(self):
        """不存在的标签筛选应返回空列表。"""
        resp = client.get("/api/blog?tag=nonexistent_tag_xyz")
        assert resp.status_code == 200
        data = resp.json()
        assert data["total"] == 0
        assert data["items"] == []

    def test_list_page_out_of_range(self):
        """超出范围的分页应返回空列表。"""
        resp = client.get("/api/blog?page=999&page_size=10")
        assert resp.status_code == 200
        data = resp.json()
        assert data["items"] == []

    def test_list_default_pagination(self):
        """默认分页参数应正常工作。"""
        resp = client.get("/api/blog")
        assert resp.status_code == 200
        data = resp.json()
        assert data["page"] == 1
        assert data["total"] >= 0

    def test_tags_shape(self):
        """标签接口应返回正确的数据结构。"""
        resp = client.get("/api/blog/tags")
        data = resp.json()
        assert isinstance(data["tags"], list)
        for tag in data["tags"]:
            assert "tag" in tag
            assert "count" in tag
            assert isinstance(tag["count"], int)
            assert tag["count"] > 0

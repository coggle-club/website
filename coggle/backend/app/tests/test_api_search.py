"""API 搜索接口测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiSearch:
    """测试 /api/search 端点。"""

    def test_search_returns_200(self):
        """搜索应返回 200。"""
        resp = client.get("/api/search?q=LLM")
        assert resp.status_code == 200

    def test_search_shape(self):
        """响应应包含搜索结果字段。"""
        resp = client.get("/api/search?q=LLM")
        data = resp.json()
        assert data["query"] == "LLM"
        assert "results" in data
        assert "took_ms" in data
        assert "total" in data
        assert data["total"] > 0

    def test_search_results_have_required_fields(self):
        """搜索结果应包含 type/slug/title/score。"""
        resp = client.get("/api/search?q=LLM")
        data = resp.json()
        for result in data["results"]:
            assert result["type"] in ("blog", "tutorial", "competition", "model")
            assert result["slug"]
            assert result["title"]
            assert result["score"] > 0

    def test_search_pagination(self):
        """搜索分页应正常工作。"""
        resp = client.get("/api/search?q=LLM&page=1&page_size=2")
        data = resp.json()
        assert data["page"] == 1
        assert data["page_size"] == 2
        assert len(data["results"]) <= 2

    def test_search_no_results(self):
        """无匹配关键词应返回空结果。"""
        resp = client.get("/api/search?q=xyznonexistent")
        data = resp.json()
        assert data["total"] == 0
        assert len(data["results"]) == 0

    def test_search_empty_query_returns_422(self):
        """空搜索词应返回 422。"""
        resp = client.get("/api/search?q=")
        assert resp.status_code == 422

    def test_search_took_ms_is_positive(self):
        """搜索耗时应非负。"""
        resp = client.get("/api/search?q=LLM")
        data = resp.json()
        assert data["took_ms"] >= 0

    def test_search_results_deduplicated(self):
        """搜索结果不应有重复 slug。"""
        resp = client.get("/api/search?q=LLM")
        data = resp.json()
        slugs = [(r["type"], r["slug"]) for r in data["results"]]
        assert len(slugs) == len(set(slugs))

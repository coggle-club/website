"""模型 API 测试。"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestApiModels:
    """测试 /api/models 端点。"""

    def test_list_returns_200(self):
        """模型列表应返回 200。"""
        resp = client.get("/api/models")
        assert resp.status_code == 200

    def test_list_shape(self):
        """响应应为按类别分组的 dict。"""
        resp = client.get("/api/models")
        data = resp.json()
        assert isinstance(data, dict)
        # 至少有一个类别
        assert len(data) > 0
        for category, models in data.items():
            assert isinstance(category, str)
            assert isinstance(models, list)
            for model in models:
                assert "slug" in model
                assert "name" in model

    def test_detail_returns_200(self):
        """模型详情应返回 200 并包含内容。"""
        resp = client.get("/api/models/deepseek-r1")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "deepseek-r1"
        assert data["name"] == "DeepSeek-R1"
        assert "content" in data
        assert len(data["content"]) > 0

    def test_detail_returns_404(self):
        """不存在的模型应返回 404。"""
        resp = client.get("/api/models/nonexistent")
        assert resp.status_code == 404

    def test_detail_contains_content(self):
        """模型详情应包含 Markdown 介绍内容。"""
        resp = client.get("/api/models/deepseek-r1")
        data = resp.json()
        assert "content" in data
        assert len(data["content"]) > 0

    def test_detail_contains_urls(self):
        """模型详情应包含论文和代码仓库链接。"""
        resp = client.get("/api/models/deepseek-r1")
        data = resp.json()
        assert "paper_url" in data
        assert "github_url" in data

    def test_detail_contains_relations(self):
        """模型详情应包含关系数据。"""
        resp = client.get("/api/models/deepseek-r1")
        data = resp.json()
        assert "relations" in data
        assert len(data["relations"]) > 0
        for rel in data["relations"]:
            assert "target" in rel
            assert "type" in rel

    def test_detail_relations_have_valid_types(self):
        """关系 type 字段必须合法。"""
        valid_types = {"evolution", "variant", "inspired_by"}
        resp = client.get("/api/models/deepseek-r1")
        data = resp.json()
        for rel in data["relations"]:
            assert rel["type"] in valid_types, f"非法关系类型: {rel['type']}"

    def test_detail_relations_point_to_existing_models(self):
        """关系 target slug 应对应已存在的模型。"""
        # 先获取所有模型 slug
        list_resp = client.get("/api/models")
        all_slugs: set[str] = set()
        for models in list_resp.json().values():
            for m in models:
                all_slugs.add(m["slug"])

        list_resp = client.get("/api/models")
        for models in list_resp.json().values():
            for m in models:
                detail = client.get(f"/api/models/{m['slug']}")
                data = detail.json()
                for rel in data.get("relations") or []:
                    assert rel["target"] in all_slugs, \
                        f"{m['slug']} 的关系指向不存在的模型: {rel['target']}"

    def test_list_all_categories_have_models(self):
        """每个类别至少有一个模型。"""
        resp = client.get("/api/models")
        data = resp.json()
        for category, models in data.items():
            assert len(models) > 0, f"类别 '{category}' 没有模型"

    def test_list_each_model_has_required_fields(self):
        """列表中的每个模型必须包含必要字段。"""
        resp = client.get("/api/models")
        data = resp.json()
        for models in data.values():
            for m in models:
                assert "slug" in m
                assert "name" in m
                assert "category" in m
                assert "publisher" in m
                assert "date" in m
                assert "tags" in m
                assert isinstance(m["tags"], list)

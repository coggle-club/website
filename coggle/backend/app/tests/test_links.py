"""链接配置数据测试。"""

from app.schemas import LinkCategory, LinksResponse


class TestLinks:
    """验证 config/links.json 数据完整性。"""

    def test_load(self, links_data):
        """应能解析为 LinksResponse。"""
        resp = LinksResponse(categories=links_data, total=sum(len(c["items"]) for c in links_data))
        assert resp.total > 0

    def test_category_count(self, links_data):
        """至少包含 2 个分类。"""
        assert len(links_data) >= 2

    def test_each_item_has_url(self, links_data):
        """每个链接必须有 url。"""
        cat_models = [LinkCategory(**c) for c in links_data]
        for cat in cat_models:
            for item in cat.items:
                assert item.url is not None

    def test_no_empty_items(self, links_data):
        """每个分类下至少有一条链接。"""
        for cat in links_data:
            assert len(cat["items"]) > 0, f"{cat['category']} 下没有链接"

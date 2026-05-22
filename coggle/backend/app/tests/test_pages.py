"""页面配置数据测试。"""

from pathlib import Path

from fastapi.testclient import TestClient

from ..main import app
from ..schemas import PageContent

PAGE_DIR = Path(__file__).resolve().parents[4] / "config" / "pages"


class TestPages:
    """验证 config/pages.yaml 数据完整性。"""

    def test_load(self, pages_data):
        """每个页面必须包含必要字段（不含 content，content 已移至 pages/ 目录）。"""
        for page in pages_data:
            assert page["slug"]
            assert page["title"]

    def test_required_pages(self, pages_data):
        """必须包含 about 页面。"""
        slugs = [p["slug"] for p in pages_data]
        assert "about" in slugs, "缺少 about 页面"

    def test_slug_unique(self, pages_data):
        """slug 全局唯一。"""
        slugs = [p["slug"] for p in pages_data]
        assert len(slugs) == len(set(slugs))

    def test_content_files_exist(self, pages_data):
        """每个页面应有对应的 .md 内容文件。"""
        for page in pages_data:
            filepath = PAGE_DIR / f"{page['slug']}.md"
            assert filepath.exists(), f"缺少 pages/{page['slug']}.md"

    def test_content_files_have_content(self, pages_data):
        """每个 .md 文件应有内容。"""
        for page in pages_data:
            filepath = PAGE_DIR / f"{page['slug']}.md"
            content = filepath.read_text(encoding="utf-8")
            assert content, f"pages/{page['slug']}.md 为空"

    def test_detail_api_returns_content(self, pages_data):
        """页面详情 API 应返回 content 字段。"""
        client = TestClient(app)
        for page in pages_data:
            resp = client.get(f"/api/pages/{page['slug']}")
            assert resp.status_code == 200, f"{page['slug']} 返回 {resp.status_code}"
            data = resp.json()
            assert "content" in data
            assert len(data["content"]) > 0

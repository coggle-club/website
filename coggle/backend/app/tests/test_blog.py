"""博客配置数据测试。"""

from app.schemas import BlogPostSummary
from app.core.config import BLOG_DIR


class TestBlog:
    """验证 config/blog.yaml 数据完整性。"""

    def test_load(self, blog_data):
        """每篇文章必须包含必要字段（不含 content，因 content 已移至 blog/ 目录）。"""
        for post in blog_data:
            assert post["slug"]
            assert post["title"]
            assert post["author"]

    def test_dates_valid(self, blog_data):
        """发布日期格式正确且不晚于今天。"""
        from datetime import date
        today = date.today()
        for post in blog_data:
            pub = date.fromisoformat(post["date"])
            assert pub <= today, f"{post['slug']} 发布日期晚于今天"

    def test_slug_unique(self, blog_data):
        """slug 全局唯一。"""
        slugs = [p["slug"] for p in blog_data]
        assert len(slugs) == len(set(slugs))

    def test_tags_not_empty(self, blog_data):
        """每篇文章至少有一个标签。"""
        for post in blog_data:
            assert len(post["tags"]) > 0, f"{post['slug']} 缺少标签"

    def test_blog_summary_schema(self, blog_data):
        """摘要信息应能通过 BlogPostSummary 校验。"""
        for post in blog_data:
            BlogPostSummary(**post)

    def test_blog_content_files_exist(self, blog_data):
        """每篇博客在 blog/ 目录下有对应的内容文件。"""
        for post in blog_data:
            filepath = BLOG_DIR / f"{post['slug']}.md"
            assert filepath.exists(), f"缺少 blog/{post['slug']}.md"

    def test_blog_content_files_have_content(self, blog_data):
        """每个内容文件必须包含内容。"""
        for post in blog_data:
            filepath = BLOG_DIR / f"{post['slug']}.md"
            content = filepath.read_text(encoding="utf-8")
            assert content, f"blog/{post['slug']}.md 为空"

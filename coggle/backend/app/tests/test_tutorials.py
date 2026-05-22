"""教程配置数据测试。"""

from app.schemas import TutorialSummary
from app.core.config import TUTORIAL_DIR


class TestTutorials:
    """验证 config/tutorials.yaml 数据完整性。"""

    def test_load(self, tutorials_data):
        """每个教程必须包含必要字段（不含 content，因 content 已移至 tutorials/ 目录）。"""
        for t in tutorials_data:
            assert t["slug"]
            assert t["difficulty"] in ("beginner", "intermediate", "advanced")

    def test_series_consistency(self, tutorials_data):
        """同一系列内 order 不重复且不超过 total。"""
        series_groups = {}
        for t in tutorials_data:
            if t.get("series"):
                key = t["series"]["name"]
                series_groups.setdefault(key, []).append(t)

        for name, group in series_groups.items():
            orders = [t["series"]["order"] for t in group]
            assert len(orders) == len(set(orders)), f"{name} 中有重复 order"
            total = group[0]["series"]["total"]
            for t in group:
                assert t["series"]["order"] <= total

    def test_difficulty_valid(self, tutorials_data):
        """每个教程应能通过 TutorialSummary 校验。"""
        for t in tutorials_data:
            TutorialSummary(**t)

    def test_tutorial_content_files_exist(self, tutorials_data):
        """每篇教程在 tutorials/ 目录下有对应的内容文件。"""
        for t in tutorials_data:
            filepath = TUTORIAL_DIR / f"{t['slug']}.md"
            assert filepath.exists(), f"缺少 tutorials/{t['slug']}.md"

    def test_tutorial_content_files_have_content(self, tutorials_data):
        """每个内容文件必须包含内容。"""
        for t in tutorials_data:
            filepath = TUTORIAL_DIR / f"{t['slug']}.md"
            content = filepath.read_text(encoding="utf-8")
            assert content, f"tutorials/{t['slug']}.md 为空"

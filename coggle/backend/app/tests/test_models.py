"""模型配置数据测试。"""

from app.schemas import ModelSummary
from app.core.config import MODEL_DIR


class TestModels:
    """验证 config/models.yaml 数据完整性。"""

    def test_load(self, models_data):
        """每个模型必须包含必要字段（不含 content，因 content 已移至 models/ 目录）。"""
        for m in models_data:
            assert m["slug"]
            assert m["name"]
            assert m["category"]
            assert m["publisher"]

    def test_slug_unique(self, models_data):
        """slug 全局唯一。"""
        slugs = [m["slug"] for m in models_data]
        assert len(slugs) == len(set(slugs))

    def test_tags_not_empty(self, models_data):
        """每个模型至少有一个标签。"""
        for m in models_data:
            assert len(m["tags"]) > 0, f"{m['slug']} 缺少标签"

    def test_model_summary_schema(self, models_data):
        """应能通过 ModelSummary 校验。"""
        for m in models_data:
            ModelSummary(**m)

    def test_model_content_files_exist(self, models_data):
        """每篇模型在 models/ 目录下有对应的内容文件。"""
        for m in models_data:
            filepath = MODEL_DIR / f"{m['slug']}.md"
            assert filepath.exists(), f"缺少 models/{m['slug']}.md"

    def test_model_content_files_have_content(self, models_data):
        """每个内容文件必须包含内容。"""
        for m in models_data:
            filepath = MODEL_DIR / f"{m['slug']}.md"
            content = filepath.read_text(encoding="utf-8")
            assert content, f"models/{m['slug']}.md 为空"

"""模型服务：加载 YAML → Pydantic 模型，支持筛选与详情查询。"""

from app.schemas import ModelDetail, ModelSummary
from app.core.config import load_yaml, load_model_content


def get_all_models() -> list[dict]:
    """加载模型原始数据。"""
    data = load_yaml("models")
    assert isinstance(data, list), "models.yaml must contain a list"
    return data


def _merge_detail(slug: str, meta: dict) -> dict | None:
    """合并元数据与内容文件，构造 ModelDetail 所需的完整 dict。"""
    content = load_model_content(slug)
    if content is None:
        return None
    return {**meta, "content": content, "draft": meta.get("draft", False)}


def get_model_by_slug(slug: str) -> ModelDetail | None:
    """根据 slug 查找模型详情。"""
    for model in get_all_models():
        if model["slug"] == slug:
            merged = _merge_detail(slug, model)
            if merged is None:
                return None
            return ModelDetail(**merged)
    return None


def get_models_by_category() -> dict[str, list[ModelSummary]]:
    """按类别分组返回模型列表。"""
    models = get_all_models()
    groups: dict[str, list[ModelSummary]] = {}
    for model in models:
        cat = model.get("category", "其他")
        groups.setdefault(cat, []).append(ModelSummary(**model))
    return groups

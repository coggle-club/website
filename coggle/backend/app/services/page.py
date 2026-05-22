"""通用页面服务。"""

from app.schemas import PageContent
from app.core.config import load_yaml, load_page_content


def _merge_detail(slug: str, meta: dict) -> dict | None:
    """合并 YAML 元数据与 .md 内容，返回详情字典或 None（内容文件缺失时）。"""
    content = load_page_content(slug)
    if content is None:
        return None
    return {**meta, "content": content}


def get_page_by_slug(slug: str) -> PageContent | None:
    """根据 slug 获取通用页面内容。"""
    data = load_yaml("pages")
    assert isinstance(data, list), "pages.yaml must contain a list"
    for page in data:
        if page["slug"] == slug:
            merged = _merge_detail(slug, page)
            if merged is None:
                return None
            return PageContent(**merged)
    return None

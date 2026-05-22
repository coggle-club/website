"""资源服务：链接数据。"""

from app.schemas import LinksResponse
from app.core.config import load_yaml


def get_links() -> LinksResponse:
    """获取全站链接列表。"""
    data = load_yaml("links")
    assert isinstance(data, list), "links.yaml must contain a list"
    categories = data
    total = sum(len(c.get("items", [])) for c in categories)
    return LinksResponse(categories=categories, total=total)

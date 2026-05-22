from __future__ import annotations

from pydantic import BaseModel, Field, HttpUrl


# ─── 链接 ──────────────────────────────────────────────────


class LinkItem(BaseModel):
    """单个友情链接或资源链接。"""

    name: str = Field(..., description="链接名称")
    url: HttpUrl = Field(..., description="链接地址")
    description: str = Field(..., description="链接简介")


class LinkCategory(BaseModel):
    """链接分类，包含该分类下的链接列表。"""

    category: str = Field(..., description="分类名称")
    items: list[LinkItem] = Field(
        default_factory=list, description="该分类下的链接列表"
    )


class LinksResponse(BaseModel):
    """全站链接列表响应。"""

    categories: list[LinkCategory] = Field(
        default_factory=list, description="按分类组织的链接列表"
    )
    total: int = Field(..., ge=0, description="链接总数")

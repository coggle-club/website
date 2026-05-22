"""应用信息 Schema。"""

from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class AppInfo(BaseModel):
    """Coggle 应用信息。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="URL 标识")
    name: str = Field(..., description="应用名称")
    frontend_url: HttpUrl = Field(..., description="前端地址")
    backend_url: HttpUrl = Field(..., description="后端地址")
    description: str = Field("", description="应用简介")
    tags: list[str] = Field(default_factory=list, description="标签列表")
    hidden: bool = Field(False, description="是否隐藏（内部/开发中应用）")


class AppListResponse(BaseModel):
    """应用列表响应。"""

    apps: list[AppInfo] = Field(default_factory=list, description="应用列表")
    total: int = Field(..., ge=0, description="应用总数")

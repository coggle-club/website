from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class AppHealthStatus(BaseModel):
    """托管应用的健康检查状态。"""

    model_config = ConfigDict(from_attributes=True)

    status: str = Field(
        ..., pattern=r"^(healthy|degraded|unreachable)$",
        description="健康状态：healthy / degraded / unreachable",
    )
    last_ping: datetime = Field(..., description="最后一次成功 Ping 的时间")
    response_time_ms: Optional[int] = Field(
        None, ge=0, description="最近响应时间（毫秒）"
    )


class AppInfo(BaseModel):
    """托管的数据科学应用（Streamlit / Gradio / AI 智能体）。"""

    model_config = ConfigDict(from_attributes=True)

    slug: str = Field(..., description="应用标识")
    name: str = Field(..., description="应用名称")
    description: str = Field(..., description="应用简介")
    url: HttpUrl = Field(..., description="应用访问地址")
    framework: str = Field(
        ..., pattern=r"^(streamlit|gradio|custom)$",
        description="应用框架：streamlit / gradio / custom",
    )
    category: str = Field(
        ..., description="分类：visualization / model-demo / agent"
    )
    cover: Optional[HttpUrl] = Field(None, description="CDN 封面图 URL")
    mobile_friendly: bool = Field(False, description="是否支持移动端布局")
    health: Optional[AppHealthStatus] = Field(
        None, description="当前健康状态"
    )


class AppListResponse(BaseModel):
    """按分类分组的应用列表响应。"""

    categories: dict[str, list[AppInfo]] = Field(
        ..., description="按分类分组的应用列表"
    )
    total: int = Field(..., ge=0, description="应用总数")
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="最后更新时间",
    )

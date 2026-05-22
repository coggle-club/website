from datetime import datetime, timezone
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """健康检查接口响应。"""

    status: str = Field("ok", description="服务健康状态")
    version: str = Field("0.1.0", description="API 版本号")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class TagCount(BaseModel):
    """标签及关联内容数量。"""

    tag: str = Field(..., description="标签名称（小写英文）")
    count: int = Field(..., ge=0, description="该标签下的内容数量")


class TagListResponse(BaseModel):
    """全站标签列表响应。"""

    tags: list[TagCount] = Field(
        default_factory=list, description="标签列表，按数量降序排列"
    )
    total: int = Field(..., ge=0, description="标签总数")


class PaginationParams(BaseModel):
    """分页查询参数。"""

    page: int = Field(1, ge=1, description="页码，从 1 开始")
    page_size: int = Field(20, ge=1, le=100, description="每页条数")


class PaginatedResponse(BaseModel):
    """通用分页响应包装。"""

    total: int = Field(..., ge=0, description="总条数")
    page: int = Field(..., ge=1, description="当前页码")
    page_size: int = Field(..., ge=1, description="每页条数")
    total_pages: int = Field(..., ge=0, description="总页数")
    items: list = Field(default_factory=list, description="数据列表")

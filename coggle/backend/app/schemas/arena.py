from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class IdentityInfo(BaseModel):
    """浏览器指纹标识的匿名用户身份。"""

    model_config = ConfigDict(from_attributes=True)

    fingerprint: str = Field(..., min_length=8, description="Canvas 指纹哈希值")
    nickname: Optional[str] = Field(None, max_length=32, description="显示昵称")


# ─── 提交 ──────────────────────────────────────────────────


class SubmissionCreate(BaseModel):
    """提交请求参数。"""

    competition_slug: str = Field(..., description="目标竞赛标识")
    identity: IdentityInfo = Field(..., description="提交者身份")


class SubmissionStatus(str):
    """提交处理状态枚举。"""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class SubmissionResponse(BaseModel):
    """提交后的即时响应。"""

    model_config = ConfigDict(from_attributes=True)

    submission_id: str = Field(..., description="唯一提交 ID（ULID）")
    competition_slug: str = Field(..., description="目标竞赛标识")
    status: str = Field("pending", description="初始处理状态")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="提交时间戳",
    )
    message: str = Field("提交已接受", description="人类可读的提示消息")


# ─── 排行榜 ─────────────────────────────────────────────────


class LeaderboardEntry(BaseModel):
    """排行榜单条记录。"""

    model_config = ConfigDict(from_attributes=True)

    rank: int = Field(..., ge=1, description="排名")
    nickname: str = Field(..., description="提交者昵称")
    score: Decimal = Field(..., description="评估分数")
    metric: str = Field(..., description="评估指标名称（AUC / F1 / MSE）")
    submission_id: str = Field(..., description="提交 ID")
    created_at: datetime = Field(..., description="提交时间")


class LeaderboardResponse(BaseModel):
    """完整排行榜响应。"""

    competition_slug: str = Field(..., description="竞赛标识")
    metric: str = Field(..., description="评估指标")
    entries: list[LeaderboardEntry] = Field(
        default_factory=list, description="排名条目，最优在前"
    )
    total_entries: int = Field(..., ge=0, description="总提交次数")
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="最后更新时间",
    )


# ─── 评估结果 ──────────────────────────────────────────────


class EvaluationResult(BaseModel):
    """评估任务完成结果。"""

    model_config = ConfigDict(from_attributes=True)

    submission_id: str = Field(..., description="提交 ID")
    status: str = Field(..., description="最终状态（completed / failed）")
    score: Optional[Decimal] = Field(None, description="计算得分")
    metric: Optional[str] = Field(None, description="使用的评估指标")
    error: Optional[str] = Field(None, description="失败时的错误信息")
    completed_at: Optional[datetime] = Field(
        None, description="评估完成时间"
    )

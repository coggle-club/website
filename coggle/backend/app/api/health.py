"""健康检查接口。"""

from fastapi import APIRouter

from app.schemas import HealthResponse

router = APIRouter(tags=["健康检查"])


@router.get("/api/health", response_model=HealthResponse)
def health_check():
    """服务健康检查。"""
    return HealthResponse()

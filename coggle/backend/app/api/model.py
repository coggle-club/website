"""模型 API 路由。"""

from fastapi import APIRouter, HTTPException

from app.schemas import ModelDetail
from app.services.model import get_model_by_slug, get_models_by_category

router = APIRouter(prefix="/api/models", tags=["模型"])


@router.get("")
def list_models():
    """获取模型列表（按类别分组）。"""
    return get_models_by_category()


@router.get("/{slug}", response_model=ModelDetail)
def get_model(slug: str):
    """获取模型详情。"""
    model = get_model_by_slug(slug)
    if model is None:
        raise HTTPException(status_code=404, detail=f"模型 '{slug}' 不存在")
    return model

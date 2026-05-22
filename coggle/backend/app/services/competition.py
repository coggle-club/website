"""竞赛服务：加载 YAML → Pydantic 模型，支持筛选与分页。"""

import datetime
from math import ceil

from app.schemas import CompetitionDetail, CompetitionSummary, PaginatedResponse
from app.core.config import load_yaml, load_competition_content


def _parse_date(value: datetime.date | str | None) -> datetime.date | None:
    """将 date / str / None 统一转换为 date 或 None。"""
    if value is None:
        return None
    if isinstance(value, datetime.date):
        return value
    return datetime.date.fromisoformat(value)


def _compute_status(end_date: datetime.date | str | None) -> str:
    """根据结束日期自动计算竞赛状态。"""
    parsed = _parse_date(end_date)
    if parsed is None:
        return "ongoing"
    today = datetime.date.today()
    return "ended" if parsed < today else "ongoing"


def _enrich(meta: dict) -> dict:
    """注入自动计算的字段（status）。"""
    return {**meta, "status": _compute_status(meta.get("end_date"))}


def _merge_detail(slug: str, meta: dict) -> dict | None:
    """合并 YAML 元数据与 .md 内容，返回详情字典或 None（内容文件缺失时）。"""
    content = load_competition_content(slug)
    if content is None:
        return None
    return {**meta, "content": content, "draft": meta.get("draft", False)}


def get_all_competitions() -> list[dict]:
    """加载竞赛原始数据。"""
    data = load_yaml("competitions")
    assert isinstance(data, list), "competitions.yaml must contain a list"
    return data


def _get_related(slug: str, tags: list[str]) -> list[CompetitionSummary]:
    """基于同标签推荐相关竞赛（前 4 个）。"""
    competitions = get_all_competitions()
    candidates = []
    for c in competitions:
        if c["slug"] == slug:
            continue
        overlap = len(set(c.get("tags", [])) & set(tags))
        if overlap > 0:
            candidates.append((overlap, c))
    candidates.sort(key=lambda x: (-x[0], x[1].get("date", "")), reverse=False)
    candidates.sort(key=lambda x: -x[0])
    return [CompetitionSummary(**_enrich(c)) for _, c in candidates[:4]]


def get_competition_by_slug(slug: str) -> CompetitionDetail | None:
    """根据 slug 查找竞赛详情。"""
    for comp in get_all_competitions():
        if comp["slug"] == slug:
            merged = _merge_detail(slug, comp)
            if merged is None:
                return None
            detail = CompetitionDetail(**merged)
            detail.related = _get_related(slug, comp.get("tags", []))
            return detail
    return None


def filter_competitions(
    tag: str | None = None,
    platform: str | None = None,
    status: str | None = None,
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse:
    """筛选竞赛列表，支持分页和标签/平台/状态筛选。"""
    competitions = get_all_competitions()

    if tag:
        competitions = [c for c in competitions if tag in c.get("tags", [])]
    if platform:
        competitions = [c for c in competitions if c.get("platform") == platform]
    if status:
        competitions = [c for c in competitions if _compute_status(c.get("end_date")) == status]

    competitions.sort(key=lambda c: c.get("date", ""), reverse=True)

    total = len(competitions)
    total_pages = max(1, ceil(total / page_size))
    start = (page - 1) * page_size
    end = start + page_size
    items = [CompetitionSummary(**_enrich(c)) for c in competitions[start:end]]

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=items,
    )

"""竞赛服务：加载 YAML → Pydantic 模型，支持筛选与分页。"""

from math import ceil

from app.schemas import CompetitionDetail, CompetitionSummary, PaginatedResponse
from app.core.config import load_yaml, load_competition_content


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
    return [CompetitionSummary(**c) for _, c in candidates[:4]]


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
        competitions = [c for c in competitions if c.get("status") == status]

    competitions.sort(key=lambda c: c.get("date", ""), reverse=True)

    total = len(competitions)
    total_pages = max(1, ceil(total / page_size))
    start = (page - 1) * page_size
    end = start + page_size
    items = [CompetitionSummary(**c) for c in competitions[start:end]]

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=items,
    )

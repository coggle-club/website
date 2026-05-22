"""教程服务：加载 YAML → Pydantic 模型，支持筛选、分页与系列导航。"""

from math import ceil

from app.schemas import PaginatedResponse, TutorialDetail, TutorialSummary
from app.core.config import load_yaml, load_tutorial_content


def get_all_tutorials() -> list[dict]:
    """加载教程原始数据。"""
    data = load_yaml("tutorials")
    assert isinstance(data, list), "tutorials.yaml must contain a list"
    return data


def _get_related(slug: str, tags: list[str]) -> list[TutorialSummary]:
    """基于同标签推荐相关教程（前 4 篇）。"""
    tutorials = get_all_tutorials()
    candidates = []
    for t in tutorials:
        if t["slug"] == slug:
            continue
        overlap = len(set(t.get("tags", [])) & set(tags))
        if overlap > 0:
            candidates.append((overlap, t))
    candidates.sort(key=lambda x: (-x[0], x[1].get("date", "")), reverse=False)
    candidates.sort(key=lambda x: -x[0])
    return [TutorialSummary(**t) for _, t in candidates[:4]]


def _merge_detail(slug: str, meta: dict) -> dict | None:
    """合并元数据与内容文件，构造 TutorialDetail 所需的完整 dict。"""
    content = load_tutorial_content(slug)
    if content is None:
        return None
    return {**meta, "content": content, "draft": meta.get("draft", False)}


def get_tutorial_by_slug(slug: str) -> TutorialDetail | None:
    """根据 slug 查找教程详情，包含系列导航（prev/next）。"""
    tutorials = get_all_tutorials()

    target = None
    for t in tutorials:
        if t["slug"] == slug:
            target = t
            break

    if target is None:
        return None

    merged = _merge_detail(slug, target)
    if merged is None:
        return None

    detail = TutorialDetail(**merged)

    # 系列导航
    if target.get("series"):
        series_name = target["series"]["name"]
        series_members = [
            t for t in tutorials
            if t.get("series") and t["series"]["name"] == series_name
        ]
        series_members.sort(key=lambda t: t["series"]["order"])

        current_order = target["series"]["order"]
        for i, member in enumerate(series_members):
            if member["series"]["order"] == current_order:
                if i > 0:
                    detail.prev = {
                        "slug": series_members[i - 1]["slug"],
                        "title": series_members[i - 1]["title"],
                    }
                if i < len(series_members) - 1:
                    detail.next = {
                        "slug": series_members[i + 1]["slug"],
                        "title": series_members[i + 1]["title"],
                    }
                break

    # 相关推荐
    detail.related = _get_related(slug, target.get("tags", []))

    return detail


def filter_tutorials(
    tag: str | None = None,
    difficulty: str | None = None,
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse:
    """筛选教程列表，支持分页和标签/难度筛选。"""
    tutorials = get_all_tutorials()

    if tag:
        tutorials = [t for t in tutorials if tag in t.get("tags", [])]
    if difficulty:
        tutorials = [t for t in tutorials if t.get("difficulty") == difficulty]

    tutorials.sort(key=lambda t: t.get("date", ""), reverse=True)

    total = len(tutorials)
    total_pages = max(1, ceil(total / page_size))
    start = (page - 1) * page_size
    end = start + page_size
    items = [TutorialSummary(**t) for t in tutorials[start:end]]

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=items,
    )

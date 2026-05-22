"""搜索服务：跨内容类型的简单文本搜索。"""

import time
from math import ceil

from app.schemas import SearchResponse, SearchResult
from app.core.config import load_yaml, load_blog_content, load_tutorial_content, load_model_content, load_competition_content


def _build_index() -> list[dict]:
    """构建搜索索引（跨 blog / tutorial / competition）。"""
    index = []

    for post in load_yaml("blog") or []:
        content = load_blog_content(post["slug"]) or ""
        index.append({
            "type": "blog",
            "slug": post["slug"],
            "title": post["title"],
            "description": post.get("description", ""),
            "tags": post.get("tags", []),
            "date": post.get("date", ""),
            "excerpt": content[:200],
        })

    for tut in load_yaml("tutorials") or []:
        content = load_tutorial_content(tut["slug"]) or ""
        index.append({
            "type": "tutorial",
            "slug": tut["slug"],
            "title": tut["title"],
            "description": tut.get("description", ""),
            "tags": tut.get("tags", []),
            "date": tut.get("date", ""),
            "excerpt": content[:200],
        })

    for comp in load_yaml("competitions") or []:
        content = load_competition_content(comp["slug"]) or ""
        index.append({
            "type": "competition",
            "slug": comp["slug"],
            "title": comp["title"],
            "description": comp.get("description", ""),
            "tags": comp.get("tags", []),
            "date": comp.get("date", ""),
            "excerpt": content[:200],
        })

    for model_entry in load_yaml("models") or []:
        content = load_model_content(model_entry["slug"]) or ""
        index.append({
            "type": "model",
            "slug": model_entry["slug"],
            "title": model_entry["name"],
            "description": model_entry.get("description", ""),
            "tags": model_entry.get("tags", []),
            "date": model_entry.get("date", ""),
            "excerpt": content[:200],
        })

    return index


def search_content(
    q: str,
    page: int = 1,
    page_size: int = 20,
) -> SearchResponse:
    """搜索内容，返回分页结果。"""
    start_time = time.time()
    q_lower = q.lower().strip()

    index = _build_index()
    results: list[SearchResult] = []

    for entry in index:
        score = 0.0

        # 标题匹配（权重最高）
        if q_lower in entry["title"].lower():
            score += 10.0

        # 描述匹配
        if q_lower in entry["description"].lower():
            score += 5.0

        # 标签匹配
        for tag in entry["tags"]:
            if q_lower in tag.lower():
                score += 3.0

        if score > 0:
            results.append(
                SearchResult(
                    type=entry["type"],
                    slug=entry["slug"],
                    title=entry["title"],
                    description=entry["description"],
                    tags=entry["tags"],
                    date=entry["date"],
                    score=score,
                )
            )

    # 按分数降序排列
    results.sort(key=lambda r: -r.score)

    total = len(results)
    total_pages = max(1, ceil(total / page_size))
    start = (page - 1) * page_size
    end = start + page_size
    page_results = results[start:end]

    took_ms = int((time.time() - start_time) * 1000)

    return SearchResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=page_results,
        query=q,
        results=page_results,
        took_ms=took_ms,
    )

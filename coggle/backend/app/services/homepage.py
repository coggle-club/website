"""首页服务：聚合博客、教程与竞赛数据。"""

from app.schemas import BlogPostSummary, HomepageResponse, TutorialSummary, CompetitionSummary
from app.core.config import load_yaml
from app.services.competition import _compute_status


def get_homepage() -> HomepageResponse:
    """构建首页聚合数据。"""
    # 最新博客（前 6 篇）
    blogs = load_yaml("blog") or []
    assert isinstance(blogs, list), "blog.yaml must contain a list"
    blogs.sort(key=lambda p: p.get("date", ""), reverse=True)
    recent_posts = [BlogPostSummary(**p) for p in blogs[:6]]

    # 精选教程（前 4 篇）
    tutorials = load_yaml("tutorials") or []
    assert isinstance(tutorials, list), "tutorials.yaml must contain a list"
    tutorials.sort(key=lambda t: t.get("date", ""), reverse=True)
    featured_tutorials = [TutorialSummary(**t) for t in tutorials[:4]]

    # 近期竞赛（前 4 个）
    competitions = load_yaml("competitions") or []
    assert isinstance(competitions, list), "competitions.yaml must contain a list"
    competitions.sort(key=lambda c: c.get("date", ""), reverse=True)
    recent_competitions = [
        CompetitionSummary(**{**c, "status": _compute_status(c.get("end_date"))})
        for c in competitions[:4]
    ]

    return HomepageResponse(
        recent_posts=recent_posts,
        featured_tutorials=featured_tutorials,
        recent_competitions=recent_competitions,
    )

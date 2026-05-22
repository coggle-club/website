"""项目核心配置：YAML 加载工具。"""

import time
from pathlib import Path
from typing import Any

import yaml

ROOT_DIR = Path(__file__).resolve().parents[4]
CONFIG_DIR = ROOT_DIR / "config"
BLOG_DIR = CONFIG_DIR / "blog"
TUTORIAL_DIR = CONFIG_DIR / "tutorials"
MODEL_DIR = CONFIG_DIR / "models"
COMPETITION_DIR = CONFIG_DIR / "competitions"
PAGE_DIR = CONFIG_DIR / "pages"

# 简单内存缓存：{key: (timestamp, data)}
_cache: dict[str, tuple[float, Any]] = {}
CACHE_TTL = 60  # 秒


def _cache_get(key: str) -> Any:
    """从缓存读取，过期则返回 None。"""
    entry = _cache.get(key)
    if entry is None:
        return None
    ts, data = entry
    if time.monotonic() - ts > CACHE_TTL:
        del _cache[key]
        return None
    return data


def _cache_set(key: str, data: Any) -> None:
    """写入缓存。"""
    _cache[key] = (time.monotonic(), data)


def load_yaml(filename: str) -> Any:
    """从 CONFIG_DIR 加载 YAML 文件（带 60s 缓存）。"""
    key = f"yaml:{filename}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = CONFIG_DIR / f"{filename}.yaml"
    with open(filepath) as f:
        data = yaml.safe_load(f)
    _cache_set(key, data)
    return data


def load_blog_content(slug: str) -> str | None:
    """从 blog/ 目录加载单篇博客的 Markdown 内容（带 60s 缓存）。"""
    key = f"blog:{slug}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = BLOG_DIR / f"{slug}.md"
    if not filepath.exists():
        _cache_set(key, None)
        return None
    data = filepath.read_text(encoding="utf-8")
    _cache_set(key, data)
    return data


def load_tutorial_content(slug: str) -> str | None:
    """从 tutorials/ 目录加载单篇教程的 Markdown 内容（带 60s 缓存）。"""
    key = f"tutorial:{slug}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = TUTORIAL_DIR / f"{slug}.md"
    if not filepath.exists():
        _cache_set(key, None)
        return None
    data = filepath.read_text(encoding="utf-8")
    _cache_set(key, data)
    return data


def load_model_content(slug: str) -> str | None:
    """从 models/ 目录加载单篇模型的 Markdown 介绍（带 60s 缓存）。"""
    key = f"model:{slug}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = MODEL_DIR / f"{slug}.md"
    if not filepath.exists():
        _cache_set(key, None)
        return None
    data = filepath.read_text(encoding="utf-8")
    _cache_set(key, data)
    return data


def load_competition_content(slug: str) -> str | None:
    """从 competitions/ 目录加载单篇竞赛的 Markdown 内容（带 60s 缓存）。"""
    key = f"competition:{slug}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = COMPETITION_DIR / f"{slug}.md"
    if not filepath.exists():
        _cache_set(key, None)
        return None
    data = filepath.read_text(encoding="utf-8")
    _cache_set(key, data)
    return data


def load_page_content(slug: str) -> str | None:
    """从 pages/ 目录加载单篇通用页面的 Markdown 内容（带 60s 缓存）。"""
    key = f"page:{slug}"
    cached = _cache_get(key)
    if cached is not None:
        return cached
    filepath = PAGE_DIR / f"{slug}.md"
    if not filepath.exists():
        _cache_set(key, None)
        return None
    data = filepath.read_text(encoding="utf-8")
    _cache_set(key, data)
    return data

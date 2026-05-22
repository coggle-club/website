"""测试共享夹具：加载 config YAML 数据。"""

from pathlib import Path

import pytest
import yaml

# 项目根目录（coggle-website）
ROOT = Path(__file__).resolve().parents[4]
CONFIG_DIR = ROOT / "config"


def _load(name: str):
    with open(CONFIG_DIR / f"{name}.yaml") as f:
        return yaml.safe_load(f)


@pytest.fixture
def links_data() -> list[dict]:
    return _load("links")


@pytest.fixture
def apps_data() -> list[dict]:
    return _load("apps")


@pytest.fixture
def blog_data() -> list[dict]:
    return _load("blog")


@pytest.fixture
def tutorials_data() -> list[dict]:
    return _load("tutorials")


@pytest.fixture
def competitions_data() -> list[dict]:
    return _load("competitions")


@pytest.fixture
def pages_data() -> list[dict]:
    return _load("pages")


@pytest.fixture
def models_data() -> list[dict]:
    return _load("models")

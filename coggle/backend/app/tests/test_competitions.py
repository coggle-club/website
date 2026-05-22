"""竞赛配置数据测试。"""

from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from ..main import app
from ..schemas import CompetitionSummary
from ..services.competition import _compute_status

COMPETITION_DIR = Path(__file__).resolve().parents[4] / "config" / "competitions"


@pytest.fixture
def client():
    return TestClient(app)


class TestCompetitions:
    """验证 config/competitions.json 数据完整性。"""

    def test_load(self, competitions_data):
        """每个竞赛必须包含必要字段。"""
        for c in competitions_data:
            assert c["slug"]
            assert c.get("platform"), f"{c['slug']} 缺少 platform"

    def test_status_computed_correctly(self, competitions_data):
        """status 应根据 end_date 自动计算。"""
        for c in competitions_data:
            status = _compute_status(c.get("end_date"))
            assert status in ("ongoing", "ended")

    def test_ongoing_has_end_date(self, competitions_data):
        """进行中的竞赛应有 end_date。"""
        for c in competitions_data:
            status = _compute_status(c.get("end_date"))
            if status == "ongoing":
                assert c.get("end_date"), f"{c['slug']} 进行中但无结束日期"

    def test_summary_schema(self, competitions_data):
        """每个竞赛应能通过 CompetitionSummary 校验。"""
        for c in competitions_data:
            CompetitionSummary(**c)

    def test_content_files_exist(self, competitions_data):
        """每个竞赛应有对应的 .md 内容文件。"""
        for c in competitions_data:
            filepath = COMPETITION_DIR / f"{c['slug']}.md"
            assert filepath.exists(), f"缺少 competitions/{c['slug']}.md"

    def test_content_files_have_content(self, competitions_data):
        """每个竞赛的 .md 文件应有内容。"""
        for c in competitions_data:
            filepath = COMPETITION_DIR / f"{c['slug']}.md"
            content = filepath.read_text(encoding="utf-8")
            assert content, f"competitions/{c['slug']}.md 为空"

    def test_detail_api_returns_content(self, client, competitions_data):
        """竞赛详情 API 应返回 content 字段。"""
        for c in competitions_data:
            resp = client.get(f"/api/competitions/{c['slug']}")
            assert resp.status_code == 200
            data = resp.json()
            assert "content" in data
            assert len(data["content"]) > 0

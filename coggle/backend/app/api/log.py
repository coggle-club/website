"""日志收集 API：接收前端日志并写入独立文件。"""

import logging
from pathlib import Path
from logging.handlers import RotatingFileHandler

from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter(prefix="/api/logs", tags=["日志"])

# 前端日志独立文件：logs/coggle-frontend.log
LOG_DIR = Path(__file__).resolve().parents[4] / "logs"
LOG_DIR.mkdir(exist_ok=True)

_frontend_logger = logging.getLogger("coggle.frontend")
_frontend_logger.setLevel(logging.INFO)
if not _frontend_logger.handlers:
    handler = RotatingFileHandler(
        LOG_DIR / "coggle-frontend.log",
        maxBytes=10 * 1024 * 1024,
        backupCount=5,
        encoding="utf-8",
    )
    handler.setLevel(logging.INFO)
    handler.setFormatter(logging.Formatter(
        "[%(asctime)s] %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    ))
    _frontend_logger.addHandler(handler)


class LogEntry(BaseModel):
    level: str = "INFO"
    message: str


@router.post("")
def write_log(entry: LogEntry, request: Request):
    """接收前端日志，写入 logs/coggle-frontend.log。"""
    client_host = request.client.host if request.client else "unknown"
    level = entry.level.upper()
    log_fn = {
        "ERROR": _frontend_logger.error,
        "WARNING": _frontend_logger.warning,
    }.get(level, _frontend_logger.info)
    log_fn("%s | ip: %s", entry.message, client_host)
    return {"ok": True}

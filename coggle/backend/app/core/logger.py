"""日志工具：为每个 API 请求添加访问日志。"""
import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler

# 日志目录：coggle-website/logs/
LOG_DIR = Path(__file__).resolve().parents[4] / "logs"
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / "coggle-api.log"

# 配置根日志器
logger = logging.getLogger("coggle.api")
logger.setLevel(logging.INFO)

if not logger.handlers:
    # 终端输出
    console = logging.StreamHandler(sys.stdout)
    console.setLevel(logging.INFO)
    console.setFormatter(logging.Formatter(
        "[%(asctime)s] %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    ))
    logger.addHandler(console)

    # 文件输出（10MB 滚动）
    file_handler = RotatingFileHandler(
        LOG_FILE, maxBytes=10 * 1024 * 1024, backupCount=5, encoding="utf-8",
    )
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter(
        "[%(asctime)s] %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    ))
    logger.addHandler(file_handler)

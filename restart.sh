#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# restart.sh — 重启前后端服务
# 先停止，再启动
#
# 用法:
#   ./restart.sh            开发模式重启
#   ./restart.sh prod       生产模式重启（build + 启动）
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
MODE="${1:-dev}"

echo "=========================================="
echo "  重启服务 (${MODE})"
echo "=========================================="

"$ROOT_DIR/stop.sh"
echo ""
"$ROOT_DIR/start.sh" "$MODE"

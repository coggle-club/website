#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# stop.sh — 停止前后端服务
# 查找并终止 uvicorn (后端) 和 next (前端) 进程
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  停止服务"
echo "=========================================="

# 终止 uvicorn 进程（后端）
UVICORN_PIDS=$(lsof -ti:8000 2>/dev/null || true)
if [ -n "$UVICORN_PIDS" ]; then
  echo -e "  终止后端 (PID: $(echo $UVICORN_PIDS | tr '\n' ' '))"
  kill $UVICORN_PIDS 2>/dev/null || true
  sleep 1
  # 强制终止如果还在运行
  STILL_RUNNING=$(lsof -ti:8000 2>/dev/null || true)
  if [ -n "$STILL_RUNNING" ]; then
    echo -e "  ${YELLOW}强制终止后端...${NC}"
    kill -9 $STILL_RUNNING 2>/dev/null || true
  fi
  echo -e "  ${GREEN}✓${NC} 后端已停止"
else
  echo -e "  ${YELLOW}-${NC} 后端未运行"
fi

# 终止 Next.js 进程（前端）
NEXT_PIDS=$(lsof -ti:8001 2>/dev/null || true)
if [ -n "$NEXT_PIDS" ]; then
  echo -e "  终止前端 (PID: $(echo $NEXT_PIDS | tr '\n' ' '))"
  kill $NEXT_PIDS 2>/dev/null || true
  sleep 1
  STILL_RUNNING=$(lsof -ti:8001 2>/dev/null || true)
  if [ -n "$STILL_RUNNING" ]; then
    echo -e "  ${YELLOW}强制终止前端...${NC}"
    kill -9 $STILL_RUNNING 2>/dev/null || true
  fi
  echo -e "  ${GREEN}✓${NC} 前端已停止"
else
  echo -e "  ${YELLOW}-${NC} 前端未运行"
fi

echo ""
echo -e "${GREEN}完成${NC}"

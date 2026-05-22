#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# start.sh — 前后端启动脚本
# 启动后端 (FastAPI :8000) + 前端 (Next.js :8001)
#
# 用法:
#   ./start.sh             开发模式（前后台启动）
#   ./start.sh prod        生产模式（先 build 再启动）
#   ./start.sh check       只检测环境，不启动
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT_DIR/coggle/backend"
FRONTEND_DIR="$ROOT_DIR/coggle/frontend"
MODE="${1:-dev}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

cleanup() {
  echo ""
  echo -e "${YELLOW}正在停止服务...${NC}"
  [ -n "${BACKEND_PID:-}" ] && kill "$BACKEND_PID" 2>/dev/null || true
  [ -n "${FRONTEND_PID:-}" ] && kill "$FRONTEND_PID" 2>/dev/null || true
  echo -e "${GREEN}已停止${NC}"
  exit 0
}
trap cleanup SIGINT SIGTERM

# ---- 环境检测 ----
echo "=========================================="
echo "  环境检测"
echo "=========================================="
$ROOT_DIR/start_before.sh || {
  echo -e "${RED}环境检测失败，请修复后重试${NC}"
  exit 1
}

# ---- 检查端口 ----
for port in 8000 8001; do
  if lsof -ti:"$port" > /dev/null 2>&1; then
    echo -e "${RED}端口 $port 已被占用，请先释放${NC}"
    exit 1
  fi
done

# ---- 启动后端 ----
echo ""
echo "=========================================="
echo "  启动后端 (FastAPI) — 端口 8000"
echo "=========================================="
PYTHONPATH="$BACKEND_DIR" uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
echo -e "  PID: ${GREEN}$BACKEND_PID${NC}"

# 等待后端就绪
echo -n "  等待后端就绪"
for i in $(seq 1 30); do
  if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo -e "\n  ${GREEN}✓${NC} 后端已就绪"
    break
  fi
  echo -n "."
  sleep 1
done

# ---- 启动前端 ----
echo ""
echo "=========================================="
echo "  启动前端 (Next.js) — 端口 8001"
echo "=========================================="

cd "$FRONTEND_DIR"

if [ "$MODE" = "prod" ]; then
  echo "  生产模式: 先 build..."
  npm run build
  npm run start -- --port 8001 &
else
  echo "  开发模式"
  npm run dev -- --port 8001 &
fi

FRONTEND_PID=$!
echo -e "  PID: ${GREEN}$FRONTEND_PID${NC}"

cd "$ROOT_DIR"

# ---- 等待前端就绪 ----
echo -n "  等待前端就绪"
for i in $(seq 1 60); do
  if curl -s http://localhost:8001 > /dev/null 2>&1; then
    echo -e "\n  ${GREEN}✓${NC} 前端已就绪"
    break
  fi
  echo -n "."
  sleep 2
done

echo ""
echo "=========================================="
echo -e "  ${GREEN}所有服务已启动${NC}"
echo "  后端: http://localhost:8000"
echo "  前端: http://localhost:8001"
echo "  API 文档: http://localhost:8000/docs"
echo "=========================================="
echo ""
echo "按 Ctrl+C 停止所有服务"

# 前台等待
wait

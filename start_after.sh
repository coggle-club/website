#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# start_after.sh — 启动后检测
# 检查后端 API、前端页面、关键接口是否正常响应
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if eval "$@" > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} $desc"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $desc"
    FAIL=$((FAIL + 1))
  fi
}

check_status() {
  local desc="$1"
  local expected="$2"
  shift 2
  local actual
  actual=$(eval "$@" 2>/dev/null || echo "N/A")
  if [ "$actual" = "$expected" ]; then
    echo -e "  ${GREEN}✓${NC} $desc ($actual)"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $desc (期望 $expected, 实际 $actual)"
    FAIL=$((FAIL + 1))
  fi
}

echo "=========================================="
echo "  启动后检测"
echo "=========================================="
echo ""

echo "--- 后端基础 ---"
check "后端健康检查"           "curl -sf http://localhost:8000/api/health"
check_status "健康检查状态码"  200 "curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/api/health"

echo ""
echo "--- 后端 API 端点 ---"
check "GET /api/blog"                "curl -sf http://localhost:8000/api/blog > /dev/null"
check "GET /api/blog/tags"           "curl -sf http://localhost:8000/api/blog/tags > /dev/null"
check "GET /api/tutorials"           "curl -sf http://localhost:8000/api/tutorials > /dev/null"
check "GET /api/competitions"        "curl -sf http://localhost:8000/api/competitions > /dev/null"
check "GET /api/links"               "curl -sf http://localhost:8000/api/links > /dev/null"
check "GET /api/stats"               "curl -sf http://localhost:8000/api/stats > /dev/null"
check "GET /api/apps"                "curl -sf http://localhost:8000/api/apps > /dev/null"
check "GET /api/homepage"            "curl -sf http://localhost:8000/api/homepage > /dev/null"
check "GET /api/search?q=test"       "curl -sf 'http://localhost:8000/api/search?q=test' > /dev/null"

echo ""
echo "--- 前端 ---"
check "前端首页响应"            "curl -sf http://localhost:8001 > /dev/null"
check_status "前端首页状态码"   200 "curl -s -o /dev/null -w '%{http_code}' http://localhost:8001"

echo ""
echo "--- 前端页面 ---"
check "博客页"                  "curl -sf http://localhost:8001/blog > /dev/null"
check "教程页"                  "curl -sf http://localhost:8001/tutorials > /dev/null"
check "竞赛页"                  "curl -sf http://localhost:8001/competitions > /dev/null"
check "链接页"                  "curl -sf http://localhost:8001/links > /dev/null"
check "工具页"                  "curl -sf http://localhost:8001/tools > /dev/null"
check "模型页"                  "curl -sf http://localhost:8001/models > /dev/null"

echo ""
echo "--- 后端日志（检查最近是否有错误） ---"
LOG_FILE="$ROOT_DIR/logs/coggle-backend.log"
if [ -f "$LOG_FILE" ]; then
  RECENT_ERRORS=$(grep -c "ERROR" "$LOG_FILE" 2>/dev/null || echo 0)
  echo -e "  最近错误数: ${YELLOW}$RECENT_ERRORS${NC}"
else
  echo -e "  ${YELLOW}日志文件不存在: $LOG_FILE${NC}"
fi

echo ""
echo "=========================================="
echo -e "  结果: ${GREEN}${PASS} 通过${NC}, ${RED}${FAIL} 失败${NC}"
echo "=========================================="

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

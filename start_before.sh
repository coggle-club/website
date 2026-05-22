#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# start_before.sh — 启动前环境检测
# 检查依赖、端口、配置文件是否就绪
# ============================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
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

echo "=========================================="
echo "  环境检测"
echo "=========================================="
echo ""

echo "--- Python ---"
check "Python 3.12+"         "python3 --version 2>&1 | grep -qE '^Python 3.1[2-9]'"
check "uvicorn 可用"          "python3 -c 'import uvicorn'"
check "fastapi 已安装"        "python3 -c 'import fastapi'"
check "pyyaml 已安装"         "python3 -c 'import yaml'"
check "pydantic 已安装"       "python3 -c 'import pydantic'"

echo ""
echo "--- Node.js ---"
check "Node.js 18+"           "node --version 2>&1 | grep -qE '^v(1[89]|2[0-9])'"
check "npm 可用"              "npm --version > /dev/null"

echo ""
echo "--- 配置文件 ---"
check "config/blog.yaml"      "test -f config/blog.yaml"
check "config/tutorials.yaml" "test -f config/tutorials.yaml"
check "config/competitions.yaml" "test -f config/competitions.yaml"
check "config/links.yaml"     "test -f config/links.yaml"
# config/stats.yaml 由后端服务内部生成
check "config/apps.yaml"      "test -f config/apps.yaml"
check "config/pages.yaml"     "test -f config/pages.yaml"
check "config/models.yaml"    "test -f config/models.yaml"
check "config/blog/ 目录"     "test -d config/blog"
check "docs/ 目录"            "test -d docs"

echo ""
echo "--- 前端依赖 ---"
check "frontend/node_modules 已安装" "test -d coggle/frontend/node_modules"
check "next 可用"                    "test -d coggle/frontend/node_modules/next"

echo ""
echo "--- 端口占用（警告，不阻塞） ---"
if lsof -ti:8000 > /dev/null 2>&1; then
  echo -e "  ${YELLOW}⚠ 端口 8000 已被占用${NC}"
fi
if lsof -ti:8001 > /dev/null 2>&1; then
  echo -e "  ${YELLOW}⚠ 端口 8001 已被占用${NC}"
fi
if ! lsof -ti:8000 > /dev/null 2>&1 && ! lsof -ti:8001 > /dev/null 2>&1; then
  echo -e "  ${GREEN}✓${NC} 8000 和 8001 端口均空闲"
fi

echo ""
echo "=========================================="
echo -e "  结果: ${GREEN}${PASS} 通过${NC}, ${RED}${FAIL} 失败${NC}"
echo "=========================================="

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

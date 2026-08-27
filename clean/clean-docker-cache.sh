#!/bin/bash

set -u

if [[ -z "${BASH_VERSION:-}" ]]; then
  echo "错误：请使用 bash 或直接执行此脚本，不要使用 sh。" >&2
  echo "正确示例：bash $0" >&2
  exit 2
fi

DOCKER_DATA="$HOME/Library/Containers/com.docker.docker"
MODE="preview"

if [[ "${1:-}" == "--execute" ]]; then
  MODE="execute"
elif [[ $# -gt 0 ]]; then
  echo "用法：$0 [--execute]"
  echo "不带参数时仅预览；添加 --execute 才会清理。"
  exit 2
fi

format_kib() {
  awk -v kib="$1" 'BEGIN {
    split("KiB MiB GiB TiB", units, " ")
    value = kib
    unit = 1
    while (value >= 1024 && unit < 4) { value /= 1024; unit++ }
    printf "%.2f %s", value, units[unit]
  }'
}

docker_data_kib() {
  if [[ -d "$DOCKER_DATA" ]]; then
    du -sk "$DOCKER_DATA" 2>/dev/null | awk '{print $1}'
  else
    echo 0
  fi
}

echo "Docker 安全清理"
echo "================="

if ! command -v docker >/dev/null 2>&1; then
  echo "错误：未找到 docker 命令。" >&2
  exit 1
fi

DOCKER_RUNNING=1
if ! docker info >/dev/null 2>&1; then
  DOCKER_RUNNING=0
fi

BEFORE_DATA_KIB=$(docker_data_kib)
BEFORE_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')

echo "清理前 Docker 数据：$(format_kib "$BEFORE_DATA_KIB")"
echo "清理前磁盘可用：  $(format_kib "$BEFORE_AVAILABLE_KIB")"
echo
if [[ $DOCKER_RUNNING -eq 1 ]]; then
  docker system df
else
  echo "Docker Desktop 当前未运行，无法读取镜像、容器和构建缓存明细。"
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有删除任何 Docker 数据。"
  echo "执行时只清理停止的容器、未使用网络、悬空镜像和构建缓存。"
  echo "不会删除 Volume，也不会使用 docker system prune -a。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

if [[ $DOCKER_RUNNING -eq 0 ]]; then
  echo
  echo "错误：执行清理前请先启动 Docker Desktop，等待其完全就绪后重试。" >&2
  echo "脚本不会在 Docker 关闭时直接删除 Docker 数据目录。" >&2
  exit 1
fi

echo
read -r -p "确认执行 docker system prune？输入 yes 继续：" answer
if [[ "$answer" != "yes" ]]; then
  echo "已取消，没有删除任何 Docker 数据。"
  exit 0
fi

docker system prune -f

AFTER_DATA_KIB=$(docker_data_kib)
AFTER_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')
RELEASED_KIB=$((AFTER_AVAILABLE_KIB - BEFORE_AVAILABLE_KIB))

echo
echo "清理后 Docker 数据：$(format_kib "$AFTER_DATA_KIB")"
echo "清理后磁盘可用：  $(format_kib "$AFTER_AVAILABLE_KIB")"
echo "磁盘实际增加：    $(format_kib "$RELEASED_KIB")"

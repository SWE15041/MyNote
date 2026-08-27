#!/bin/bash

set -u

if [[ -z "${BASH_VERSION:-}" ]]; then
  echo "错误：请使用 bash 或直接执行此脚本，不要使用 sh。" >&2
  exit 2
fi

# 只清理可重新生成或下载的开发工具缓存，不触碰项目、配置和凭据。
TARGETS=(
  "$HOME/.gradle/caches"
  "$HOME/.gradle/daemon"
  "$HOME/.gradle/.tmp"
  "$HOME/.gradle/wrapper/dists"
  "$HOME/.m2/repository"
  "$HOME/.cache/codex-runtimes"
  "$HOME/.cache/puppeteer"
  "$HOME/.npm/_cacache"
  "$HOME/.npm/_npx"
)

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

target_size_kib() {
  local total=0 target size
  for target in "${TARGETS[@]}"; do
    if [[ -e "$target" ]]; then
      size=$(du -sk "$target" 2>/dev/null | awk '{print $1}')
      total=$((total + ${size:-0}))
    fi
  done
  echo "$total"
}

tools_running() {
  pgrep -f "GradleDaemon" >/dev/null 2>&1 || \
    pgrep -f "[m]vn" >/dev/null 2>&1 || \
    pgrep -x "Codex" >/dev/null 2>&1
}

echo "开发工具缓存安全清理"
echo "===================="

BEFORE_TARGET_KIB=$(target_size_kib)
BEFORE_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')

echo "清理前目标缓存：$(format_kib "$BEFORE_TARGET_KIB")"
echo "清理前磁盘可用：$(format_kib "$BEFORE_AVAILABLE_KIB")"
echo

FOUND=0
for target in "${TARGETS[@]}"; do
  if [[ -e "$target" ]]; then
    size=$(du -sh "$target" 2>/dev/null | awk '{print $1}')
    printf '%8s  %s\n' "${size:-未知}" "$target"
    FOUND=1
  fi
done

if [[ $FOUND -eq 0 ]]; then
  echo "没有发现可清理的开发工具缓存。"
  exit 0
fi

if tools_running; then
  echo
  echo "提示：检测到 Gradle、Maven 或 Codex 相关进程正在运行。"
  if [[ "$MODE" == "execute" ]]; then
    echo "错误：请先停止构建任务并完全退出 Codex，再重新执行。" >&2
    exit 1
  fi
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有删除任何文件。"
  echo "清理后首次构建或启动可能重新下载依赖。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

echo
read -r -p "确认清理以上开发工具缓存？输入 yes 继续：" answer
if [[ "$answer" != "yes" ]]; then
  echo "已取消，没有删除任何文件。"
  exit 0
fi

for target in "${TARGETS[@]}"; do
  if [[ -e "$target" ]]; then
    rm -rf -- "$target"
    echo "已清理：$target"
  fi
done

AFTER_TARGET_KIB=$(target_size_kib)
AFTER_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')
RELEASED_KIB=$((AFTER_AVAILABLE_KIB - BEFORE_AVAILABLE_KIB))

echo
echo "清理完成。"
echo "清理后目标缓存：$(format_kib "$AFTER_TARGET_KIB")"
echo "清理后磁盘可用：$(format_kib "$AFTER_AVAILABLE_KIB")"
echo "磁盘实际增加：  $(format_kib "$RELEASED_KIB")"

#!/bin/bash

set -u

# 只清理可重新生成的 Chrome 缓存，不触碰 Profile、Cookie、密码、书签和历史记录。
TARGETS=(
  "$HOME/Library/Caches/Google/Chrome"
  "$HOME/Library/Application Support/Google/Chrome/OptGuideOnDeviceModel"
  "$HOME/Library/Application Support/Google/GoogleUpdater/crx_cache"
  "$HOME/Library/Application Support/Google/Chrome/extensions_crx_cache"
  "$HOME/Library/Application Support/Google/Chrome/component_crx_cache"
)

MODE="preview"
if [[ "${1:-}" == "--execute" ]]; then
  MODE="execute"
elif [[ $# -gt 0 ]]; then
  echo "用法：$0 [--execute]"
  echo "不带参数时仅预览；添加 --execute 才会清理。"
  exit 2
fi

echo "Chrome 安全缓存清理"
echo "===================="

format_kib() {
  awk -v kib="$1" 'BEGIN {
    split("KiB MiB GiB TiB", units, " ")
    value = kib
    unit = 1
    while (value >= 1024 && unit < 4) {
      value /= 1024
      unit++
    }
    printf "%.2f %s", value, units[unit]
  }'
}

target_size_kib() {
  local total=0
  local target
  local size
  for target in "${TARGETS[@]}"; do
    if [[ -e "$target" ]]; then
      size=$(du -sk "$target" 2>/dev/null | awk '{print $1}')
      total=$((total + ${size:-0}))
    fi
  done
  echo "$total"
}

if pgrep -x "Google Chrome" >/dev/null 2>&1; then
  echo "错误：Google Chrome 仍在运行。请先使用 Command+Q 完全退出。" >&2
  exit 1
fi

FOUND=0
BEFORE_TARGET_KIB=$(target_size_kib)
BEFORE_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')

echo "清理前目标缓存：$(format_kib "$BEFORE_TARGET_KIB")"
echo "清理前磁盘可用：$(format_kib "$BEFORE_AVAILABLE_KIB")"
echo

for target in "${TARGETS[@]}"; do
  if [[ -e "$target" ]]; then
    size=$(du -sh "$target" 2>/dev/null | awk '{print $1}')
    printf '%8s  %s\n' "${size:-未知}" "$target"
    FOUND=1
  fi
done

if [[ $FOUND -eq 0 ]]; then
  echo "没有发现可清理的目标。"
  exit 0
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有删除任何文件。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

echo
read -r -p "确认清理以上缓存？输入 yes 继续：" answer
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

echo
echo "清理完成。Chrome 可能会按需重新下载模型或组件。"
AFTER_TARGET_KIB=$(target_size_kib)
AFTER_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')
RELEASED_KIB=$((AFTER_AVAILABLE_KIB - BEFORE_AVAILABLE_KIB))

echo "清理后目标缓存：$(format_kib "$AFTER_TARGET_KIB")"
echo "清理后磁盘可用：$(format_kib "$AFTER_AVAILABLE_KIB")"
echo "磁盘实际增加：  $(format_kib "$RELEASED_KIB")"

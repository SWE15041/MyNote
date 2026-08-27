#!/bin/bash

set -u

# 只清理可重建缓存，不触碰聊天数据库、附件目录、配置和账号数据。
TARGETS=(
  "$HOME/Library/Containers/com.tencent.xinWeChat/Data/Library/Caches"
  "$HOME/Library/Containers/com.tencent.xinWeChat/Data/.wxapplet"
  "$HOME/Library/Containers/com.tencent.qq/Data/Library/Caches"
  "$HOME/Library/Containers/com.tencent.qq/Data/tmp"
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

apps_running() {
  pgrep -x "WeChat" >/dev/null 2>&1 || pgrep -x "QQ" >/dev/null 2>&1
}

echo "微信 / QQ 缓存安全清理"
echo "========================"

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
  echo "没有发现可清理的微信或 QQ 缓存。"
  exit 0
fi

if apps_running; then
  echo
  echo "提示：检测到微信或 QQ 正在运行。"
  if [[ "$MODE" == "execute" ]]; then
    echo "错误：请先使用 Command+Q 完全退出微信和 QQ。" >&2
    exit 1
  fi
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有删除任何文件。"
  echo "不会删除聊天记录、下载附件、账号数据或应用配置。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

echo
read -r -p "确认清理以上微信和 QQ 缓存？输入 yes 继续：" answer
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

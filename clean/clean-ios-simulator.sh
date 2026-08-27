#!/bin/bash

set -u

# 仅清理系统级 iOS Simulator Runtime 镜像，不触碰项目源码和用户文档。
TARGET="/Library/Developer/CoreSimulator/Images"
EXPECTED_TARGET="/Library/Developer/CoreSimulator/Images"

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
    while (value >= 1024 && unit < 4) {
      value /= 1024
      unit++
    }
    printf "%.2f %s", value, units[unit]
  }'
}

target_size_kib() {
  if [[ -d "$TARGET" ]]; then
    du -sk "$TARGET" 2>/dev/null | awk '{print $1}'
  else
    echo 0
  fi
}

echo "iOS Simulator Runtime 安全清理"
echo "=============================="

if pgrep -x "Xcode" >/dev/null 2>&1 || \
   pgrep -x "Simulator" >/dev/null 2>&1; then
  echo "错误：Xcode 或 Simulator 仍在运行。" >&2
  echo "请退出 Xcode 和 Simulator 后重试。" >&2
  exit 1
fi

# 硬编码路径校验，防止脚本被误改后删除错误目录。
if [[ "$TARGET" != "$EXPECTED_TARGET" ]]; then
  echo "错误：目标目录安全校验失败。" >&2
  exit 1
fi

BEFORE_TARGET_KIB=$(target_size_kib)
BEFORE_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')

echo "清理目标：        $TARGET"
echo "清理前镜像大小：$(format_kib "$BEFORE_TARGET_KIB")"
echo "清理前磁盘可用：$(format_kib "$BEFORE_AVAILABLE_KIB")"

if [[ ! -d "$TARGET" || "$BEFORE_TARGET_KIB" -eq 0 ]]; then
  echo "没有发现可清理的 Simulator Runtime 镜像。"
  exit 0
fi

echo
echo "注意：清理后，如需使用 iOS Simulator，必须通过 Xcode 重新下载 Runtime。"

if xcrun --find simctl >/dev/null 2>&1; then
  echo "检测到 simctl。建议优先在 Xcode > Settings > Platforms 中卸载不用的 Runtime。"
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有删除任何文件。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

echo
read -r -p "确认删除全部 iOS Simulator Runtime 镜像？输入 yes 继续：" answer
if [[ "$answer" != "yes" ]]; then
  echo "已取消，没有删除任何文件。"
  exit 0
fi

sudo rm -rf -- "$TARGET"

AFTER_TARGET_KIB=$(target_size_kib)
AFTER_AVAILABLE_KIB=$(df -k /System/Volumes/Data | awk 'NR == 2 {print $4}')
RELEASED_KIB=$((AFTER_AVAILABLE_KIB - BEFORE_AVAILABLE_KIB))

echo
echo "清理完成。"
echo "清理后镜像大小：$(format_kib "$AFTER_TARGET_KIB")"
echo "清理后磁盘可用：$(format_kib "$AFTER_AVAILABLE_KIB")"
echo "磁盘实际增加：  $(format_kib "$RELEASED_KIB")"

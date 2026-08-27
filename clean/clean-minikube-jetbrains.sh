#!/bin/bash

set -u

MODE="preview"
if [[ "${1:-}" == "--execute" ]]; then
  MODE="execute"
elif [[ $# -gt 0 ]]; then
  echo "用法：$0 [--execute]"
  exit 2
fi

# Minikube 缓存可以重新下载，不包含集群配置和业务数据。
TARGETS=(
  "$HOME/.minikube/cache"
)

echo "Minikube 缓存清理"
echo "================="

FOUND=0
for target in "${TARGETS[@]}"; do
  if [[ -e "$target" ]]; then
    size=$(du -sh "$target" 2>/dev/null | awk '{print $1}')
    printf '%8s  %s\n' "${size:-未知}" "$target"
    FOUND=1
  fi
done

if [[ $FOUND -eq 0 ]]; then
  echo "没有发现目标目录。"
  exit 0
fi

if [[ "$MODE" == "preview" ]]; then
  echo
  echo "当前为预览模式，没有修改任何文件。"
  echo "确认后运行：$0 --execute"
  exit 0
fi

if pgrep -f "[m]inikube" >/dev/null 2>&1; then
  echo "错误：请先停止正在运行的 Minikube 操作。" >&2
  exit 1
fi

echo
read -r -p "输入 yes，将以上目录移动到废纸篓：" answer
if [[ "$answer" != "yes" ]]; then
  echo "已取消，没有修改任何文件。"
  exit 0
fi

cleanup_stamp=$(date +%Y%m%d-%H%M%S)
trash_root="$HOME/.Trash/minikube-cache-$cleanup_stamp"
mkdir -p "$trash_root"

for target in "${TARGETS[@]}"; do
  if [[ ! -e "$target" ]]; then
    continue
  fi

  # 保留原始目录结构，避免不同来源的同名目录相互覆盖。
  relative_path=${target#"$HOME"/}
  destination="$trash_root/$relative_path"
  mkdir -p "$(dirname "$destination")"
  mv "$target" "$destination"
  echo "已移动：$target"
done

echo
echo "已移动到：$trash_root"
echo "确认相关工具正常后，可在 Finder 中清空废纸篓。"

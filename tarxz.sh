#!/bin/bash
if [ "$#" -gt 0 ]; then
  # 获取最后一个参数,参数放在前面，要打包的路径放在最后
  allarg="$*"
  last_arg="${!#}"
  if [[ "$last_arg" == "." || "$last_arg" == ".." ]]; then
    echo "请勿打包 . .. 目录，会导致产生的压缩文件被打包，造成问题"
    exit 1
  fi
  target_dir=$(dirname "${!#}")
  target=$(basename "${!#}")
  suffix_to_remove=" $last_arg"
  para="${allarg%$suffix_to_remove}"
else
  echo "参数放在前面，要打包的路径放在最后"
fi
#echo "para is $para"
#echo "XZ_OPT='-T 0' tar -C \"$target_dir\" $para -cvJf $target.tar.xz $target"
XZ_OPT='-T 0' tar -C "$target_dir" $para -cvJf $target.tar.xz $target
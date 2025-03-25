#!/bin/bash
target_dir=$(dirname "$1")
target=$(basename "$1")

tar -C "$target_dir" -cvf - "$target" | xz -T 0 -c > "${target}.tar.xz"
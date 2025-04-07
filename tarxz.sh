#!/bin/bash
target_dir=$(dirname "$1")
target=$(basename "$1")
XZ_OPT='-T 0' tar -cvJf $target.tar.xz  $1 

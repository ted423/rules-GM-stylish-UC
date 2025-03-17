#!/bin/bash
file=$(basename $1)
tar -cvf - $1 | xz -T 0 -c > $file.tar.xz

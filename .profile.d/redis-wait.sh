#!/usr/bin/env bash

# Fail immediately on non-zero exit code.
set -e
# Fail immediately on non-zero exit code within a pipeline.
set -o pipefail
# Fail on undeclared variables.
set -u

SRC_DIR=$(pwd)

eval $SRC_DIR/.profile.d/redis-wait

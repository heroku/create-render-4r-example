#!/usr/bin/env bash

# Fail immediately on non-zero exit code.
set -e
# Fail immediately on non-zero exit code within a pipeline.
set -o pipefail
# Fail on undeclared variables.
set -u

BIN_DIR=$(cd "$(dirname "$0")"; pwd)

eval $BIN_DIR/redis-wait

#!/bin/bash
set -e

IFS="/" read -r GROUP FUNC <<< "$1"
DEST="$2"

mkdir -p "src/$DEST"
git mv "src/$GROUP/$FUNC.ts" "src/$DEST/$FUNC.ts"

mkdir -p "docs/$DEST"
git mv "docs/$GROUP/$FUNC.mdx" "docs/$DEST/$FUNC.mdx"

mkdir -p "benchmarks/$DEST"
git mv "benchmarks/$GROUP/$FUNC.bench.ts" "benchmarks/$DEST/$FUNC.bench.ts"

mkdir -p "tests/$DEST"
git mv "tests/$GROUP/$FUNC.test.ts" "tests/$DEST/$FUNC.test.ts"

echo "WARNING: You need to update src/mod.ts to export $FUNC"

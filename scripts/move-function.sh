#!/bin/bash
set -e

IFS="/" read -r GROUP FUNC <<< "$1"
DEST="$2"
DEST_FUNC="$FUNC"

# If DEST contains /, update DEST_FUNC and DEST.
if [[ "$DEST" == */* ]]; then
  IFS="/" read -r DEST DEST_FUNC <<< "$DEST"
fi

mkdir -p "src/$DEST"
git mv "src/$GROUP/$FUNC.ts" "src/$DEST/$DEST_FUNC.ts"

mkdir -p "docs/$DEST"
git mv "docs/$GROUP/$FUNC.mdx" "docs/$DEST/$DEST_FUNC.mdx"

mkdir -p "benchmarks/$DEST"
git mv "benchmarks/$GROUP/$FUNC.bench.ts" "benchmarks/$DEST/$DEST_FUNC.bench.ts"

mkdir -p "tests/$DEST"
git mv "tests/$GROUP/$FUNC.test.ts" "tests/$DEST/$DEST_FUNC.test.ts"

echo "WARNING: You need to update src/mod.ts to export \"$DEST/$DEST_FUNC.ts\""

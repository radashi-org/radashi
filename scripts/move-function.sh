#!/usr/bin/env bash
set -e

IFS="/" read -r GROUP FUNC <<< "$1"
DEST="$2"
DEST_FUNC="$FUNC"

print_help() {
  echo "Usage: move-function <group/func> <dest>"
  echo ""
  echo "The \$dest can be a group or a group/func pair."
  echo ""
  echo "Examples:"
  echo "  move-function array/sum number"
  echo "  move-function array/split array/fork"
  echo ""
  exit 1
}

# If FUNC is empty, throw an error
if [ -z "$FUNC" ]; then
  echo -e "ERROR: Function is required\n"
  print_help
fi

# If DEST is empty, throw an error
if [ -z "$DEST" ]; then
  echo "ERROR: Destination is required\n"
  print_help
fi

# If DEST contains /, update DEST_FUNC and DEST.
if [[ "$DEST" == */* ]]; then
  IFS="/" read -r DEST DEST_FUNC <<< "$DEST"
fi

# Source file
if [ -f "src/$GROUP/$FUNC.ts" ]; then
  mkdir -p "src/$DEST"
  git mv "src/$GROUP/$FUNC.ts" "src/$DEST/$DEST_FUNC.ts"
else
  echo -e "ERROR: Source file not found\n"
  exit 1
fi

# Documentation file
if [ -f "docs/$GROUP/$FUNC.mdx" ]; then
  mkdir -p "docs/$DEST"
  git mv "docs/$GROUP/$FUNC.mdx" "docs/$DEST/$DEST_FUNC.mdx"
fi

# Benchmark file
if [ -f "benchmarks/$GROUP/$FUNC.bench.ts" ]; then
  mkdir -p "benchmarks/$DEST"
  git mv "benchmarks/$GROUP/$FUNC.bench.ts" "benchmarks/$DEST/$DEST_FUNC.bench.ts"
fi

# Test file
if [ -f "tests/$GROUP/$FUNC.test.ts" ]; then
  mkdir -p "tests/$DEST"
  git mv "tests/$GROUP/$FUNC.test.ts" "tests/$DEST/$DEST_FUNC.test.ts"
fi

# Update src/mod.ts
echo "WARN: You need to update src/mod.ts to export \"$DEST/$DEST_FUNC.ts\""
echo "WARN: Only the files were renamed. The implementation, tests, and so on "
echo "WARN:   must be updated manually."

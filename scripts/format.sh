set -e

# 1. Remember if the user has uncommitted changes (ignoring untracked files).
UNCOMMITTED_CHANGES=$(git status --porcelain -uno)

BIOME_GLOBS="src/**/*.ts tests/**/*.ts benchmarks/**/*.ts scripts/**/*.ts"
BIOME_FILES=$(pnpm glob $BIOME_GLOBS)

PRETTIER_GLOBS="package.json README.md docs/**/* scripts/**/*.sh"
PRETTIER_FILES=$(pnpm glob $PRETTIER_GLOBS)

# If arguments were passed, filter the list of files to only include those.
if [ $# -gt 0 ]; then
  FILTER=$(printf "|%s" "$@")
  FILTER=${FILTER:1} # Remove the leading '|'

  FILTERED_BIOME_FILES=""
  for file in $BIOME_FILES; do
    if echo "$file" | grep -qE "^($FILTER.*)"; then
      FILTERED_BIOME_FILES="$FILTERED_BIOME_FILES $file"
    fi
  done
  BIOME_FILES=$FILTERED_BIOME_FILES

  FILTERED_PRETTIER_FILES=""
  for file in $PRETTIER_FILES; do
    if echo "$file" | grep -qE "^($FILTER.*)"; then
      FILTERED_PRETTIER_FILES="$FILTERED_PRETTIER_FILES $file"
    fi
  done
  PRETTIER_FILES=$FILTERED_PRETTIER_FILES
fi

# 2. Update the formatting.
if [ -n "$BIOME_FILES" ]; then
  pnpm biome check --diagnostic-level info --fix --unsafe $BIOME_FILES
fi

if [ -n "$PRETTIER_FILES" ]; then
  pnpm prettier --write $PRETTIER_FILES
fi

# 3. Commit if there were no uncommitted changes, but there are now.
if [ -z "$UNCOMMITTED_CHANGES" ] && [ -n "$(git status --porcelain -uno)" ]; then
  git add -u
  git commit -m "chore: format"
fi

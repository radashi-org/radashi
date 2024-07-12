set -e

# Try using gh to get the target branch, otherwise use 'main' as a fallback.
if [[ -z "$TARGET_BRANCH" ]]; then
  TARGET_BRANCH=$(which gh > /dev/null 2>&1 && gh pr view --json baseRefName --jq .baseRefName 2> /dev/null || echo "")
  TARGET_BRANCH=${TARGET_BRANCH:-main}
fi

# Get the list of changed source files relative to the target branch.
CHANGES=$(git diff --name-status "origin/$TARGET_BRANCH" HEAD -- 'src/*/*.ts')

# Separate the file statuses and file names.
FILE_STATUSES=()
FILE_NAMES=()

i=0
for item in $CHANGES; do
  if [ $((i % 2)) -eq 0 ]; then
    FILE_STATUSES+=($item)
  else
    FILE_NAMES+=($item)
  fi
  i=$((i + 1))
done

# If esbuild is not found, install it.
if ! which esbuild > /dev/null 2>&1; then
  # If not CI, confirm the installation:
  if [[ -z "$CI" ]]; then
    read -n 1 -p "Install esbuild to pnpm global store? (Y/n) " confirm
    echo
    if [ "$confirm" == "n" ]; then
      exit 1
    fi

    pnpm install -g esbuild
  else
    pnpm -s install -g esbuild
  fi
fi

# The sizes of the changed functions before the changes.
PREV_SIZES=()

# Collect previous sizes if there are no uncommitted changes.
if [ -z "$(git status -s)" ]; then
  echo "Checking out $TARGET_BRANCH..."
  git checkout "$TARGET_BRANCH" &> /dev/null

  i=0
  for file in "${FILE_NAMES[@]}"; do
    status=${FILE_STATUSES[$i]}

    if [ "$status" == "A" ]; then
      PREV_SIZES+=(0)
    else
      PREV_SIZES+=($(esbuild --bundle --minify "$file" | wc -c | tr -d '[:space:]'))
    fi

    i=$((i + 1))
  done

  git checkout - &> /dev/null
fi

column_count=2
if [ ${#PREV_SIZES[@]} -gt 0 ]; then
  column_count=3
fi

if [[ -n "$CI" ]]; then
  if [ "$column_count" -gt 2 ]; then
    echo "| Status | File | Size | Difference (%) |"
    echo "|---|---|---|---|"
  else
    echo "| Status | File | Size |"
    echo "|---|---|---|"
  fi
fi

i=0
for file in "${FILE_NAMES[@]}"; do
  status=${FILE_STATUSES[$i]}

  if [ "$column_count" -gt 2 ]; then
    prev_bytes=${PREV_SIZES[$i]}
  fi

  if [ "$status" == "D" ]; then
    bytes=0
  else
    bytes=$(esbuild --bundle --minify "$file" | wc -c | tr -d '[:space:]')
  fi

  diff=$((bytes - prev_bytes))
  diff=$(if [ "$diff" -ge 0 ]; then echo "+"; fi)$diff

  if [ "$column_count" -gt 2 ] && [ "$prev_bytes" -ne 0 ]; then
    ratio=$(echo "scale=0; (100 * $bytes / $prev_bytes) - 100" | bc -l)
    ratio=$(if [ "$ratio" -ge 0 ]; then echo "+"; fi)$ratio
    ratio=" ($ratio%)"
  else
    ratio=""
  fi

  if [[ -n "$CI" ]]; then
    if [ "$column_count" -gt 2 ]; then
      echo "| $status | \`$file\` | $bytes | $diff$ratio |"
    else
      echo "| $status | \`$file\` | $bytes |"
    fi
  else
    if [ "$column_count" -gt 2 ] && [ "$prev_bytes" -ne 0 ]; then
      echo "$file: $bytes bytes ($diff bytes)$ratio"
    else
      echo "$file: $bytes bytes"
    fi
  fi

  i=$((i + 1))
done

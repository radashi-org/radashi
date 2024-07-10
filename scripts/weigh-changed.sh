set -e

# Try using gh to get the target branch, otherwise use 'main' as a fallback.
TARGET_BRANCH=$(which gh > /dev/null 2>&1 && gh pr view --json baseRefName --jq .baseRefName || echo "")
TARGET_BRANCH=${TARGET_BRANCH:-main}

# Get the list of changed source files relative to the target branch.
CHANGES=$(git diff --name-status "$TARGET_BRANCH" HEAD -- 'src/*/*.ts')

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
  git checkout "$TARGET_BRANCH"

  for line in $CHANGES; do
    status=${line:0:1}
    file=${line:1}

    bytes=$(esbuild --bundle --minify "$file" | wc -c | tr -d '[:space:]')
    if [ "$status" == "A" ]; then
      PREV_SIZES+=(0)
    else
      PREV_SIZES+=(bytes)
    fi
  done

  git checkout -
fi

column_count=2
if [[ -n "$CI" ]]; then
  if [ ${#PREV_SIZES[@]} -gt 0 ]; then
    column_count=3
    echo "| File | Size | Difference (%) |"
    echo "|---|---|---|"
  else
    echo "| File | Size |"
    echo "|---|---|"
  fi
fi

for line in $CHANGES; do
  status=${line:0:1}
  file=${line:1}

  prev_bytes=0
  if [ "$column_count" -gt 0 ]; then
    prev_bytes=${PREV_SIZES[$i]}
  fi

  if [ "$status" == "D" ]; then
    bytes=0
  else
    bytes=$(esbuild --bundle --minify "$file" | wc -c | tr -d '[:space:]')
  fi

  if [[ -n "$CI" ]]; then
    if [ "$column_count" -gt 0 ]; then
      ratio=$(echo "scale=0; (100 * $bytes / $prev_bytes) - 100" | bc -l)
      ratio=$(if [ "$ratio" -ge 0 ]; then echo "+"; fi)$ratio

      echo "| $file | $bytes | $((bytes - prev_bytes)) ($ratio%) |"
    else
      echo "| $file | $bytes |"
    fi
  else
    echo "$file: $bytes bytes"
  fi
done

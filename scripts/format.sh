set -e

# 1. Remember if the user has uncommitted changes (ignoring untracked files).
UNCOMMITTED_CHANGES=$(git status --porcelain -uno)

# 2. Update the formatting.
pnpm biome check --fix --unsafe
pnpm prettier --write README.md docs/**/*

# 3. Commit if there were no uncommitted changes, but there are now.
if [ -z "$UNCOMMITTED_CHANGES" ] && [ -n "$(git status --porcelain -uno)" ]; then
  git add -u
  git commit -m "chore: format"
fi
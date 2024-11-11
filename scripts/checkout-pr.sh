#!/usr/bin/env bash
set -e
set -x

# Fetch the PR contents
git remote add pr $PR_REPO_URL
git fetch pr "$PR_HEAD_REF"

BASE_COMMIT=$(git merge-base HEAD "pr/$PR_HEAD_REF")

# Squash the PR into a single commit
git checkout "pr/$PR_HEAD_REF"
git reset --soft "$BASE_COMMIT"
git commit -m "single commit"
git checkout -

# Import changes from the PR into the current branch without committing
git cherry-pick -m 1 -n "pr/$PR_HEAD_REF"

# List the affected files for debugging purposes
git diff --name-status --staged

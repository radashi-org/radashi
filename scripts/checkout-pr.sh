#!/usr/bin/env bash
set -e
set -x

# Fetch the PR contents
git remote add pr $PR_REPO_URL
git fetch pr "$PR_HEAD_REF"

# Import changes from the PR into the current branch without committing
BASE_COMMIT=$(git merge-base HEAD "pr/$PR_HEAD_REF")
git cherry-pick -n "$BASE_COMMIT..pr/$PR_HEAD_REF"

# List the affected files for debugging purposes
git diff --name-status --staged

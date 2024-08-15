#!/usr/bin/env bash
set -e
set +x

# Fetch the PR contents
git remote add pr $PR_REPO_URL
git fetch pr "$PR_HEAD_REF"

# Fetch the base commit
BASE_COMMIT=$(git merge-base HEAD "pr/$PR_HEAD_REF")
git fetch origin $BASE_COMMIT

# Import changes from the PR into the current branch without committing
git cherry-pick -n "$BASE_COMMIT..$PR_HEAD_REF" -X theirs

# List the affected files for debugging purposes
git diff --name-status --staged

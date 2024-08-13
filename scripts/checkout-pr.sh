#!/usr/bin/env bash
set -e

# This script takes a list of path globs and checks out the PR into
# the current directory. The current branch is not switched.
git remote add pr $PR_REPO_URL
git fetch pr "$PR_HEAD_REF"
git checkout "pr/$PR_HEAD_REF" -- $@

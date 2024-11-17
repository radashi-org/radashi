#!/usr/bin/env bash
set -e

export INSTALL_ONLY=true

if [[ "$*" == *"--force"* ]]; then
  rm -rf */node_modules
fi

for pkg in */package.json; do
  node run.js "$(dirname "$pkg")"
done

#!/usr/bin/env bash
set -e

export INSTALL_ONLY=true

for pkg in */package.json; do
  node run.js "$(dirname "$pkg")"
done

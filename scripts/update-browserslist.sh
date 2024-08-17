#!/usr/bin/env bash
set -e

if [ ! -d "scripts/browser-support/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/browser-support
fi

pnpm -s scripts/browser-support/node_modules/.bin/tsx scripts/browser-support/update-browserslist.ts "$@"

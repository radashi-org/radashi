#!/usr/bin/env bash
set -e

if [ ! -d "scripts/format/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/format
fi

pnpm -s scripts/format/node_modules/.bin/tsx scripts/format/format.ts "$@"

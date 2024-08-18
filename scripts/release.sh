#!/usr/bin/env bash
set -e

if [ ! -d "scripts/versions/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/versions
  pnpm install -C scripts/radashi-db
fi

pnpm -s scripts/versions/node_modules/.bin/tsx scripts/versions/ci-publish.ts "$@"

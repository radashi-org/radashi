#!/usr/bin/env bash

if [ ! -d "scripts/lint/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/lint
fi

pnpm -s scripts/lint/node_modules/.bin/tsx scripts/lint/lint.ts "$@"

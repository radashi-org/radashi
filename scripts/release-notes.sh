#!/usr/bin/env bash

if [ ! -d "scripts/release-notes/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/release-notes
fi

pnpm -s scripts/release-notes/node_modules/.bin/tsx scripts/release-notes/release-notes.ts "$@"

#!/usr/bin/env bash

if [ ! -d "scripts/release-notes/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/release-notes
fi

pnpm -s scripts/bundle-impact/node_modules/.bin/tsx -e '
import {weighChangedFunctions} from "./scripts/bundle-impact/weigh-changed.ts";
weighChangedFunctions().then(console.log)
'

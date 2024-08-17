#!/usr/bin/env bash
set -e

if [ ! -d "scripts/bundle-impact/node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  pnpm install -C scripts/bundle-impact
fi

pnpm -s scripts/bundle-impact/node_modules/.bin/tsx -e "
import { weighChangedFunctions } from '$PWD/scripts/bundle-impact/src/weigh-changed'
weighChangedFunctions().then(console.log)
"

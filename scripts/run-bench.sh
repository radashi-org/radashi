#!/usr/bin/env bash

if [ ! -d "comparisons/node_modules" ]; then
  pnpm install --prefix comparisons --reporter=silent
fi

vitest bench comparisons/* --run

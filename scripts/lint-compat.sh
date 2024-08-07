#!/bin/bash
set -e

cat << 'EOF' > eslint.config.js
import compat from "eslint-plugin-compat";
import typescript from "@typescript-eslint/parser";

export default {
  ...compat.configs["flat/recommended"],
  files: ["**/*.ts"],
  ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "**/scripts/**"],
  languageOptions: {
    parser: typescript,
    parserOptions: {
      ecmaVersion: "latest",
    },
  },
};
EOF

ESLINT_OK=0
if pnpm dlx eslint $@; then
  ESLINT_OK=1
fi

rm eslint.config.js

if [ ! $ESLINT_OK -eq 1 ]; then
  exit 1
fi

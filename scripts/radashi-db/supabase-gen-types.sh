#!/usr/bin/env bash

# Get the directory of this script
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

pnpm supabase gen types --lang=typescript --project-id=yucyhkpmrdbucitpovyj --schema=public > $SCRIPT_DIR/supabase.types.ts

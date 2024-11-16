#!/usr/bin/env bash

# Get the directory of this script
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"
# cSpell:disable-next-line
PROJECT_ID="yucyhkpmrdbucitpovyj"

pnpm dlx supabase@1.187.10 gen types --lang=typescript --project-id=$PROJECT_ID --schema=public > $SCRIPT_DIR/src/supabase.types.ts

import { execa } from 'execa'
import { writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Get the directory of this script
const scriptDir = dirname(fileURLToPath(import.meta.url))

// cSpell:disable-next-line
const projectId = 'yucyhkpmrdbucitpovyj'

// This script generates the ./src/supabase.types.ts module to provide
// type-safe access to Radashi's Supabase instance.
await execa(
  'pnpm',
  [
    'dlx',
    'supabase@1.187.10',
    'gen',
    'types',
    '--lang=typescript',
    `--project-id=${projectId}`,
    '--schema=public',
  ],
  {
    stdio: ['inherit', 'pipe', 'inherit'],
  },
).then(async result => {
  // Write output to file
  await writeFile(`${scriptDir}/src/supabase-types.ts`, result.stdout)
})

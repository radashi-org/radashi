import { execa } from 'execa'
import fs from 'node:fs/promises'
import { supabase } from 'radashi-db/supabase.js'

main()

async function main() {
  const versionResult = await supabase
    .from('meta')
    .select('value')
    .eq('id', 'latest_version')
    .limit(1)
    .single()

  if (versionResult.error) {
    console.error('Error fetching latest version:', versionResult.error)
    process.exit(1)
  }

  const { version, ref } = versionResult.data.value as {
    version: string
    ref: string
  }

  console.log('Publishing v%s using ref %s', version, ref)

  await execa('git', ['fetch', 'origin', ref], { stdio: 'inherit' })
  await execa('git', ['checkout', ref], { stdio: 'inherit' })

  const denoJson = {
    ...JSON.parse(await fs.readFile('deno.json', 'utf8')),
    version,
  }

  await fs.writeFile('deno.json', JSON.stringify(denoJson, null, 2))
  console.log('Updated version in deno.json')

  await execa('pnpm', ['dlx', 'jsr', 'publish', '--allow-dirty'], {
    stdio: 'inherit',
  })
}

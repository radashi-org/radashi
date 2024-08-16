import { supabase } from 'radashi-db/supabase.js'

main()

async function main() {
  const [version, ref] = process.argv.slice(2)
  const channel = version.match(/-(\w+)/)?.[1] ?? 'stable'

  const value = { version, ref }
  console.log('Updating with:', value)

  const { error: upsertError } = await supabase.from('meta').upsert([
    {
      id: 'latest_version',
      value,
    },
    {
      id: channel + '_version',
      value,
    },
  ])

  if (upsertError) {
    console.error('Error upserting version data:', upsertError)
    process.exit(1)
  }
}

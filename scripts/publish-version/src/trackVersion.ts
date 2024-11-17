import { supabase } from 'radashi-db/supabase.ts'

export async function trackVersion(
  version: string,
  ref: string,
  log = console.log,
) {
  const channel = version.match(/-(\w+)/)?.[1] ?? 'stable'
  const channelMetaId = channel + '_version'

  const value = { version, ref }
  log(`Updating "latest_version" and "${channelMetaId}" with:`, value)

  const { error: upsertError } = await supabase.from('meta').upsert([
    {
      id: 'latest_version',
      value,
    },
    {
      id: channelMetaId,
      value,
    },
  ])

  if (upsertError) {
    upsertError.message = 'Error upserting version data:' + upsertError.message
    throw upsertError
  }
}

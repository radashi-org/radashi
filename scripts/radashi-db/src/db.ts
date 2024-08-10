import { createClient as createSupabase } from '@supabase/supabase-js'
import { default as createAlgolia } from 'algoliasearch'

export const supabase = createSupabase(
  'https://yucyhkpmrdbucitpovyj.supabase.co',
  process.env.SUPABASE_KEY!,
)

export const algolia = createAlgolia('7YYOXVJ9K7', process.env.ALGOLIA_KEY!)

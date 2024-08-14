import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase.types'

export const supabase = createClient<Database>(
  'https://yucyhkpmrdbucitpovyj.supabase.co',
  process.env.SUPABASE_KEY!,
)

export * from './supabase.types'

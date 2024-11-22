import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase-types.ts'

if (!process.env.SUPABASE_KEY) {
  throw new Error('SUPABASE_KEY is not set')
}

export const supabase = createClient<Database>(
  'https://yucyhkpmrdbucitpovyj.supabase.co',
  process.env.SUPABASE_KEY,
)

process.env.SUPABASE_KEY = ''

export * from './supabase-types.ts'

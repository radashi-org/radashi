# radashi-db

Radashi has both a Supabase and Algolia database. Both are used to power the Radashi website and VSCode extension. Supabase is also used for continuous benchmarking (to help catch performance regressions).

Note that `supabase.types.ts` is generated from the Supabase schema, so please don't manually edit it.

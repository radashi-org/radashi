## New Functions

#### Add `concat` function [#388](https://github.com/radashi-org/radashi/pull/388)

Flattens and filters nullish values from arguments.

```ts
import { concat } from 'radashi'

const result = concat('a', null, ['b', undefined], 'c')
// => ['a', 'b', 'c']
```

🔗 [Docs](https://radashi.js.org/reference/array/concat) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/concat.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/concat.test.ts)

#### Add `pluck` function [#376](https://github.com/radashi-org/radashi/pull/376)

Map an array of objects to an array of arrays.

```ts
import { pluck } from 'radashi'

const gods = [
  { name: 'Ra', power: 100 },
  { name: 'Zeus', power: 98 },
]

const names = pluck(gods, ['name'])
// => [['Ra'], ['Zeus']]
```

Thanks to [@nusohiro](https://github.com/nusohiro) for the contribution!

🔗 [Docs](https://radashi.js.org/reference/array/pluck) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/pluck.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/pluck.test.ts)

## <!-- 06 -->Fixed

#### Fix `mapify` index argument [#384](https://github.com/radashi-org/radashi/pull/384)

Ensure the index argument passed to `mapify`'s 2nd callback is the actual array index.

```ts
import { mapify } from 'radashi'

const list = [
  { id: 'a', word: 'hello' },
  { id: 'a', word: 'bye' },
  { id: 'a', word: 'oh' },
]

const result = mapify(
  list,
  x => x.id,
  (x, i) => x.word + i,
)
// => Map { 'a' => 'oh2' }
```

Thanks to [@Yukiniro](https://github.com/Yukiniro) for the contribution!

#### Avoid infinite loop in `cluster` when size is `0` [#397](https://github.com/radashi-org/radashi/pull/397)

The `cluster` function now correctly handles the case where the size is `0` or less by returning an empty array.

```ts
import { cluster } from 'radashi'

const result = cluster([1, 2, 3], 0)
// => []
```

Thanks to [@fResult](https://github.com/fResult) for the contribution!

## <!-- 08 -->Types

#### Improve `cluster` type inference [#389](https://github.com/radashi-org/radashi/pull/389)

The `cluster` function now provides precise type inference for common cluster sizes (1-8) using tuple types.

```ts
import { cluster } from 'radashi'

const result = cluster(['a', 'b', 'c', 'd'], 2)
//    ^? [string, string][]
```

Thanks to [@fResult](https://github.com/fResult) for the contribution!

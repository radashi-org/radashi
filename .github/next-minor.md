## New Functions

### Add `getOrInsert` and `getOrInsertComputed` functions [→ PR #444](https://github.com/radashi-org/radashi/pull/444)

Access or initialize map entries without boilerplate branching. `getOrInsert` writes the provided value once, while `getOrInsertComputed` lazily creates an entry only when it is missing.

- Works with both `Map` and `WeakMap` instances
- Returns the stored entry so you can chain additional logic
- Avoids unnecessary factory calls when a key already exists

```typescript
import * as _ from 'radashi'

const counts = new Map<string, number>()

_.getOrInsert(counts, 'clicks', 1) // => 1
_.getOrInsert(counts, 'clicks', 5) // => 1
_.getOrInsertComputed(counts, 'views', () => 10) // => 10
_.getOrInsertComputed(counts, 'views', () => 0) // => 10
```

Inspired by TC39's [upsert proposal](https://github.com/tc39/proposal-upsert).

🔗 Docs: [getOrInsert](https://radashi.js.org/reference/object/getOrInsert) · [getOrInsertComputed](https://radashi.js.org/reference/object/getOrInsertComputed) / Source: [getOrInsert.ts](https://github.com/radashi-org/radashi/blob/main/src/object/getOrInsert.ts) · [getOrInsertComputed.ts](https://github.com/radashi-org/radashi/blob/main/src/object/getOrInsertComputed.ts) / Tests: [getOrInsert.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/object/getOrInsert.test.ts) · [getOrInsertComputed.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/object/getOrInsertComputed.test.ts)

### Add `isArrayEqual` function [→ PR #417](https://github.com/radashi-org/radashi/pull/417)

Compare arrays with `Object.is` precision. `isArrayEqual` checks length and element identity, correctly handling tricky cases like `NaN`, sparse arrays, and the `+0`/`-0` distinction.

- Uses `Object.is` so `NaN` matches itself while `+0` and `-0` stay distinct
- Short-circuits when lengths differ for a fast inequality check
- Leaves the original arrays untouched

```typescript
import * as _ from 'radashi'

_.isArrayEqual([1, 2, 3], [1, 2, 3]) // => true
_.isArrayEqual([0], [-0]) // => false
_.isArrayEqual([Number.NaN], [Number.NaN]) // => true
```

🔗 [Docs](https://radashi.js.org/reference/array/isArrayEqual) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/isArrayEqual.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/isArrayEqual.test.ts)

### Add `isMapEqual` and `isSetEqual` functions [→ PR #437](https://github.com/radashi-org/radashi/pull/437)

Quickly compare collections without writing loops. `isMapEqual` uses `isEqual` to traverse nested values, while `isSetEqual` focuses on membership equality for reference types.

- Checks map sizes first, then verifies each key/value pair deeply
- Compares set entries via `Set#has`, perfect for shared object references or primitive values
- Gives you targeted equality helpers instead of overloading `isEqual`

```typescript
import * as _ from 'radashi'

const left = new Map([
  ['id', 1],
  ['tags', ['radashi', 'bench']],
])
const right = new Map([
  ['tags', ['radashi', 'bench']],
  ['id', 1],
])

_.isMapEqual(left, right) // => true

const user = { id: 1 }
_.isSetEqual(new Set([user]), new Set([user])) // => true
```

🔗 Docs: [isMapEqual](https://radashi.js.org/reference/typed/isMapEqual) · [isSetEqual](https://radashi.js.org/reference/typed/isSetEqual) / Source: [isMapEqual.ts](https://github.com/radashi-org/radashi/blob/main/src/typed/isMapEqual.ts) · [isSetEqual.ts](https://github.com/radashi-org/radashi/blob/main/src/typed/isSetEqual.ts) / Tests: [isMapEqual.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/typed/isMapEqual.test.ts) · [isSetEqual.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/typed/isSetEqual.test.ts)

### Add `absoluteJitter` and `proportionalJitter` functions [→ PR #446](https://github.com/radashi-org/radashi/pull/446)

Inject randomized noise into numbers for simulations, experiments, or simple variability. Choose an absolute range or a proportional factor depending on the use case.

- `absoluteJitter` offsets the base value by up to ±`offset`
- `proportionalJitter` scales jitter by a percentage of the base value
- Designed for symmetric distributions using `Math.random()` under the hood

```typescript
import * as _ from 'radashi'

const base = 100
_.absoluteJitter(base, 5) // => between 95 and 105
_.proportionalJitter(base, 0.1) // => between 90 and 110
```

🔗 Docs: [absoluteJitter](https://radashi.js.org/reference/random/absoluteJitter) · [proportionalJitter](https://radashi.js.org/reference/random/proportionalJitter) / Source: [absoluteJitter.ts](https://github.com/radashi-org/radashi/blob/main/src/random/absoluteJitter.ts) · [proportionalJitter.ts](https://github.com/radashi-org/radashi/blob/main/src/random/proportionalJitter.ts) / Tests: [absoluteJitter.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/random/absoluteJitter.test.ts) · [proportionalJitter.test.ts](https://github.com/radashi-org/radashi/blob/main/tests/random/proportionalJitter.test.ts)

### Add `identity` function [→ PR #422](https://github.com/radashi-org/radashi/pull/422)

The `identity` helper simply returns the value you pass in, providing a lightweight default callback for APIs that expect a mapper function.

- Fully generic, so TypeScript infers the original value type
- Handy as a default getter when working with utilities like `sort`
- Works even when no argument is supplied, returning `undefined`

```typescript
import * as _ from 'radashi'

_.identity() // => undefined
_.identity('radashi') // => 'radashi'
_.identity({ id: 1 }) // => { id: 1 }
```

Thanks to [Nano Miratus](https://github.com/nnmrts) for adding this functional building block!

🔗 [Docs](https://radashi.js.org/reference/function/identity) / [Source](https://github.com/radashi-org/radashi/blob/main/src/function/identity.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/function/identity.test.ts)

## New Features

### Use `identity` as the default getter for `sort` [→ PR #423](https://github.com/radashi-org/radashi/pull/423)

`sort` now handles raw numeric arrays without a custom getter. When you omit the getter, it falls back to `identity`, keeping the API ergonomic while preserving the ability to switch to descending order.

- Explicitly pass `_.identity` when you want to sort descending
- Still clones the array, leaving your original list untouched

```typescript
import * as _ from 'radashi'

const numbers = [2, 0, 1]

_.sort(numbers) // => [0, 1, 2]
_.sort(numbers, _.identity, true) // => [2, 1, 0]
```

Thanks to [Nano Miratus](https://github.com/nnmrts) for smoothing out this API!

🔗 [Docs](https://radashi.js.org/reference/array/sort) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/sort.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/sort.test.ts)

### Allow `objectify` callbacks to read the item index [→ PR #440](https://github.com/radashi-org/radashi/pull/440)

Both `getKey` and `getValue` callbacks now receive the item index, making it easy to build composite keys or inject positional data while converting arrays into dictionaries.

- Keep keys unique by appending the index to collisions
- Shape return values with both the item and its position
- Works seamlessly with existing `objectify` call sites

```typescript
import * as _ from 'radashi'

const list = [
  { id: 'a', word: 'hello' },
  { id: 'b', word: 'bye' },
]

_.objectify(
  list,
  (item, i) => `${item.id}_${i}`,
  (item, i) => `${item.word}-${i}`,
)
// => { a_0: 'hello-0', b_1: 'bye-1' }
```

Thanks to Ronen Barzel for extending `objectify`!

🔗 [Docs](https://radashi.js.org/reference/array/objectify) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/objectify.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/objectify.test.ts)

### Preserve tuple types when using `min` and `max` getters [→ PR #436](https://github.com/radashi-org/radashi/pull/436)

When you pass a getter to `min` or `max`, the helper now returns the original tuple element instead of widening to `T | null`. That keeps discriminated unions and `as const` tuples fully typed.

- New overloads ensure non-empty tuples come back as the same literal type
- Keeps `null` out of the result when the tuple has at least one item
- Helps TypeScript infer richer shapes in downstream code

```typescript
import * as _ from 'radashi'

const sizes = [
  { label: 'S', weight: 8 },
  { label: 'XL', weight: 12 },
] as const

const biggest = _.max(sizes, size => size.weight)
// biggest is inferred as { label: 'XL'; weight: 12 }
```

Thanks to [Nano Miratus](https://github.com/nnmrts) for tightening up the typings!

🔗 Source: [max.ts](https://github.com/radashi-org/radashi/blob/main/src/number/max.ts) · [min.ts](https://github.com/radashi-org/radashi/blob/main/src/number/min.ts)

## Documentation

### Clarify that `unique` preserves original ordering [→ PR #433](https://github.com/radashi-org/radashi/pull/433)

The docs now state that `unique` keeps the first occurrence of each item. Examples and tests were updated to highlight the stable ordering and refreshed copy for clarity.

- Explicitly documents that duplicates keep their earliest entry
- Updates the example data to match the behavior
- Adds a unit test covering order preservation

```typescript
import * as _ from 'radashi'

const fish = [
  { name: 'Trout', source: 'lake' },
  { name: 'Salmon', source: 'stream' },
  { name: 'Salmon', source: 'river' },
]

_.unique(fish, item => item.name)
// => [Trout, Salmon]
```

Thanks to Ronen Barzel for polishing the documentation!

🔗 [Docs](https://radashi.js.org/reference/array/unique) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/unique.test.ts)

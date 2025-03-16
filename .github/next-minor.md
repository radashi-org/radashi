## New Functions

#### Add `remove` function [→ PR #344](https://github.com/radashi-org/radashi/pull/344)

The `remove` function removes elements from an array based on the specified predicate function.

- Removes elements that satisfy the predicate function.
- Returns a new array with the removed elements.
- Does not mutate the original array.

```typescript
import * as _ from 'radashi'

const numbers = [1, 2, 3, 4, 5]
const removed = _.remove(numbers, value => value % 2 === 0)
console.log(removed) // Output: [1, 3, 5]
```

🔗 [Docs](https://radashi.js.org/reference/array/remove) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/remove.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/remove.test.ts)

Thanks to [nusohiro](https://github.com/nusohiro) for their work on this feature!

#### Add `toResult` function [→ PR #375](https://github.com/radashi-org/radashi/pull/375)

The `toResult` function converts a `PromiseLike` to a `Promise<Result>`.

- Converts a resolved promise to `[undefined, value]`.
- Converts a rejected promise to `[Error, undefined]`.
- Rethrows non-Error rejections.

```typescript
import { toResult, Result } from 'radashi'

const good = async (): Promise<number> => 1
const bad = async (): Promise<number> => {
  throw new Error('bad')
}

const goodResult = await toResult(good())
// => [undefined, 1]

const badResult = await toResult(bad())
// => [Error('bad'), undefined]
```

🔗 [Docs](https://radashi.js.org/reference/async/toResult) / [Source](https://github.com/radashi-org/radashi/blob/main/src/async/toResult.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/async/toResult.test.ts)

Thanks to [Alec Larson](https://github.com/aleclarson) for their work on this feature!

#### Add `memoLastCall` function [→ PR #353](https://github.com/radashi-org/radashi/pull/353)

The `memoLastCall` function creates a memoized version of a function that caches only its most recent call. This is useful for optimizing expensive calculations when only the latest result needs to be cached, making it more memory-efficient than traditional memoization.

- Caches the last result of a function call.
- Returns the cached result if the function is called with the same arguments as the previous call.
- Optimizes expensive calculations by avoiding recalculation when the arguments are the same.

```typescript
import * as _ from 'radashi'

const expensiveCalculation = (x: number, y: number): number => {
  console.log('Calculating...')
  return x + y
}

const memoizedCalc = _.memoLastCall(expensiveCalculation)

console.log(memoizedCalc(2, 3)) // Outputs: \"Calculating...\" then 5
console.log(memoizedCalc(2, 3)) // Outputs: 5 (uses cached result)
console.log(memoizedCalc(3, 4)) // Outputs: \"Calculating...\" then 7
console.log(memoizedCalc(2, 3)) // Outputs: \"Calculating...\" then 5 (previous cache was overwritten)
```

🔗 [Docs](https://radashi.js.org/reference/curry/memoLastCall) / [Source](https://github.com/radashi-org/radashi/blob/main/src/curry/memoLastCall.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/curry/memoLastCall.test.ts)

Thanks to [Alec Larson](https://github.com/aleclarson) for their work on this feature!

#### Add `isAsyncIterable` function [→ PR #366](https://github.com/radashi-org/radashi/pull/366)

The `isAsyncIterable` function checks if a value is an async iterable.

- Returns `true` for async iterables created by an async generator function.
- Returns `true` for objects with a `[Symbol.asyncIterator]` method.
- Returns `false` for everything else.

```typescript
import * as _ from 'radashi'

_.isAsyncIterable(
  (async function* () {
    yield 1
  })(),
)
// => true

_.isAsyncIterable([1, 2, 3])
// => false
```

🔗 [Docs](https://radashi.js.org/reference/typed/isAsyncIterable) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/isAsyncIterable.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/isAsyncIterable.test.ts)

Thanks to [Alec Larson](https://github.com/aleclarson) for their work on this feature!

#### Add `isBigInt` function [→ PR #369](https://github.com/radashi-org/radashi/pull/369)

The `isBigInt` function returns true if the given value is a BigInt.

- Returns `true` when `typeof` returns `'bigint'`.
- Returns `false` for everything else.

```typescript
import * as _ from 'radashi'

_.isBigInt(0n) // => true
_.isBigInt(BigInt(0)) // => true
_.isBigInt(12) // => false
_.isBigInt('0n') // => false
```

🔗 [Docs](https://radashi.js.org/reference/typed/isBigInt) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/isBigInt.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/isBigInt.test.ts)

Thanks to [Shan Shaji](https://github.com/shan-shaji) for their work on this feature!

## New Features

#### BigInt support in `isEmpty` [→ PR #374](https://github.com/radashi-org/radashi/pull/374)

The `isEmpty` function now supports BigInt values.

- Returns `true` for `0n` or `BigInt(0)`.

```typescript
import * as _ from 'radashi'

_.isEmpty(0n) // => true
_.isEmpty(BigInt(0)) // => true
_.isEmpty(1n) // => false
```

Thanks to [Alec Larson](https://github.com/aleclarson) for their work on this feature!

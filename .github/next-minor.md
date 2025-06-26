## New Functions

### Add `assert` function [→ PR #403](https://github.com/radashi-org/radashi/pull/403)

The `assert` function from Radashi is used to assert that a given `condition` is true. If the `condition` evaluates to `false`, the function throws an error. This is a fundamental building block for ensuring that certain conditions are met at runtime. This utility is particularly useful in TypeScript for its ability to perform type narrowing.

- Asserts a condition and throws an error if false.
- Useful for TypeScript type narrowing using the `asserts` keyword.
- Accepts an optional message (string or Error instance) for failed assertions.
- `assert(false, ...)` has a `never` return type for unreachable code paths.
- Inspired by Node.js's `assert` module.

```ts
import * as _ from 'radashi'

function processValue(value: string | null | undefined) {
  _.assert(value, 'Value cannot be null, undefined, or empty')

  // After the assertion, 'value' is narrowed to type 'string'
  console.log(value.toUpperCase())
}

processValue('hello') // logs "HELLO"
// _.assert throws on falsy values like:
// - null
// - undefined
// - '' (empty string)
// - 0
// - false
```

🔗 [Docs](https://radashi.js.org/reference/typed/assert) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/assert.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/assert.test.ts)

### Add `escapeHTML` function [→ PR #401](https://github.com/radashi-org/radashi/pull/401)

Replaces all occurrences of specific characters with their corresponding HTML entities to escape HTML in a string.

- `&` is replaced with `&`
- `<` is replaced with `<`
- `>` is replaced with `>`
- `"` is replaced with `"`
- `'` is replaced with `'`

```ts
import * as _ from 'radashi'

_.escapeHTML('<div>Hello, world!</div>')
// => '<div>Hello, world!</div>'
```

🔗 [Docs](https://radashi.js.org/reference/string/escapeHTML) / [Source](https://github.com/radashi-org/radashi/blob/main/src/string/escapeHTML.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/string/escapeHTML.test.ts)

### Add `parseDuration` function [→ PR #416](https://github.com/radashi-org/radashi/pull/416)

Parses a human-readable duration string (like "1 hour", "2 seconds") into milliseconds.

- Supports units like millisecond, second, minute, hour, day, and week.
- Custom units can be added.
- A `DurationParser` class is available for more efficient repeated parsing.

```ts
import * as _ from 'radashi'

_.parseDuration('1 second') // => 1_000
_.parseDuration('1h') // => 3_600_000
_.parseDuration('1 hour') // => 3_600_000
_.parseDuration('1.5 hours') // => 5_400_000
_.parseDuration('-1h') // => -3_600_000
```

Thanks to [Alec Larson](https://github.com/aleclarson) and [@hugo082](https://github.com/hugo082) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/number/parseDuration) / [Source](https://github.com/radashi-org/radashi/blob/main/src/number/parseDuration.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/number/parseDuration.test.ts)

### Add `parseQuantity` function [→ PR #416](https://github.com/radashi-org/radashi/pull/416)

Parses a quantity string like `"2 dollars"` into its numeric value. You must provide a unit conversion map, with optional short unit aliases.

- Requires a unit conversion map.
- Supports optional short unit aliases.
- A `QuantityParser` class is available for more efficient repeated parsing and subclassing.

```ts
import * as _ from 'radashi'

const moneyUnits = {
  units: {
    cent: 1,
    dollar: 100,
  },
  short: {
    $: 'dollar',
  },
} as const

_.parseQuantity('1 cent', moneyUnits)
// => 1

_.parseQuantity('2 dollars', moneyUnits)
// => 200

_.parseQuantity('5$', moneyUnits)
// => 500
```

Thanks to [Alec Larson](https://github.com/aleclarson) and [@hugo082](https://github.com/hugo082) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/number/parseQuantity) / [Source](https://github.com/radashi-org/radashi/blob/main/src/number/parseQuantity.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/number/parseQuantity.test.ts)

### Add `promiseChain` function [→ PR #402](https://github.com/radashi-org/radashi/pull/402)

Chain together multiple, potentially asynchronous functions. The result of each function is passed to the next function.

- Executes functions in the order they are provided.
- Supports both synchronous and asynchronous functions.
- Returns a Promise with the final result.

```ts
import * as _ from 'radashi'

const func1 = (a, b) => a + b
const func2 = async n => n * 2
const func3 = async n => `Your Value is ${n}`

const chained = _.promiseChain(func1, func2, func3)

await chained(5, 2) // => "Your Value is 14"
```

Thanks to [Bharat Soni](https://github.com/iiison) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/curry/promiseChain) / [Source](https://github.com/radashi-org/radashi/blob/main/src/curry/promiseChain.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/curry/promiseChain.test.ts)

### Add `queueByKey` function [→ PR #407](https://github.com/radashi-org/radashi/pull/407)

Wraps an asynchronous function to ensure that calls with the same key are queued and executed sequentially, while calls with different keys can run in parallel. This is useful for preventing race conditions when operations must not overlap for the same logical group (like user ID or resource ID).

- **Sequential per key**: Operations with the same key execute one after another
- **Parallel across keys**: Operations with different keys run concurrently
- **Error handling**: Errors are properly propagated and don't break the queue
- **Memory efficient**: Queues are automatically cleaned up when empty
- **Type safe**: Full TypeScript support with generic types

```ts
import * as _ from 'radashi'

const updateUser = async (userId: string, data: object) => {
  // Simulate API call that shouldn't overlap for the same user
  const response = await fetch(`/api/users/${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.json()
}

const queuedUpdate = _.queueByKey(updateUser, userId => userId)

// These will run sequentially for user123
queuedUpdate('user123', { name: 'Alice' })
queuedUpdate('user123', { age: 30 })

// This runs in parallel with user123's queue
queuedUpdate('user456', { name: 'Bob' })
```

🔗 [Docs](https://radashi.js.org/reference/async/queueByKey) / [Source](https://github.com/radashi-org/radashi/blob/main/src/async/queueByKey.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/async/queueByKey.test.ts)

### Add `Semaphore` class [→ PR #415](https://github.com/radashi-org/radashi/pull/415)

A synchronization primitive that allows a limited number of concurrent operations to proceed.

- Limits the number of concurrent operations.
- Use `acquire()` to get a permit and `release()` to free it.
- Supports acquiring permits with a specific weight.
- Pending acquisitions can be aborted using `AbortController`.
- All pending and future acquisitions can be rejected using `semaphore.reject()`.

```ts
import { Semaphore } from 'radashi'

const semaphore = new Semaphore(2)

const permit = await semaphore.acquire()

permit.release()
```

Thanks to [Alec Larson](https://github.com/aleclarson) and [@hugo082](https://github.com/hugo082) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/oop/Semaphore) / [Source](https://github.com/radashi-org/radashi/blob/main/src/oop/Semaphore.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/oop/Semaphore.test.ts)

## New Features

### Pass array index to group callback [→ Commit 6d66395](https://github.com/radashi-org/radashi/commit/6d66395d3e36194e01d95684b1c7815b093e5c09)

The callback function provided to the `group` function now receives the array index as its second argument. This allows for more flexible grouping logic that can take into account the position of elements in the original array.

- The callback signature is now `(item, index) => groupKey`.
- Enables grouping based on element position as well as value.

```ts
import * as _ from 'radashi'

const items = ['a', 'b', 'c', 'd', 'e']

const groupedByIndex = _.group(items, (item, index) =>
  index % 2 === 0 ? 'even' : 'odd',
)
// => { even: ['a', 'c', 'e'], odd: ['b', 'd'] }
```

🔗 [Docs](https://radashi.js.org/reference/array/group) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/group.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/group.test.ts)

## Fixes

- Fix incorrect type narrowing in `isIntString` ([→ PR #412](https://github.com/radashi-org/radashi/pull/412)) by [Igor Golovin](https://github.com/lislon)
- Fix filtering out null from `selectFirst` return type when no condition is given ([→ PR #413](https://github.com/radashi-org/radashi/pull/413)) by [Ali Medhat](https://github.com/Alimedhat000)

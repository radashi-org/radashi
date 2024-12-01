## New Functions

### Add `isClass` function [→ PR #239](https://github.com/radashi-org/radashi/pull/239)

The `isClass` function determines if a value was declared using ES6 `class` syntax, distinguishing modern class declarations from traditional constructor functions or other types.

- Only returns `true` for values created with the `class` keyword
- Old-style constructor functions will return `false`
- Built-in native class constructors (like `Error`) return `false`
- Works with type narrowing for TypeScript

```typescript
import * as _ from 'radashi'

class MyClass {
  x = 1
}

function OldConstructor() {
  this.x = 1
}

// Examples
_.isClass(MyClass) // true
_.isClass(OldConstructor) // false
_.isClass('string') // false
_.isClass(Error) // false
```

Thanks to [Marlon Passos](https://github.com/MarlonPassos-git) and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/typed/isClass) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/isClass.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/isClass.test.ts)

### Add `isNullish` function [→ PR #277](https://github.com/radashi-org/radashi/pull/277)

The `isNullish` function is a type-checking utility that determines whether a given value is either `null` or `undefined`. It helps you avoid the typos that an `x == null` check is prone to, and it's shorter to write than `x === undefined || x === null`.

```ts
import * as _ from 'radashi'

// Basic usage examples
_.isNullish(null) // true
_.isNullish(undefined) // true
_.isNullish('') // false
_.isNullish([]) // false
_.isNullish(0) // false
```

Thanks to [Wei Xiaopeng](https://github.com/ilxqx) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/typed/isNullish) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/isNullish.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/isNullish.test.ts)

### Add `cartesianProduct` function [→ PR #241](https://github.com/radashi-org/radashi/pull/241)

The `cartesianProduct` function generates all possible combinations of elements from multiple input arrays, creating a new array containing every unique permutation of elements from those arrays.

- Works with any number of input arrays
- Returns an array of arrays representing all combinations
- Preserves the order of input arrays in the resulting combinations
- Can handle arrays of different types

```typescript
import * as _ from 'radashi'

const colors = ['red', 'blue']
const numbers = [1, 2, 3]
const booleans = [true, false]

// Generate all combinations of colors, numbers, and booleans
const combinations = _.cartesianProduct(colors, numbers, booleans)
```

Thanks to [Yam Borodetsky](https://github.com/yamcodes), [Marlon Passos](https://github.com/MarlonPassos-git), and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/array/cartesianProduct) / [Source](https://github.com/radashi-org/radashi/blob/main/src/array/cartesianProduct.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/array/cartesianProduct.test.ts)

### Add `isUndefined` function [→ PR #305](https://github.com/radashi-org/radashi/pull/305)

The `isUndefined` function is a type guard that checks whether a given value is specifically `undefined`. It provides a simple and type-safe way to determine if a value has been left unassigned or is explicitly set to `undefined`.

- Strictly checks for `undefined` using the `typeof` operator
- Can be used for type narrowing in TypeScript

```typescript
import * as _ from 'radashi'

// Basic usage examples
const result1 = _.isUndefined(undefined) // true
const result2 = _.isUndefined(null) // false
const result3 = _.isUndefined(42) // false
```

Thanks to [RobinBobin](https://github.com/RobinBobin) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/typed/isUndefined) / [Source](https://github.com/radashi-org/radashi/blob/main/src/typed/isUndefined.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/typed/isUndefined.test.ts)

### Add `timeout` function [→ PR #250](https://github.com/radashi-org/radashi/pull/250)

The `timeout` function creates a promise that rejects after a specified delay, providing a way to set timeouts for asynchronous operations. It allows customizing the error message or type of error thrown when the timeout occurs.

- Can be used with a default `TimeoutError` or a custom error message/function
- Primarily useful with `Promise.race` to add timeout functionality to async tasks

```typescript
import * as _ from 'radashi'

// Basic usage: reject after 1 second with default TimeoutError
const basicTimeout = _.timeout(1000)

// With custom message
const customMessageTimeout = _.timeout(1000, 'Operation took too long')

// With Promise.race to limit async task duration
const someAsyncTask = async () => {
  await _.sleep(5000) // Simulate a long-running task
  return 'Task completed'
}

// Will reject after 1 second if task doesn't complete
const racedTask = await Promise.race([
  someAsyncTask(),
  _.timeout(1000, 'Task exceeded time limit'),
])
```

Thanks to [Marlon Passos](https://github.com/MarlonPassos-git) and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/async/TimeoutError) / [Source](https://github.com/radashi-org/radashi/blob/main/src/async/TimeoutError.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/async/TimeoutError.test.ts)

### Add `dedent` function [→ PR #120](https://github.com/radashi-org/radashi/pull/120)

The `dedent` function removes indentation from a multi-line string, making it easy to format and clean up text templates while preserving the relative indentation of embedded content.

- Supports both explicit and auto-detected indentation
- Works with tagged template strings
- Automatically handles multi-line embedded strings
- Removes the first leading and first trailing empty line
- Preserves relative indentation of content

```typescript
import * as _ from 'radashi'

// Remove auto-detected indentation
const message = _.dedent`
  Hello, world!
  This is a dedented message.
`
// => 'Hello, world!\nThis is a dedented message.'

// Remove specific indentation
const customMessage = _.dedent('\n    Hello\n    World!\n\n', '  ')
// => '  Hello\n  World!\n'
```

Thanks to [Alec Larson](https://github.com/aleclarson) for their work on this feature!

🔗 [Docs](https://radashi.js.org/reference/string/dedent) / [Source](https://github.com/radashi-org/radashi/blob/main/src/string/dedent.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/string/dedent.test.ts)

## New Features

### Add `signal` option to `retry` [→ PR #262](https://github.com/radashi-org/radashi/pull/262)

The new feature introduces an optional `signal` parameter to both the `retry` function, allowing for manual interruption of async operations using `AbortController`.

- The `signal` option accepts an `AbortController.signal`
- When the signal is aborted, no more calls to the callback will be made
- Aborting will throw a `DOMException` with the message "This operation was aborted"
- Works consistently across Node.js and browser environments

```typescript
import * as _ from 'radashi'

const abortController = new AbortController()
const signal = abortController.signal

const promise = _.retry(
  { times: 3, delay: 1000, signal },
  async () => await fetchSomeData(),
)

// To abort the operation:
abortController.abort()
```

Thanks to [ts-saidbe.abdiganiev](https://github.com/SaidbekAbdiganiev) and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

### Add `signal` option to `parallel` [→ PR #262](https://github.com/radashi-org/radashi/pull/262)

The latest update adds an optional `signal` option to the `parallel` function, allowing you to interrupt parallel processing with an `AbortController`.

- The `signal` option works with an `AbortController.signal`
- When aborted, it will throw a `DOMException` with an `"AbortError"` name
- Interruption only stops future iterations, not in-progress async calls
- Signals are compatible with both browser and Node.js environments

```typescript
import * as _ from 'radashi'

// Abort a parallel operation
const abortController = new AbortController()
const signal = abortController.signal

const pizzas = await _.parallel(
  { limit: 2, signal },
  ['pepperoni', 'cheese', 'mushroom'],
  async topping => {
    return await bakePizzaInWoodFiredOven(topping)
  },
)

// Abort the operation if needed
abortController.abort()
```

Thanks to [ts-saidbe.abdiganiev](https://github.com/SaidbekAbdiganiev) and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

### Tolerate out-of-range `parallel` limit [→ PR #238](https://github.com/radashi-org/radashi/pull/238)

The `parallel` function now automatically clamps the concurrency limit between 1 and the input array's length, ensuring more predictable and safe parallel processing.

- Previously, passing a limit larger than the array length or less than 1 could cause unexpected behavior
- The limit is now automatically adjusted to be within the valid range

```typescript
import * as _ from 'radashi'

// Limit will be adjusted to 3 (array length)
const results = await _.parallel(
  10,
  ['item1', 'item2', 'item3'],
  async item => {
    // Process each item
    return item.toUpperCase()
  },
)
```

Thanks to [Marlon Passos](https://github.com/MarlonPassos-git) and [Alec Larson](https://github.com/aleclarson) for their work on this feature!

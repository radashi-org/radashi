## Features

#### Allow throttled function to be triggered immediately [→ PR #128](https://github.com/radashi-org/radashi/pull/128)

The `debounce` function now accepts a `leading` option that decides whether the source function is called on the first invocation of the throttled function or not. This can be useful in scenarios where you want the source function to be called immediately on the first invocation, even if additional invocations will be debounced.

```ts
import { debounce } from 'radashi'

const handleClick = debounce({ delay: 100, leading: true }, () => {
  // This function will be called immediately on the first click,
  // and then again after 100ms of no further clicks.
  console.log('Clicked!')
})

handleClick() // Clicked!
handleClick() // (nothing)
// After 100ms
handleClick() // Clicked!
```

#### Add `isResult`, `isResultOk`, and `isResultErr` functions [→ PR #172](https://github.com/radashi-org/radashi/pull/172)

These new functions help to work with "Result" tuples, which represent the success or failure of an operation.

The `isResult` function checks if a value is a Result tuple, which is a 2-element array where the first element is either `undefined` (for success) or an error, and the second element is either `undefined` (for failure) or the result value.

The `isResultOk` function checks if a Result tuple represents a successful operation, and the `isResultErr` function checks if it represents a failed operation.

```ts
import * as _ from 'radashi'

if (_.isResult(value)) {
  if (_.isResultOk(value)) {
    value[1] // <-- This is the resulting value!
  } else {
    value[0] // <-- This is the error!
  }
}
```

#### Add `isError` function [→ PR #173](https://github.com/radashi-org/radashi/pull/173)

The `isError` function returns `true` if the input is an instance of the `Error` class or any of its subclasses.

```ts
import * as _ from 'radashi'

_.isError(new Error()) // => true
_.isError(new TypeError()) // => true
_.isError('An error occurred') // => false
_.isError({ message: 'Error' }) // => false
```

### Allow Throttled Function to Be Triggered Immediately
[→ PR #135](https://github.com/radashi-org/radashi/pull/135)

The `throttle` function now includes a `trigger` method on the returned throttled function. This allows the wrapped function to be invoked immediately, bypassing any throttling that may be in effect. After the `trigger` method is called, a new throttled call will be allowed after the specified interval has passed.

This can be useful when you want to ensure a function is called at least once, even if it's being throttled.

```typescript
import { throttle } from 'radashi'

const logMessage = (message: string) => {
  console.log(`Message: ${message}`)
}
const throttledLog = throttle({ interval: 1000 }, logMessage)

throttledLog('First call')  // Logs immediately
throttledLog('Throttled')   // Doesn't log (throttled)

// Force a log, bypassing the throttle
throttledLog.trigger('Forced log')  // Logs immediately

// Check if it's still throttled
throttledLog.isThrottled()  // => true
```

### Add Trailing Option to Throttle
[→ PR #127](https://github.com/radashi-org/radashi/pull/127)

The `throttle` function now accepts an optional `trailing` option, which controls whether the wrapped function should be called after the throttle period if it was invoked during the throttled time.

This can be useful when you want to ensure the function is called at the end of a series of rapid invocations, even if it's being throttled.

```typescript
// Throttle a scroll event handler, calling it after each throttle period
const handleScroll = () => {
  console.log('Scroll position:', window.scrollY)
}
const throttledScroll = throttle({ interval: 200, trailing: true }, handleScroll)
window.addEventListener('scroll', throttledScroll)

// Throttle an API call, calling it after each throttle period
const throttledFetch = throttle(
  { interval: 5000, trailing: true },
  async () => {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  },
)
```

### Calculate String Similarity Using Levenshtein Distance
[→ PR #122](https://github.com/radashi-org/radashi/pull/122)

The new `similarity` function calculates the Levenshtein distance between two input strings, which represents the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other.

This function is useful for various applications, including spell checking, fuzzy string matching, DNA sequence analysis, and plagiarism detection.

```typescript
import * as _ from 'radashi'

// Identical strings
_.similarity('hello', 'hello') // => 0

// One character difference
_.similarity('kitten', 'sitten') // => 1

// Multiple differences
_.similarity('saturday', 'sunday') // => 3

// Case sensitivity
_.similarity('foo', 'FOO') // => 3

// Whitespace significance
_.similarity('bar ', 'bar') // => 1

// Argument order doesn't matter
_.similarity('abc', 'cba') // => 2
_.similarity('cba', 'abc') // => 2
```

The function returns a `number` representing the Levenshtein distance between the two input strings. A lower number indicates higher similarity, with 0 meaning the strings are identical.

#### Allow Throttled Function to Be Triggered Immediately [→ PR #100](https://github.com/radashi-org/radashi/pull/100)

The `mapify` function now provides an `index` argument to the `getKey` and `getValue` callbacks. This allows you to base the key or value on the current index of the array item, in addition to the item itself.

```ts
import { mapify } from 'radashi'

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]

const map = mapify(
  items,
  (item, index) => `item-${index}`,
  (item) => item.name,
)

console.log(map)
// Map {
//   'item-0' => 'Item 1',
//   'item-1' => 'Item 2',
//   'item-2' => 'Item 3',
// }
```

#### Add `noop` and `always` Functions [→ commit eb77c8f](https://github.com/radashi-org/radashi/commit/eb77c8f004a35f1499968f6e40d01b3595384848)

The `noop` function is a callback that does nothing and returns `undefined`. This can be useful for providing a default callback when one is optional.

```ts
import { noop } from 'radashi'

noop() // => undefined
noop(1) // => undefined
noop(1, 2, 3) // => undefined
```

The `always` function creates a function that always returns the same value. This can be useful for providing a constant value as a callback.

```ts
import { always } from 'radashi'

const alwaysTrue = always(true)
alwaysTrue() // true
alwaysTrue() // true
alwaysTrue() // true
```

#### Add `isBoolean` Function [→ commit adc419d](https://github.com/radashi-org/radashi/commit/adc419d5bbb1786d75619ed3d7f41a45f68c9857)

The `isBoolean` function returns `true` if the given value is a boolean type. Boxed boolean values (e.g. `new Boolean(false)`) are not considered booleans by this function.

```ts
import { isBoolean } from 'radashi'

isBoolean(true) // true
isBoolean(false) // true
isBoolean('true') // false
isBoolean(1) // false
isBoolean(new Boolean(true)) // false
isBoolean(undefined) // false
isBoolean(null) // false
```

#### Add Reverse Argument to `castComparator` [→ commit 1d7937e](https://github.com/radashi-org/radashi/commit/1d7937ef006139883aedac782ad032c1d6269c7a)

The `castComparator` function now accepts an optional `reverse` argument that, when `true`, will reverse the order of the comparison.

```ts
import { castComparator } from 'radashi'

const compareByName = castComparator('name')
const compareByNameReversed = castComparator('name', null, true)

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
]

items.sort(compareByName)
// => [
//   { id: 1, name: 'Item 1' },
//   { id: 2, name: 'Item 2' },
//   { id: 3, name: 'Item 3' },
// ]

items.sort(compareByNameReversed)
// => [
//   { id: 3, name: 'Item 3' },
//   { id: 2, name: 'Item 2' },
//   { id: 1, name: 'Item 1' },
// ]
```

### Allow throttled function to be triggered immediately

[→ PR #110](https://github.com/radashi-org/radashi/pull/110)

The `throttle` function has been updated to include an `immediate` option. When set to `true`, the throttled function will be triggered immediately on the first call, and subsequent calls will be throttled.

```ts
import * as _ from 'radashi'

const onClick = _.throttle(() => {
  console.log('Button clicked')
}, 1000, { immediate: true })

onClick() // logs 'Button clicked' immediately
onClick() // does nothing for 1 second
```

### Cast a value into a comparator function

[→ PR #34](https://github.com/radashi-org/radashi/pull/34)

The `castComparator` function allows you to create a comparator function that can be passed into `Array.prototype.sort`. It accepts either a property name or a mapping function. Optionally, you can pass a custom compare function (e.g. for `localeCompare` use cases).

```ts
import * as _ from 'radash'

const users = [
  { id: 1, firstName: 'Alice', lastName: 'Smith' },
  { id: 3, firstName: 'Charlie', lastName: 'Brown' },
  { id: 2, firstName: 'Drew', lastName: 'Johnson' },
]

const compareById = _.castComparator('id')
users.sort(compareById)
// [Alice, Drew, Charlie]

const compareByFullName = _.castComparator(
  user => `${user.firstName} ${user.lastName}`,
  (a, b) => b.localeCompare(a),
)
users.sort(compareByFullName)
// [Alice, Charlie, Drew]
```

### Cast a value into an array

[→ PR #97](https://github.com/radashi-org/radashi/pull/97)

The `castArray` function ensures that the input value is always returned as an array. If the input is already an array, it returns a shallow copy of the array. If the input is not an array, it wraps the input in a new array.

```ts
import * as _ from 'radashi'

_.castArray(1) // => [1]
_.castArray([1, 2, 3]) // => [1, 2, 3]
_.castArray('hello') // => ['hello']
```

### Cast a non-nullish value into an array

[→ PR #97](https://github.com/radashi-org/radashi/pull/97)

The `castArrayIfExists` function ensures that a non-nullish input value is always returned as an array. If the input is already an array, it returns a shallow copy of the array. If the input is not an array, it wraps the input in a new array. Nullish values (null or undefined) are passed through as is.

```ts
import * as _ from 'radashi'

_.castArrayIfExists(1) // => [1]
_.castArrayIfExists([1, 2, 3]) // => [1, 2, 3]
_.castArrayIfExists('hello') // => ['hello']
_.castArrayIfExists(null) // => null
_.castArrayIfExists(undefined) // => undefined
```

### Limit the range of a variable number

[→ PR #106](https://github.com/radashi-org/radashi/pull/106)

The `clamp` function restricts a number to be within a specified range.

- It takes three arguments: the number to clamp, the minimum value, and the maximum value.
- If the number is less than the minimum, it returns the minimum.
- If the number is greater than the maximum, it returns the maximum.
- Otherwise, it returns the number itself.

```ts
import * as _ from 'radashi'

_.clamp(5, 1, 10) // returns 5
_.clamp(0, 1, 10) // returns 1
_.clamp(15, 1, 10) // returns 10

// Invalid range
_.clamp(1, 10, 1) // throws
```

### Cast a value into a mapping function

[→ PR #43](https://github.com/radashi-org/radashi/pull/43)

Improve your own utility function by adding a flexible value-mapping option, using `castMapping` to retrieve a mapping function.

The following types can be casted into a mapping function:

1. **Function**: If the input is a function, it returns the function as is.
2. **Property Name**: If the input is a property name, it returns a function that retrieves the value of that property from an object.
3. **Nullish**: If the input is nullish (null or undefined), it returns a function that simply returns the input object itself.

```ts
import * as _ from 'radashi'

// Using a property name
const getName = _.castMapping('name')
getName({ name: 'Alice' }) // => 'Alice'

// Using a function
const getLength = _.castMapping((str: string) => str.length)
getLength('Hello') // => 5

// Using undefined
const identity = _.castMapping(undefined)
identity({ any: 'value' }) // => { any: 'value' }
```

#### Allow deep copying of objects and arrays

[→ PR #81](https://github.com/radashi-org/radashi/pull/81)

The `cloneDeep` function creates a deep copy of an object or array. It supports cloning of plain objects, arrays, `Map` instances, and `Set` instances by default. The default behavior can be customized by providing a partial `CloningStrategy` implementation.

For better performance, the `FastCloningStrategy` can be used to clone objects using the spread operator, which skips non-enumerable properties and computed properties.

Here's an example of how to use `cloneDeep`:

```ts
import * as _ from 'radashi'

const obj = { a: 1, b: { c: 2 } }
const clone = _.cloneDeep(obj)

assert(clone !== obj)
assert(clone.b !== obj.b)
assert(JSON.stringify(clone) === JSON.stringify(obj))
```

#### Allow deep traversal of objects and arrays

[→ PR #59](https://github.com/radashi-org/radashi/pull/59)

The `traverse` function recursively visits each property of an object (or each element of an array) and its nested objects or arrays. By default, the only nested objects to be traversed are plain objects and arrays.

Traversal is performed in a depth-first manner, and circular references are skipped. The traversal can be customized by providing a `TraverseVisitor` function and optional `TraverseOptions`.

Here's an example of how to use `traverse`:

```ts
import * as _ from 'radashi'

const root = { a: { b: 2 }, c: [1, 2] }

_.traverse(root, (value, key, parent, context) => {
  const depth = context.parents.length
  console.log(' '.repeat(depth * 2), key, '=>', value)
})
// Logs the following:
//   a => { b: 2 }
//     b => 2
//   c => [1, 2]
//     0 => 1
//     1 => 2
```

#### Add `isWeakMap` and `isWeakSet` functions

[→ PR #77](https://github.com/radashi-org/radashi/pull/77)

The `isWeakMap` and `isWeakSet` functions return `true` for `WeakMap` and `WeakSet` instances, respectively, even if they are subclass instances or from other realms.

```ts
import * as _ from 'radashi'

_.isWeakMap(new WeakMap()) // true
_.isWeakMap(new (class extends WeakMap {})()) // true

_.isWeakSet(new WeakSet()) // true
_.isWeakSet(new (class extends WeakSet {})()) // true
```

#### Add `isSet` function [→ PR #77](https://github.com/radashi-org/radashi/pull/77)

Returns true for `Set` instances, even if they are subclass instances or from other [realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms).

```ts
import * as _ from 'radashi'

_.isSet(new Set()) // true
_.isSet(new (class extends Set {})()) // true
```

#### Add `isRegExp` function [→ PR #77](https://github.com/radashi-org/radashi/pull/77)

Returns true for `RegExp` instances, even if they are subclass instances or from other [realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms).

```ts
import * as _ from 'radashi'

_.isRegExp(/.+/) // true
_.isRegExp(new RegExp('.+')) // true
_.isRegExp(new (class extends RegExp {})('.+')) // true
```

#### Add `isMap` function [→ PR #77](https://github.com/radashi-org/radashi/pull/77)

Returns true for `Map` instances, even if they are subclass instances or from other [realms](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms).

```ts
import * as _ from 'radashi'

_.isMap(new Map()) // true
_.isMap(new (class extends Map {})()) // true
```

#### Add `lerp` function [→ PR #86](https://github.com/radashi-org/radashi/pull/86)

The `lerp` function is used to linearly interpolate between two numbers based on a specified amount. This function is particularly useful in animations, graphics, and games for smooth transitions.

```ts
import * as _ from 'radashi'

_.lerp(0, 10, 0.5) // => 5
_.lerp(5, 15, 0.2) // => 7
_.lerp(-10, 10, 0.75) // => 5
```

## Etymology

The name `lerp` is short for "linear interpolation". It's a term from computer graphics that means "interpolate linearly between two values".

For more information, check out the [Wikipedia article](https://en.wikipedia.org/wiki/Linear_interpolation) on linear interpolation.

#### Add `once` function [→ PR #80](https://github.com/radashi-org/radashi/pull/80)

Create a wrapper around a given function such that it executes at most once. Subsequent calls to the wrapped function return the result from the first execution, regardless of the arguments provided. This behavior is akin to memoization but specifically designed for single-use functions. The result of the first call is stored internally, allowing for efficient retrieval without recomputation.

```ts
import * as _ from 'radashi'

const fn = once(() => Math.random())
fn() // 0.5
fn() // 0.5
```

#### Allow `pick` function to accept a callback for advanced picking [→ PR #30](https://github.com/radashi-org/radashi/pull/30)

The `pick` function can also accept a predicate function as the filter argument. This allows for more complex filtering logic beyond simple key inclusion or exclusion.

```ts
import * as _ from 'radashi'

const source = { a: 1, b: 2, c: 3, d: 4 }

_.pick(source, (value, key) => {
  return value % 2 === 0 // Include only even values
})
// => { b: 2, d: 4 }
```

#### Add `flip` function [→ PR #35](https://github.com/radashi-org/radashi/pull/35)

Return a new function that swaps the only two arguments of the original function. This is most useful for reversing the order of a "comparator" (i.e. a function used for sorting).

```ts
import * as _ from 'radashi'

const subtract = (a: number, b: number) => a - b

subtract(1, 2) // => -1
_.flip(subtract)(1, 2) // => 1
```

Note that functions with more than two arguments are not supported.

#### Add `unzip` function [→ PR #64](https://github.com/radashi-org/radashi/pull/64)

Creates an array of ungrouped elements, where each resulting array contains all elements at a specific index from the input arrays. The first array contains all first elements, the second array contains all second elements, and so on.

```ts
import * as _ from 'radashi'

_.unzip([
  ['a', 1, true],
  ['b', 2, false],
])
// => [
//   ['a', 'b'],
//   [1, 2],
//   [true, false],
// ]
```

#### Allow throttled function to be triggered immediately

[→ PR #110](https://github.com/radashi-org/radashi/pull/110)

The `_.throttle` function now supports an `immediate` option that allows the throttled function to be triggered immediately on the first call, rather than waiting for the specified delay. This can be useful in certain scenarios where immediate execution is desired, while still enforcing the throttling behavior for subsequent calls.

```ts
import { throttle } from 'radashi'

const handleClick = throttle(() => {
  console.log('Button clicked!')
}, 1000, { immediate: true })

handleClick() // Output: "Button clicked!"
```

#### Convert an array to a map

[→ PR #58](https://github.com/radashi-org/radashi/pull/58)

The new `_.mapify` function allows you to convert an array of items into a Map, where the keys and values are determined by provided functions. This can be useful when you need to quickly access data from an array using a specific key.

```ts
import { mapify } from 'radashi'

const fish = [
  { name: 'Marlin', weight: 105 },
  { name: 'Bass', weight: 8 },
  { name: 'Trout', weight: 13 },
]

const fishByName = _.mapify(fish, f => f.name)
// => Map(3) {'Marlin' => { name: 'Marlin', weight: 105 }, 'Bass' => { name: 'Bass', weight: 8 }, 'Trout' => { name: 'Trout', weight: 13 }}

const fishWeightByName = _.mapify(fish, f => f.name, f => f.weight)
// => Map(3) { 'Marlin' => 105, 'Bass' => 8, 'Trout' => 13 }
```

#### Round a number to a specified precision

[→ PR #53](https://github.com/radashi-org/radashi/pull/53)

The new `_.round` function allows you to round a number to a specified precision. The precision can be a positive or negative integer, and an optional rounding function (e.g., `Math.floor` or `Math.ceil`) can be provided.

```ts
import { round } from 'radashi'

round(123.456) // => 123
round(1234.56, -2) // => 1200
round(4.001, 2, Math.ceil) // => 4.01
round(4.089, 2, Math.floor) // => 4.08
```

#### Allow filtering and mapping of object keys

[→ commit b10ad105bada331494c232b7a28f9d76ff77dded](https://github.com/radashi-org/radashi/commit/b10ad105bada331494c232b7a28f9d76ff77dded)

The `_.filterKey` function now supports `null` and `undefined` as valid filter values, in addition to the existing array and function-based filters. This allows more flexibility in how object keys are filtered.

```ts
import { filterKey } from 'radashi'

const obj = { a: 1, b: 2, c: 3 }

filterKey(obj, 'a', ['a', 'b']) // true
filterKey(obj, 'b', ['a', 'b']) // true
filterKey(obj, 'c', ['a', 'b']) // false

filterKey(obj, 'a', null) // true
filterKey(obj, 'b', null) // true
filterKey(obj, 'c', null) // true

filterKey(obj, 'a', undefined) // true
filterKey(obj, 'b', undefined) // true
filterKey(obj, 'c', undefined) // true

filterKey(obj, 'a', key => key.length === 1) // true
filterKey(obj, 'b', key => key.length === 1) // true
filterKey(obj, 'c', key => key.length === 1) // true
```

#### Allow throttled function to be triggered immediately
[→ PR #28](https://github.com/radashi-org/radashi/pull/28)

The `matchKeys` function has been replaced with the `filterKey` function. `filterKey` provides the same functionality as `matchKeys`, allowing you to filter an object's properties based on either an array of keys or a function that returns a boolean for each property. However, the new implementation is more straightforward and efficient.

The `KeyFilter` type is still provided and can be used to ensure type safety when working with the `filterKey` function.

```ts
import { filterKey, KeyFilter } from 'radash'

function filterObject(obj: object, filter: KeyFilter) {
  for (const key in obj) {
    if (filterKey(obj, key, filter)) {
      // ...
    }
  }
}
```

#### Create a key-matching function
[→ commit 069c986](https://github.com/radashi-org/radashi/commit/069c986ac3649b060d926ec5f8447f0ac6f568b2)

The `matchKeys` function has been added to Radashi. This function allows you to create a key-matching function that can be used to filter an object's properties. It accepts either an array of keys (an allowlist) or a function that returns a boolean for each property.

The `KeyFilter` type is provided to ensure type safety when working with `matchKeys`.

```ts
import { matchKeys, KeyFilter } from 'radash'

// Define your function with a `KeyFilter` parameter type,
// then use `matchKeys` to create a function that will
// filter the object's properties for you.
function filterObjectSomeway(obj: object, keys: KeyFilter) {
  const matches = matchKeys(keys)
  for (const key in obj) {
    const value = obj[key]
    if (matches(value, key, obj)) {
      // ...
    }
  }
}
```

#### Let `select` function work without a condition callback
[→ PR #9](https://github.com/radashi-org/radashi/pull/9)

The `select` function now allows you to omit the `condition` callback parameter. When the `condition` parameter is not provided, the `select` function will map all the items in the array, regardless of any condition.

```ts
import { select } from 'radash'

const list = [{ a: 1 }, { b: 2 }, { a: 3 }, { a: null }, { a: undefined }]
const result = select(list, obj => obj.a)
// result = [1, 3]
```

#### Support any value in the `unique` function
[→ PR #10](https://github.com/radashi-org/radashi/pull/10)

The `unique` function now supports any value as the key for identifying unique items in the array, not just strings, numbers, or symbols. The `toKey` function can return any kind of value, and the function will correctly identify unique items based on that value.

```ts
import { unique } from 'radash'

const list: any[] = [
  null,
  null,
  true,
  true,
  'true',
  false,
  { id: 'a', word: 'hello' },
  { id: 'a', word: 'hello' }
]
const result = unique(list, val => (val && val.id) ?? val)
// result = [null, true, 'true', false, { id: 'a', word: 'hello' }]
```

#### Allow throttled function to be triggered immediately [→ PR #11](https://github.com/radashi-org/radashi/pull/11)

The `intersects` function now allows the `identity` callback to return any value, instead of just string, number, or symbol. This enables using complex objects as the elements in the arrays being checked for intersection.

```ts
import { intersects } from 'radashi'

const obj1 = { id: 1 }
const obj2 = { id: 2 }
const obj3 = { id: 3 }

const hasIntersection = intersects([obj1, obj2], [obj2, obj3])
// => true

const hasNoIntersection = intersects([obj1], [obj3])
// => false
```

#### Add `isPlainObject` type guard [→ PR #16](https://github.com/radashi-org/radashi/pull/16)

The new `isPlainObject` function can be used to determine if a value is a plain object, as opposed to an instance of a custom class or a special object like `Date`.

```ts
import { isPlainObject } from 'radashi'

isPlainObject({}) // => true
isPlainObject(Object.create(null)) // => true

isPlainObject([]) // => false
isPlainObject(null) // => false
isPlainObject(new Date()) // => false
```

#### Add `isIntString` function [→ commit fa500d3](https://github.com/radashi-org/radashi/commit/fa500d329d7e06062e7a42cbf4ff9ad9dcb89191)

The new `isIntString` function can be used to determine if a string value represents an integer.

```ts
import { isIntString } from 'radashi'

isIntString('12') // => true
isIntString('-12') // => true

isIntString('12.233') // => false
isIntString('12.0') // => false
isIntString('+12') // => false

isIntString('hello') // => false
isIntString(null) // => false
isIntString(12) // => false
```



## Bug Fixes

#### Handle camel-cased strings correctly [→ PR #178](https://github.com/radashi-org/radashi/pull/178)

The `pascal` function has been updated to correctly handle camel-cased strings. Previously, the function would split the input string on non-word characters (`.`, `-`, `_`, and whitespace) and then capitalize the first letter of each part. This approach didn't work well for camel-cased strings like `"helloWorld"`.

The updated implementation uses a regular expression to identify the first character of each word, as well as any capitalized letters that should be preserved. This ensures that camel-cased strings are converted to proper Pascal case correctly.

```ts
import { pascal } from 'radashi'

pascal('helloWorld') // => 'HelloWorld'
```

#### Use -1 as index for `toKey()` with toggled `item` [→ PR #167](https://github.com/radashi-org/radashi/pull/167)

The `toggle` function has been updated to pass an index of `-1` when calling the `toKey` function with the `item` to be toggled. This ensures that the `toKey` function can correctly identify the item, even if it doesn't exist in the array.

Previously, the `toKey` function was called with the current index of the item in the array, which could lead to incorrect behavior if the item didn't exist.

```ts
import { toggle } from 'radashi'

const gods = ['ra', 'zeus', 'loki']
toggle(gods, 'vishnu', g => g.name) // => ['ra', 'zeus', 'loki', 'vishnu']
```

#### Fix handling of period-containing property names [→ PR #95](https://github.com/radashi-org/radashi/pull/95)

The `crush` function has been updated to correctly handle object properties with periods in their names. Previously, the function would not correctly flatten these properties, leading to unexpected behavior.

The updated implementation uses a recursive approach to traverse the input object and build the flattened output, ensuring that all properties are correctly included, regardless of their naming conventions.

```ts
import { crush } from 'radashi'

const data = {
  name: 'ra',
  'children.0.name': 'hathor',
}
crush(data) // => { name: 'ra', 'children.0.name': 'hathor' }
```

#### Fix overriding a nested object with null [→ PR #112](https://github.com/radashi-org/radashi/pull/112)

The `assign` function has been updated to correctly handle the case where a nested object is being overridden with a `null` value. Previously, the function would incorrectly preserve the nested object, even when the override value was `null`.

The updated implementation checks if the override value is a plain object before merging it with the initial value, ensuring that `null` values correctly replace the nested objects.

```ts
import { assign } from 'radashi'

const initial = { name: 'ra', children: { age: 42 } }
const override = { children: null }
assign(initial, override) // => { name: 'ra', children: null }
```

#### Handle falsy input as expected in `toggle`
[→ PR #82](https://github.com/radashi-org/radashi/pull/82)

The `toggle` function now handles falsy input more consistently. If the `array` parameter is falsy, it will return an empty array if `item` is also falsy, or an array containing only `item` if it's provided. If the `item` parameter is falsy, the function will return a shallow copy of the `array` parameter.

```ts
import { toggle } from 'radashi'

toggle(undefined, 'foo') // ['foo']
toggle(['bar'], undefined) // ['bar']
toggle(undefined, undefined) // []
```

#### `toInt` and `toFloat` should not throw on symbols
[→ PR #67](https://github.com/radashi-org/radashi/pull/67)

The `toInt` and `toFloat` functions now handle symbols more gracefully. Instead of throwing an error, they will return `NaN` if the input value is a symbol, and fall back to the provided default value if one is specified.

```ts
import { toInt, toFloat } from 'radashi'

toInt(Symbol('foo')) // NaN
toInt(Symbol('foo'), 0) // 0
toFloat(Symbol('bar')) // NaN
toFloat(Symbol('bar'), 0.0) // 0.0
```

#### Use `typeof` in `isFunction`
[→ commit 6ad96f4](https://github.com/radashi-org/radashi/commit/6ad96f44f17949ee33acda9a073307b19dca7796)

The `isFunction` utility now uses the `typeof` operator instead of duck typing to determine if a value is a function. This ensures that the function handles edge cases more reliably.

```ts
import { isFunction } from 'radashi'

isFunction(() => {}) // true
isFunction(Object) // true
isFunction(null) // false
isFunction(undefined) // false
```

#### Ensure `mapValues` and `group` work together
[→ PR #24](https://github.com/radashi-org/radashi/pull/24)

The `group` function now returns a more accurate type, ensuring that `mapValues` can be used effectively with the result. The types of the resulting object's properties are now marked as optional, matching the behavior of the `group` function.

```ts
import { group, mapValues } from 'radashi'

const objects = [
  { id: 1, group: 'a' },
  { id: 2, group: 'b' },
  { id: 3, group: 'a' }
]

const groupedObjects = group(objects, obj => obj.group)
const groupedIds = mapValues(groupedObjects, array => {
  return array.map(obj => obj.id)
})

// groupedIds is now typed as { [key: string]: number[] | undefined }
```

#### Improve performance by avoiding excessive array allocations in `keys` function [→ PR #25](https://github.com/radashi-org/radashi/pull/25)

The `keys` function has been optimized to avoid excessive array allocations by using a recursive approach with a shared `keyPath` array. This reduces the memory overhead and improves the overall performance of the function.

```ts
import { keys } from 'radashi'

const object = {
  name: 'ra',
  children: [{ name: 'hathor' }]
}

keys(object) // ['name', 'children.0.name']
```

#### Make `isArray` work with `readonly T[]` types [→ commit 88c12b6](https://github.com/radashi-org/radashi/commit/88c12b6e3941b1fa6072b9ec9bf214c508e7bb70)

The `isArray` function has been updated to work correctly with `readonly T[]` types. This ensures that the type of the array elements is preserved when using `isArray`.

```ts
import { isArray } from 'radashi'

declare const a: number | number[]
declare const b: string | readonly string[]

if (isArray(a)) a.forEach(item => { /* ✅ item is number */ })
if (isArray(b)) b.forEach(item => { /* ✅ item is string */ })
```

#### Avoid using `isObject` internally and use `isPlainObject` instead [→ PR #18](https://github.com/radashi-org/radashi/pull/18)

The internal use of `isObject` has been replaced with `isPlainObject` to ensure that objects created with `Object.create(null)` are handled correctly. This change improves the consistency and robustness of the library.

```ts
import { assign, keys } from 'radashi'

const object = Object.create(null)
object.a = 1
object.b = [2]
object.c = { d: 3 }

assign({}, object) // { a: 1, b: [2], c: { d: 3 } }
keys(object) // ['a', 'b.0', 'c.d']
```

#### Implement a more robust `isPlainObject` function [→ commit 08a18e2](https://github.com/radashi-org/radashi/commit/08a18e218d83bf094354d4af1b5c9dcf92c18d1f)

The `isPlainObject` function has been updated to use a more robust implementation that addresses some edge cases. This change ensures that the function correctly identifies plain objects, even in the presence of certain object irregularities.

```ts
import { isPlainObject } from 'radashi'

isPlainObject({}) // true
isPlainObject(Object.create(null)) // true
isPlainObject(new Date()) // false
```

#### Allow `items` param to be a readonly array in `series` function
[→ PR #14](https://github.com/radashi-org/radashi/pull/14)

The `series` function now accepts a `readonly T[]` for the `items` parameter, allowing the caller to pass in a read-only array. This change ensures that the function can handle immutable data structures without requiring the caller to create a new array.

```ts
import { series } from 'radashi'

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const
const sut = series(days)
```

#### Stop using `Omit` on return type and give `filter` parameter a safer type in `shake` function
[→ PR #12](https://github.com/radashi-org/radashi/pull/12)

The `shake` function no longer uses `Omit` on the return type, instead, it now returns the original type `T`. Additionally, the `filter` parameter has been given a safer type, accepting a predicate function that checks the value of the object properties.

```ts
import { shake } from 'radashi'

const obj = { a: 1, b: undefined, c: 3 }
const result = shake(obj, value => value !== undefined)
// result: { a: 1, c: 3 }
```

#### Avoid false positive of array index in `set` function
[→ PR #15](https://github.com/radashi-org/radashi/pull/15)

The `set` function has been improved to correctly handle keys that start with numbers. It now uses the `isIntString` function to detect if a key should be treated as an array index. Additionally, the implementation has been simplified by using a reducer and the `??=` operator.

```ts
import { set } from 'radashi'

const obj = {}
const result = set(obj, 'cards.2.value', 2)
// result: { cards: [, , { value: 2 }] }
```

#### Remove inefficiencies in loop in `assign` function
[→ PR #13](https://github.com/radashi-org/radashi/pull/13)

The `assign` function has been optimized by removing unnecessary loop iterations and using a more efficient approach to merging the initial and override objects.

```ts
import { assign } from 'radashi'

const initial = { a: 1, b: 2 }
const override = { b: 3, c: 4 }
const result = assign(initial, override)
// result: { a: 1, b: 3, c: 4 }
```

#### Stop using `range()` in `retry()`

[→ commit 5d60893](https://github.com/radashi-org/radashi/commit/5d60893471240516a49c6ddf48839165b5961a47)

The `retry()` function has been updated to use a `while (true)` loop instead of `range()`. This change was made for two reasons:

1. Not using `range()` is just as concise.
2. Using `while (true)` makes coverage detection happy without a magic comment.

```ts
import { retry, sleep, tryit } from 'radashi'

async function myFunc() {
  return await retry(async () => {
    // some async operation
  }, { times: 3, delay: 1000, backoff: (attempt) => attempt * 1000 })
}
```



## Performance

- Use the Fisher-Yates algorithm to improve the performance of the `shuffle` function. [→ PR #76](https://github.com/radashi-org/radashi/pull/76)
- Avoid creating 2 intermediate arrays in the `replaceOrAppend` function. [→ PR #62](https://github.com/radashi-org/radashi/pull/62)
- Avoid calling the user-provided `key` generator more than once per item and avoid the use of an arrow function in the loop in the `merge` function. [→ PR #60](https://github.com/radashi-org/radashi/pull/60)
- Avoid creating 2 intermediate arrays in the `replace` function. [→ PR #61](https://github.com/radashi-org/radashi/pull/61)

- Avoid an array allocation in the `cluster` function by using a `for` loop instead of `Array.fill().map()` [→ PR #63](https://github.com/radashi-org/radashi/pull/63)
- Avoid object spread in the `series` function's loop by using a `for` loop and individual object property assignments instead [→ PR #37](https://github.com/radashi-org/radashi/pull/37)
- Make the `template` function faster by using a `while` loop and string concatenation instead of `Array.from().reduce()` [→ PR #32](https://github.com/radashi-org/radashi/pull/32)
- Avoid excessive array allocation in the `fork` function by using a `for` loop and direct array updates instead of `reduce()` [→ PR #33](https://github.com/radashi-org/radashi/pull/33)

- Separate `cloneObject` out from `clone` function to avoid unnecessary type checks for internal use cases. [→ PR #19](https://github.com/radashi-org/radashi/pull/19)
- Use `cloneObject` instead of `clone` in the `set` function to ensure proper cloning of the initial object. [→ commit 9e4933d](https://github.com/radashi-org/radashi/commit/9e4933d7382649f3c3aba8e3ab3eac3d1bb9c735)



## Types

- fix(types): align `isPromise` return type with its logic ([→ PR #175](https://github.com/radashi-org/radashi/pull/175))
- feat(types): add Ok/Err/Result/ResultPromise types ([→ PR #132](https://github.com/radashi-org/radashi/pull/132))
- fix(types): make `assign` return type more accurate + add `Assign` type ([→ PR #142](https://github.com/radashi-org/radashi/pull/142))
- fix(types): remove type constraint for mapped array passed to `sum` ([→ PR #143](https://github.com/radashi-org/radashi/pull/143))

- Fix `shift` function to accept a readonly array type. [→ PR #126](https://github.com/radashi-org/radashi/pull/126)
- Make the `select` function more option-friendly by accepting `null` or `undefined` for the `condition` parameter. [→ PR](https://github.com/radashi-org/radashi/commit/c9cfcd0a7eb1af98682f5d9b56555162c92b7085)
- Handle tuples in the `isArray` return type. [→ PR](https://github.com/radashi-org/radashi/commit/925753578761bda277838bf8fbbcc24b3813f2b9)
- Improve the return type of the `filterKey` function. [→ PR](https://github.com/radashi-org/radashi/commit/bc298c6cfcaaf74726e1f2b901e210dea1fed641)

- Add `FilteredKeys` type that extracts the keys of an object that pass a given filter. [→ PR #110](https://github.com/radashi-org/radashi/pull/110)
- Fix the return type of `select` when no condition is defined. [→ PR #109](https://github.com/radashi-org/radashi/pull/109)
- Improve the `isArray` return type for `unknown` input type. [→ PR #72](https://github.com/radashi-org/radashi/pull/72)
- Allow `zip` to accept readonly arrays. [→ commit 7f93cc9](https://github.com/radashi-org/radashi/commit/7f93cc9c9909e081a2584175154eb4a141d88a3)

- Exported `UppercaseKeys` and `LowercaseKeys` types from the `lowerize` and `upperize` functions respectively. These types are used by the `upperize` and `lowerize` functions respectively. [→ PR #110](https://github.com/radashi-org/radashi/pull/110)
- Added `MemoOptions<T>` type to the `memo` function, which allows customizing the memoization behavior. [→ PR #110](https://github.com/radashi-org/radashi/pull/110)
- Added `TryitResult<T>` type to the `tryit` function, which represents the return type of the `tryit` function. [→ PR #110](https://github.com/radashi-org/radashi/pull/110)
- Changed the `filterKey` function to accept `key: keyof any` instead of `key: string`. This allows the function to work with a wider range of key types. [→ commit 73ac8bba](https://github.com/radashi-org/radashi/commit/73ac8bba9e2a2a39eb3c117cc940cc2b18199834)


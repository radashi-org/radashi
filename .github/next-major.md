If you open a PR that contains a breaking change, add it to this file.

The `####` headline should be short and descriptive of the breaking change. In the body of the section, include a link to the PR. You don't need to include a description of the change itself, as we will extract that from the PR description.

## Breaking Changes

#### Removed default size from `cluster` function

- The `size` parameter is now required.

#### Reworked `debounce` function

- Continue debouncing (in future calls) after `cancel` is called. Previously, `cancel` would disable debouncing, so future calls would be immediate.

  ```ts
  const func = debounce({ delay: 1000 }, mockFunc)

  func()
  func.cancel()

  vi.advanceTimersByTime(1001)
  expect(mockFunc).toHaveBeenCalledTimes(0)

  func()

  vi.advanceTimersByTime(1001)
  expect(mockFunc).toHaveBeenCalledTimes(1)
  ```

- Do not have `flush` call the underlying function if no call is pending.

  ```ts
  const func = debounce({ delay: 1000 }, mockFunc)
  func.flush()
  expect(mockFunc).toHaveBeenCalledTimes(0) // Would previously have called the function
  ```

- Expose a reference to the underlying function with the new `callee` property.

  ```ts
  const func = debounce({ delay: 1000 }, mockFunc)
  expect(func.callee).toBe(mockFunc)
  ```

#### Change `isNumber` to return true for `NaN` values

Returning true for NaN values allows `isNumber` to perform “type narrowing” in TypeScript without risking a runtime error. This is because NaN is not a valid type in TypeScript, so it cannot be separated from other numbers.

```ts
const value: number | string = NaN

if (!isNumber(value)) {
  // Would previously have caused a runtime error, because `isNumber` returned false for `NaN`
  value.toUpperCase()
}

isNumber(NaN) // => true
```

#### Align the AggregateError polyfill with the native constructor

[PR #487](https://github.com/radashi-org/radashi/pull/487)

#### Drop support for Node 16

- The `engines` field now requires Node 18 or higher.
- The published package is transpiled to ES2022 syntax (was ES2017).

[Issue #406](https://github.com/radashi-org/radashi/issues/406)

#### Allow lossless `crush` ⇄ `construct` use

- `crush` now preserves empty objects and arrays as leaf values instead of dropping them.
- `set` no longer ignores `undefined` values, so `construct` can restore `undefined` properties.

[PR #387](https://github.com/radashi-org/radashi/pull/387)

#### Removed tolerance for `null` and `undefined` inputs

- Functions that don't accept `null`/`undefined` in their type signatures no longer defensively handle them at runtime and may throw instead of returning a default value.
- `clone` now only accepts plain objects and arrays — primitives, functions, and built-ins like `Map`, `Set`, and `Date` are no longer valid inputs.

[PR #70](https://github.com/radashi-org/radashi/pull/70)

#### `trim` requires both arguments

- `trim(str, charsToTrim)` no longer defaults `charsToTrim` to `' '`.

[PR #351](https://github.com/radashi-org/radashi/pull/351)

#### `sort` takes a direction string

- The third parameter is now `direction: 'asc' | 'desc'` instead of `desc: boolean`. For example, `sort(list, g, true)` becomes `sort(list, g, 'desc')`.

[Commit 4e240e3](https://github.com/radashi-org/radashi/commit/4e240e3f068f773fdb4244f9fbed7802129bb92b)

#### `counting` and `objectify` return `Partial<Record<…>>`

- Their return types were wrapped with `Partial`, since keys that never occur are absent from the result.

[PR #377](https://github.com/radashi-org/radashi/pull/377) / [PR #385](https://github.com/radashi-org/radashi/pull/385)

#### `memo` options and types reworked

- `MemoOptions` is now generic over the function type rather than its args tuple.
- Added `cache` option and exported `Memoized`/`MemoCache` types.

[PR #124](https://github.com/radashi-org/radashi/pull/124)

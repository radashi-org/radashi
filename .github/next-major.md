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

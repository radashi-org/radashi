If you open a PR that contains a breaking change, add it to this file.

The `####` headline should be short and descriptive of the breaking change. In the body of the section, include a link to the PR. You don't need to include a description of the change itself, as we will extract that from the PR description.

## Breaking Changes

#### Result type changed from tuple to monomorphic object

The `Result` type has been changed from a tuple implementation `[error, value]` to a monomorphic object structure `{ ok: boolean, value: T, error: E }`. This change affects all Result-related functions and types.

**Reasons:**

- **Better performance**: Monomorphic objects have more predictable performance characteristics than tuples in JavaScript engines. Also the overhead of calling `isResultOk` or `isResultErr` when you already knew it was a `Result` was very high.
- **More flexibility**: This implementation has no restrictions on the types for `TOk` or `TErr`. Even `Result<undefined, undefined>` is now valid.
- **Improved developer experience**: Self-documenting properties (`result.ok`, `result.value`, `result.error`) are more readable than array indices
- **Type safety**: Eliminates confusion about tuple ordering and reduces potential for accessing wrong array positions
- **Consistency**: Aligns with Result patterns used in other languages like Rust and modern JavaScript libraries

**Migration guide:**

- Old tuple construction: `[undefined, value]` for success, `[error, undefined]` for failure
- New object construction: `{ok: true, value, error: undefined}` or use `ok(value)` for success, `{ok: false, value: undefined, error}` or use `err(error)` for failure
- `isResultErr()` and `isResultOk()` functions removed - use `result.ok` property instead
- All async functions (tryit, defer, parallel, retry, toResult) now return the new Result format

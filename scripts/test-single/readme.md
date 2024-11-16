Test a single function, instead of every function.

If another function depends on the one you passed, that function will also be tested, and so on, recursively.

### Usage

From the workspace root:

```sh
pnpm test-single <function-name>
```

#### Examples

```sh
# Test the `cloneDeep` function and any functions
# that depend on it.
pnpm test-single cloneDeep
```

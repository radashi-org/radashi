This is a guide for implementing a new feature or function in Radashi.

## Ground Rules

- The steps must be done in order.
- When a step gives you a command, run it.
- When committing a change, use single quotes for the commit title, to avoid issues with special characters.
- When editing a newly created file, follow its template. For example, a new function's implementation must have a description comment with 1+ minimal code examples. Tests and benchmarks must use the `_` namespace import to access Radashi functions.

## Steps

1. First, ask if this is a breaking change. In other words, are you changing the behavior of existing code in a way that will break existing tests or documentation?

2. If this is a new function, run this command:

```sh
pnpm radashi fn create {function-name} --group {group-name} --description "{description}" --no-editor
```

- The `function-name` should be a camel-case identifier.
- The `group-name` should be one of the following:
  - `array` Functions that operate on arrays.
  - `async` Functions that work with asynchronous code.
  - `curry` Functions that create new functions from existing functions.
  - `function` Misfit functions that don't fit into the other categories.
  - `number` Functions that operate on numbers.
  - `object` Functions that operate on objects.
  - `random` Functions that apply randomness.
  - `string` Functions that operate on strings.
  - `typed` Functions that do runtime type-checking.
- The `description` briefly describes the function's purpose with an incomplete sentence, like "Returns the first element of an array" without punctuation at the end.
- The command creates the following files:
  - `src/{group-name}/{function-name}.ts`
  - `tests/{group-name}/{function-name}.test.ts`
  - `docs/{group-name}/{function-name}.mdx`
  - `benchmarks/{group-name}/{function-name}.bench.ts`

3. If you're making a change/addition to an existing function, you'll be interested in similar files as listed in the previous step, but you'll need to determine the `group-name` first. Then you'll know which files to update.

4. Make the changes you need. For new functions, a benchmark is needed (unless the implementation is extremely simple or is in the `async` or `curry` group). For any new functionality, documentation and tests are required. For bug fixes, a test must exist that verifies the fix was effective.

5. Run the tests to verify your changes. Use this command:

```sh
pnpm test-single run {function-name}
```

6. Commit your changes as `{scope}: {description}` where `scope` is either "fix" or "feat". Use "feat!" as the scope if a breaking change is involved. If an existing function is being changed or fixed, use "{scope}({function-name}): {description}".

7. Fill out the [PR template](.github/pull_request_template.md) and save it to `pr-body.txt`.

8. Create a pull request with this command:

```sh
gh pr create --base {base} --title '{title}' --body "$(cat pr-body.txt)"
```

- The `base` is the branch you're targeting; either `main` or `next` (for breaking changes).
- The `title` should be the same as the commit title.
- The `body` is the filled out PR template.

8. Depending on whether this is a breaking change, you'll need to edit either `.github/next-minor.md` or `.github/next-major.md`. For bug fixes, you can skip this step. In either file, add a new heading describing the change, then add a link to the PR after the heading. Commit the change as `chore: update {file}.md` and push it to the current branch.

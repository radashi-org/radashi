Radashi maintains a plethora of custom scripts to help with development and maintenance. Many of them can be run through the `pnpm` CLI. Others are used by the GitHub Actions workflows. Some are executed manually by the maintainers.

Below is a list of all the scripts in this directory, categorized by purpose. If you're looking to contribute to Radashi, you may find the scripts with a `🏎` icon to be useful, while the rest are likely irrelevant to you.

**Legend:**
- 🏎 = Contribution scripts
- 🔧 = Maintenance scripts

## Scripts

- `format` 🏎  
  Format the codebase using Biome and/or Prettier, depending on which files are being formatted. You may pass filter patterns to only format certain files. If the repository is in a clean state, formatting fixes are automatically committed.
  ```
  pnpm format
  pnpm format src
  ```

- `lint` 🏎  
  Lint the codebase using Biome, CSpell, TypeScript's compiler, and/or the JSR.io CLI. You may pass filter patterns to only lint certain files. The `--base` option can be used to lint only the files that have changed since the specified commit. The `./scripts/` directory won't be linted if you pass `--ignore-scripts`.
  ```
  pnpm lint
  pnpm lint src
  pnpm lint --base <commit>
  pnpm lint --ignore-scripts
  ```

- `test-branch` 🏎  
  Run tests affected by changes made in the current branch.
  ```
  pnpm test-branch
  ```

- `test-single` 🏎  
  Run tests for a single function. While you *could* use `pnpm test <function-name>`, this script will also run tests for functions that depend on the specified function, and test coverage will only be reported for the tested functions.
  ```
  pnpm test-single <function-name>
  ```

- `bench-file` 🔧  
  Used by the `bench-main` and `bench-pr` workflows to run benchmarks for a single file. This is a workaround for out-of-memory issues with Vitest.

- `checkout-pr` 🔧  
  Checkout a pull request into the current branch, but don't commit it. This is used by the `bench-pr` and `register-pr` workflows.

- `publish-version` 🔧  
  Publish a new version to NPM. Used by the `publish-beta`, `publish-latest`, and `publish-patch` workflows.

- `release-notes` 🔧  
  Generate an initial draft of release notes using `git log -p` output and Anthropic Claude.

- `seed-benchmarks` 🔧  
  Seed the `benchmarks` table in Radashi's Supabase instance with benchmark results.

- `seed-merged-functions` 🔧  
  Seed the `merged_functions` table in Radashi's Supabase instance with merged functions.

- `seed-proposed-functions` 🔧  
  Seed the `proposed_functions` table in Radashi's Supabase instance with proposed functions.

- `update-browserslist` 🔧  
  Update the `browserslist` property of `package.json` using the `browserslist-generator` package, so browsers with ES2017 support and Node.js 16+ are included.
  ```
  pnpm update-browserslist
  ```

## Workflows

- `bench-main`  
  Run benchmarks on the `main` branch.

- `bench-pr`  
  Run benchmarks on a pull request.

- `bundle-impact`  
  Analyze the impact of a pull request on the bundle size.
  You can run this locally with `pnpm bundle-impact` to check the impact of your changes (e.g. before opening a pull request).

- `prerelease-pr`  
  Copy a pull request into the `beta` or `next` branch.

- `register-pr`  
  Register a pull request with Radashi's Supabase instance and its Algolia instance. This registry is used by the [Radashi VSCode extension](https://github.com/radashi-org/radashi-tools/tree/master/packages/radashi-vscode)'s `Search Functions` command, which not only searches official functions, but also includes proposed functions from the Pull Requests tab!

## Packages

- `benchmarks`  
  Functions for benchmarking Radashi's performance.

- `biome-config`  
  Biome configuration for Radashi.

- `changelog`  
  Functions for generating a changelog and inferring the next version based on conventional commits. We use the amazing [git-cliff](https://github.com/orhun/git-cliff) package for changelog generation and conventional commit parsing.

- `common`  
  Various utilities used by Radashi scripts.

- `radashi-db`  
  Client libraries for Radashi's Supabase and Algolia databases.

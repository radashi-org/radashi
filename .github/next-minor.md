## Agent skill

The npm package now includes the Radashi agent skill. Compatible package managers can discover it from the installed package; with pnpm v12.11 or later, use `pnpm approve` to approve it. See [#512](https://github.com/radashi-org/radashi/pull/512).

## Fixes and improvements

- `reduce` skips empty slots in sparse arrays, and `timeout` rejects if its custom error function throws. [#497](https://github.com/radashi-org/radashi/pull/497), [#500](https://github.com/radashi-org/radashi/pull/500)
- `mapKeys` includes enumerable symbol keys, and `isMapEqual` distinguishes missing keys from keys with `undefined` values. [#498](https://github.com/radashi-org/radashi/pull/498), [#499](https://github.com/radashi-org/radashi/pull/499)
- `range` and `list` reject nonpositive steps for nonempty ranges. [#501](https://github.com/radashi-org/radashi/pull/501)
- `template` handles non-global and empty-matching custom expressions without stalling. [#503](https://github.com/radashi-org/radashi/pull/503)
- `assign` avoids excessive TypeScript instantiation for option unions, and `parseQuantity` accepts zero and fractional plural units. [#504](https://github.com/radashi-org/radashi/pull/504), [#505](https://github.com/radashi-org/radashi/pull/505)
- `pascal` handles empty input, `camel` handles leading separators, and `set` replaces primitive intermediate values. [#507](https://github.com/radashi-org/radashi/pull/507), [#508](https://github.com/radashi-org/radashi/pull/508), [#509](https://github.com/radashi-org/radashi/pull/509)
- `similarity` uses less memory for its distance calculation. [#510](https://github.com/radashi-org/radashi/pull/510)

The documentation also clarifies infinity handling in `isFloat` and possible negative-zero normalization in `round`. [#513](https://github.com/radashi-org/radashi/pull/513)

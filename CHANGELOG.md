# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [radashi@beta]
### Details
#### <!-- 03 -->Added
- Add `isIntString` function by [@aleclarson](https://github.com/aleclarson) in [fa500d3](https://github.com/radashi-org/radashi/commit/fa500d329d7e06062e7a42cbf4ff9ad9dcb89191)
- Add `isPlainObject` type guard by [@aleclarson](https://github.com/aleclarson) in [#16](https://github.com/radashi-org/radashi/pull/16)

- Add `round` function by [@shan-shaji](https://github.com/shan-shaji) in [#53](https://github.com/radashi-org/radashi/pull/53)

- Add `mapify` function by [@cimbraien](https://github.com/cimbraien) in [#58](https://github.com/radashi-org/radashi/pull/58)

- Add `unzip` function by [@aleclarson](https://github.com/aleclarson) in [#64](https://github.com/radashi-org/radashi/pull/64)


#### <!-- 05 -->Changed
- **(intersects)** Let `identity` callback return any value by [@aleclarson](https://github.com/aleclarson) in [#11](https://github.com/radashi-org/radashi/pull/11)

- **(unique)** Let `toKey` return any kind of value by [@aleclarson](https://github.com/aleclarson) in [#10](https://github.com/radashi-org/radashi/pull/10)

- **(select)** Let `condition` be undefined by [@aleclarson](https://github.com/aleclarson) in [#9](https://github.com/radashi-org/radashi/pull/9)

- Replace `matchKeys` with `filterKey` by [@aleclarson](https://github.com/aleclarson) in [#28](https://github.com/radashi-org/radashi/pull/28)

- **(filterKey)** Accept null/undefined filter by [@aleclarson](https://github.com/aleclarson) in [b10ad10](https://github.com/radashi-org/radashi/commit/b10ad105bada331494c232b7a28f9d76ff77dded)
- Add selectFirst by [@adamhamlin](https://github.com/adamhamlin) in [#52](https://github.com/radashi-org/radashi/pull/52)


#### <!-- 06 -->Fixed
- **(retry)** Stop using `range()` by [@aleclarson](https://github.com/aleclarson) in [5d60893](https://github.com/radashi-org/radashi/commit/5d60893471240516a49c6ddf48839165b5961a47)
- **(assign)** Remove inefficiencies in loop by [@aleclarson](https://github.com/aleclarson) in [#13](https://github.com/radashi-org/radashi/pull/13)

- **(set)** Avoid false positive of array index in path by [@aleclarson](https://github.com/aleclarson) in [#15](https://github.com/radashi-org/radashi/pull/15)

- **(shake)** Stop using `Omit` on return type and give `filter` parameter a safer type by [@aleclarson](https://github.com/aleclarson) in [#12](https://github.com/radashi-org/radashi/pull/12)

- **(series)** Allow `items` param to be a readonly array by [@aleclarson](https://github.com/aleclarson) in [#14](https://github.com/radashi-org/radashi/pull/14)

- Copy `is-plain-obj` implementation by [@aleclarson](https://github.com/aleclarson) in [08a18e2](https://github.com/radashi-org/radashi/commit/08a18e218d83bf094354d4af1b5c9dcf92c18d1f)
- Avoid `isObject` for internal use by [@aleclarson](https://github.com/aleclarson) in [3b6a67c](https://github.com/radashi-org/radashi/commit/3b6a67ca7298cdcfde329a4ef28440205602b0e3)
- **(isArray)** Work with `readonly T[]` types by [@aleclarson](https://github.com/aleclarson) in [88c12b6](https://github.com/radashi-org/radashi/commit/88c12b6e3941b1fa6072b9ec9bf214c508e7bb70)
- **(keys)** Improve perf by avoiding excessive array allocations by [@aleclarson](https://github.com/aleclarson) in [#25](https://github.com/radashi-org/radashi/pull/25)

- Ensure `mapValues` and `group` work together by [@aleclarson](https://github.com/aleclarson) in [#24](https://github.com/radashi-org/radashi/pull/24)

- Use typeof in `isFunction` by [@aleclarson](https://github.com/aleclarson) in [6ad96f4](https://github.com/radashi-org/radashi/commit/6ad96f44f17949ee33acda9a073307b19dca7796)

#### <!-- 07 -->Performance
- Avoid excessive array allocation in `fork` by [@localusercamp](https://github.com/localusercamp) in [#33](https://github.com/radashi-org/radashi/pull/33)

- Make `template` faster by [@aleclarson](https://github.com/aleclarson) in [#32](https://github.com/radashi-org/radashi/pull/32)

- Avoid object spread in loop by [@cdreeves](https://github.com/cdreeves) in [#37](https://github.com/radashi-org/radashi/pull/37)

- Avoid an array allocation by [@aleclarson](https://github.com/aleclarson) in [#63](https://github.com/radashi-org/radashi/pull/63)

- Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#61](https://github.com/radashi-org/radashi/pull/61)

- Avoid arrow function in loop and avoid calling user-provided key generator more than once per item by [@aleclarson](https://github.com/aleclarson) in [#60](https://github.com/radashi-org/radashi/pull/60)

- Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#62](https://github.com/radashi-org/radashi/pull/62)


#### <!-- 08 -->Types
- Let `filterKey` accept `key: keyof any` by [@aleclarson](https://github.com/aleclarson) in [73ac8bb](https://github.com/radashi-org/radashi/commit/73ac8bba9e2a2a39eb3c117cc940cc2b18199834)
- Add `TryitResult<T>` type by [@aleclarson](https://github.com/aleclarson) in [f044364](https://github.com/radashi-org/radashi/commit/f0443644bace43ad3092751e0ba4193ead336ef6)
- Add `MemoOptions<T>` type by [@aleclarson](https://github.com/aleclarson) in [877a1e4](https://github.com/radashi-org/radashi/commit/877a1e4e4d6fba76eea04731e69f7490d3f3191a)
- Export `UppercaseKeys` and `LowercaseKeys` types by [@aleclarson](https://github.com/aleclarson) in [96b28b9](https://github.com/radashi-org/radashi/commit/96b28b9b037bd03277511d0174e4896729bcee93)
- Let `zip` accept readonly arrays by [@aleclarson](https://github.com/aleclarson) in [f7d93cc](https://github.com/radashi-org/radashi/commit/f7d93cc9c9909e081a2584175154eb4a141d88a3)

### New Contributors
* [@cimbraien](https://github.com/cimbraien) made their first contribution in [#58](https://github.com/radashi-org/radashi/pull/58)
* [@shan-shaji](https://github.com/shan-shaji) made their first contribution in [#53](https://github.com/radashi-org/radashi/pull/53)
* [@cdreeves](https://github.com/cdreeves) made their first contribution in [#37](https://github.com/radashi-org/radashi/pull/37)
* [@localusercamp](https://github.com/localusercamp) made their first contribution in [#33](https://github.com/radashi-org/radashi/pull/33)

[radashi@beta]: https://github.com/radashi-org/radashi/compare/v12.1.0..HEAD

<!-- generated by git-cliff -->

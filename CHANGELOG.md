# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [radashi@12.2.3] - 2024-11-12
### Details
#### <!-- 06 -->Fixed

- **(all)** Be more lenient, reduce memory usage by [@aleclarson](https://github.com/aleclarson) in [e6accd8](https://github.com/radashi-org/radashi/commit/e6accd870910f8df9487b6f54e1888bc5ae1ba92)

## [radashi@12.2.2] - 2024-11-10
### Details
#### <!-- 08 -->Types

- Export `PromiseWithResolvers` type by [@aleclarson](https://github.com/aleclarson) in [#301](https://github.com/radashi-org/radashi/pull/301)

- Improve `isEmpty` signature by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#219](https://github.com/radashi-org/radashi/pull/219)

- Narrow return type of `first` and `last` by [@crishoj](https://github.com/crishoj) in [#160](https://github.com/radashi-org/radashi/pull/160)

- Improve `draw` signature for non-empty arrays by [@crishoj](https://github.com/crishoj) in [#153](https://github.com/radashi-org/radashi/pull/153)


## [radashi@12.2.1] - 2024-11-09
### Details
#### <!-- 08 -->Types

- Improve signature of `shake` by [@aleclarson](https://github.com/aleclarson) in [#293](https://github.com/radashi-org/radashi/pull/293)

- `mapValues` index signature handling by [@aleclarson](https://github.com/aleclarson) in [#297](https://github.com/radashi-org/radashi/pull/297)

- Let `zipToObject` receive readonly arrays by [@aeharding](https://github.com/aeharding) in [#294](https://github.com/radashi-org/radashi/pull/294)


### New Contributors
* [@aeharding](https://github.com/aeharding) made their first contribution in [#294](https://github.com/radashi-org/radashi/pull/294)
## [radashi@12.2.0] - 2024-11-01
### Details
#### <!-- 03 -->Added

- Add `isIntString` function by [@aleclarson](https://github.com/aleclarson) in [fa500d3](https://github.com/radashi-org/radashi/commit/fa500d329d7e06062e7a42cbf4ff9ad9dcb89191)
- Add `isPlainObject` type guard by [@aleclarson](https://github.com/aleclarson) in [#16](https://github.com/radashi-org/radashi/pull/16)

- Add `round` function by [@shan-shaji](https://github.com/shan-shaji) in [#53](https://github.com/radashi-org/radashi/pull/53)

- Add `mapify` function by [@cimbraien](https://github.com/cimbraien) in [#58](https://github.com/radashi-org/radashi/pull/58)

- Add `unzip` function by [@aleclarson](https://github.com/aleclarson) in [#64](https://github.com/radashi-org/radashi/pull/64)

- Add `flip` function by [@aleclarson](https://github.com/aleclarson) in [#35](https://github.com/radashi-org/radashi/pull/35)

- Add `once` function by [@aleclarson](https://github.com/aleclarson) in [#80](https://github.com/radashi-org/radashi/pull/80)

- Add `lerp` function by [@aleclarson](https://github.com/aleclarson) in [#86](https://github.com/radashi-org/radashi/pull/86)

- Add `isMap` function by [@aleclarson](https://github.com/aleclarson) in [4f2e48c](https://github.com/radashi-org/radashi/commit/4f2e48c24e7e10162cf0040f8c9b7b91bc9a37c0)
- Add `isRegExp` function by [@aleclarson](https://github.com/aleclarson) in [58e7d96](https://github.com/radashi-org/radashi/commit/58e7d96baed7ea73e09dff3884aeebb6150f9485)
- Add `isSet` function by [@aleclarson](https://github.com/aleclarson) in [73e70c1](https://github.com/radashi-org/radashi/commit/73e70c1011fffa21d1d38bb04d5616073c8e8739)
- Add `isWeakSet` function by [@aleclarson](https://github.com/aleclarson) in [aacd5be](https://github.com/radashi-org/radashi/commit/aacd5be35e38e4ba7a6ecabb7942eafb26111486)
- Add `isWeakMap` function by [@aleclarson](https://github.com/aleclarson) in [f32cfd5](https://github.com/radashi-org/radashi/commit/f32cfd5c2160724d5d12d3e9f9a43c328daf0f4d)
- Add `traverse` function by [@aleclarson](https://github.com/aleclarson) in [#59](https://github.com/radashi-org/radashi/pull/59)

- Add `cloneDeep` function by [@aleclarson](https://github.com/aleclarson) in [#81](https://github.com/radashi-org/radashi/pull/81)

- Add `castMapping` function by [@aleclarson](https://github.com/aleclarson) in [#43](https://github.com/radashi-org/radashi/pull/43)

- Add `clamp` function by [@aleclarson](https://github.com/aleclarson) in [#106](https://github.com/radashi-org/radashi/pull/106)

- Add `castArray` and `castArrayIfExists` by [@aleclarson](https://github.com/aleclarson) in [#97](https://github.com/radashi-org/radashi/pull/97)

- Add `castComparator` function by [@aleclarson](https://github.com/aleclarson) in [#34](https://github.com/radashi-org/radashi/pull/34)

- Add reverse argument to `castComparator` by [@aleclarson](https://github.com/aleclarson) in [1d7937e](https://github.com/radashi-org/radashi/commit/1d7937ef006139883aedac782ad032c1d6269c7a)
- Add `isBoolean` function by [@aleclarson](https://github.com/aleclarson) in [adc419d](https://github.com/radashi-org/radashi/commit/adc419d5bbb1786d75619ed3d7f41a45f68c9857)
- Add `noop` and `always` functions by [@aleclarson](https://github.com/aleclarson) in [eb77c8f](https://github.com/radashi-org/radashi/commit/eb77c8f004a35f1499968f6e40d01b3595384848)
- Add `similarity` function by [@aleclarson](https://github.com/aleclarson) in [#122](https://github.com/radashi-org/radashi/pull/122)

- **(throttle)** Add `trailing` option by [@crishoj](https://github.com/crishoj) in [#127](https://github.com/radashi-org/radashi/pull/127)

- **(throttle)** Add `trigger` method to ThrottleFunction by [@aleclarson](https://github.com/aleclarson) in [#135](https://github.com/radashi-org/radashi/pull/135)

- Add `withResolvers` ponyfill by [@Minhir](https://github.com/Minhir) in [#148](https://github.com/radashi-org/radashi/pull/148)

- **(debounce)** Add `leading` option by [@crishoj](https://github.com/crishoj) in [#128](https://github.com/radashi-org/radashi/pull/128)

- Add isResult, isResultOk, and isResultErr functions by [@aleclarson](https://github.com/aleclarson) in [#172](https://github.com/radashi-org/radashi/pull/172)

- Add `isError` function by [@aleclarson](https://github.com/aleclarson) in [#173](https://github.com/radashi-org/radashi/pull/173)


#### <!-- 05 -->Changed

- **(intersects)** Let `identity` callback return any value by [@aleclarson](https://github.com/aleclarson) in [#11](https://github.com/radashi-org/radashi/pull/11)

- **(unique)** Let `toKey` return any kind of value by [@aleclarson](https://github.com/aleclarson) in [#10](https://github.com/radashi-org/radashi/pull/10)

- **(select)** Let `condition` be undefined by [@aleclarson](https://github.com/aleclarson) in [#9](https://github.com/radashi-org/radashi/pull/9)

- Replace `matchKeys` with `filterKey` by [@aleclarson](https://github.com/aleclarson) in [#28](https://github.com/radashi-org/radashi/pull/28)

- **(filterKey)** Accept null/undefined filter by [@aleclarson](https://github.com/aleclarson) in [b10ad10](https://github.com/radashi-org/radashi/commit/b10ad105bada331494c232b7a28f9d76ff77dded)
- Add selectFirst by [@adamhamlin](https://github.com/adamhamlin) in [#52](https://github.com/radashi-org/radashi/pull/52)

- **(pick)** Accept a callback for advanced picking by [@aleclarson](https://github.com/aleclarson) in [#30](https://github.com/radashi-org/radashi/pull/30)

- **(mapify)** Provide an index argument to the callbacks by [@aleclarson](https://github.com/aleclarson) in [#100](https://github.com/radashi-org/radashi/pull/100)

- Use native AggregateError if available by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#116](https://github.com/radashi-org/radashi/pull/116)


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
- `toInt` and `toFloat` should not throw on symbols by [@aleclarson](https://github.com/aleclarson) in [cafc7fc](https://github.com/radashi-org/radashi/commit/cafc7fc4833447d6e5ed6bdc88957201aae6372a)
- **(toggle)** Handle falsy input as expected by [@Minhir](https://github.com/Minhir) in [#82](https://github.com/radashi-org/radashi/pull/82)

- **(assign)** Fix overriding a nested object with null by [@aleclarson](https://github.com/aleclarson) in [#112](https://github.com/radashi-org/radashi/pull/112)

- **(crush)** Fix handling of period-containing property names by [@stefaanv](https://github.com/stefaanv) in [#95](https://github.com/radashi-org/radashi/pull/95)

- **(toggle)** Use -1 as index for `toKey()` with toggled `item` by [@Minhir](https://github.com/Minhir) in [#167](https://github.com/radashi-org/radashi/pull/167)

- **(pascal)** Handle camel-cased strings correctly by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#178](https://github.com/radashi-org/radashi/pull/178)


#### <!-- 07 -->Performance

- Avoid excessive array allocation in `fork` by [@localusercamp](https://github.com/localusercamp) in [#33](https://github.com/radashi-org/radashi/pull/33)

- Make `template` faster by [@aleclarson](https://github.com/aleclarson) in [#32](https://github.com/radashi-org/radashi/pull/32)

- **(series)** Avoid object spread in loop by [@cdreeves](https://github.com/cdreeves) in [#37](https://github.com/radashi-org/radashi/pull/37)

- **(cluster)** Avoid an array allocation by [@aleclarson](https://github.com/aleclarson) in [#63](https://github.com/radashi-org/radashi/pull/63)

- **(replace)** Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#61](https://github.com/radashi-org/radashi/pull/61)

- **(merge)** Avoid arrow function in loop and avoid calling user-provided key generator more than once per item by [@aleclarson](https://github.com/aleclarson) in [#60](https://github.com/radashi-org/radashi/pull/60)

- **(replaceOrAppend)** Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#62](https://github.com/radashi-org/radashi/pull/62)

- **(shuffle)** Use the Fisher-Yates algorithm by [@eumkz](https://github.com/eumkz) in [#76](https://github.com/radashi-org/radashi/pull/76)

- **(merge)** Improved handling of large arrays by [@Minhir](https://github.com/Minhir) in [#240](https://github.com/radashi-org/radashi/pull/240)


#### <!-- 08 -->Types

- Let `filterKey` accept `key: keyof any` by [@aleclarson](https://github.com/aleclarson) in [73ac8bb](https://github.com/radashi-org/radashi/commit/73ac8bba9e2a2a39eb3c117cc940cc2b18199834)
- Add `TryitResult<T>` type by [@aleclarson](https://github.com/aleclarson) in [f044364](https://github.com/radashi-org/radashi/commit/f0443644bace43ad3092751e0ba4193ead336ef6)
- Add `MemoOptions<T>` type by [@aleclarson](https://github.com/aleclarson) in [877a1e4](https://github.com/radashi-org/radashi/commit/877a1e4e4d6fba76eea04731e69f7490d3f3191a)
- Export `UppercaseKeys` and `LowercaseKeys` types by [@aleclarson](https://github.com/aleclarson) in [96b28b9](https://github.com/radashi-org/radashi/commit/96b28b9b037bd03277511d0174e4896729bcee93)
- Let `zip` accept readonly arrays by [@aleclarson](https://github.com/aleclarson) in [f7d93cc](https://github.com/radashi-org/radashi/commit/f7d93cc9c9909e081a2584175154eb4a141d88a3)
- Improve the `isArray` return type for `unknown` input type by [@aleclarson](https://github.com/aleclarson) in [#72](https://github.com/radashi-org/radashi/pull/72)

- `select` return type when no condition is defined by [@aleclarson](https://github.com/aleclarson) in [ab76d65](https://github.com/radashi-org/radashi/commit/ab76d6502e479b378ad824c89974f389ec597a9e)
- Add `FilteredKeys` type by [@aleclarson](https://github.com/aleclarson) in [6a6f899](https://github.com/radashi-org/radashi/commit/6a6f899316229efc6706d8c40998df5fa99e004b)
- Improve the return type of `filterKey` by [@aleclarson](https://github.com/aleclarson) in [bc298c6](https://github.com/radashi-org/radashi/commit/bc298c6cfcaaf74726e1f2b901e210dea1fed641)
- Handle tuples in `isArray` return type by [@aleclarson](https://github.com/aleclarson) in [9257535](https://github.com/radashi-org/radashi/commit/925753578761bda277838bf8fbbcc24b3813f2b9)
- Make `select` more option-friendly by [@aleclarson](https://github.com/aleclarson) in [c9cfcd0](https://github.com/radashi-org/radashi/commit/c9cfcd0a7eb1af98682f5d9b56555162c92b7085)
- Let `shift` accept a readonly array type by [@nnmrts](https://github.com/nnmrts) in [#126](https://github.com/radashi-org/radashi/pull/126)

- Remove type constraint for mapped array passed to `sum` by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [dea0f50](https://github.com/radashi-org/radashi/commit/dea0f504f417b23aaf2b91495943501c894a172a)
- Make `assign` return type more accurate + add `Assign` type by [@aleclarson](https://github.com/aleclarson) in [#142](https://github.com/radashi-org/radashi/pull/142)

- Add Ok/Err/Result/ResultPromise types by [@aleclarson](https://github.com/aleclarson) in [#132](https://github.com/radashi-org/radashi/pull/132)

- Align `isPromise` return type with its logic by [@aleclarson](https://github.com/aleclarson) in [#175](https://github.com/radashi-org/radashi/pull/175)

- Publicize the `Falsy` type by [@aleclarson](https://github.com/aleclarson) in [736d334](https://github.com/radashi-org/radashi/commit/736d3342f86cf16199d6d50cacd0cec3f51db078)
- Avoid inferring `memo` return type from `key` option by [@aleclarson](https://github.com/aleclarson) in [#231](https://github.com/radashi-org/radashi/pull/231)

- Allow readonly array in `omit` function by [@shan-shaji](https://github.com/shan-shaji) in [#272](https://github.com/radashi-org/radashi/pull/272)


### New Contributors
* [@shan-shaji](https://github.com/shan-shaji) made their first contribution in [#272](https://github.com/radashi-org/radashi/pull/272)
* [@nnmrts](https://github.com/nnmrts) made their first contribution in [#126](https://github.com/radashi-org/radashi/pull/126)
* [@stefaanv](https://github.com/stefaanv) made their first contribution in [#95](https://github.com/radashi-org/radashi/pull/95)
* [@eumkz](https://github.com/eumkz) made their first contribution in [#76](https://github.com/radashi-org/radashi/pull/76)
* [@cimbraien](https://github.com/cimbraien) made their first contribution in [#58](https://github.com/radashi-org/radashi/pull/58)
* [@cdreeves](https://github.com/cdreeves) made their first contribution in [#37](https://github.com/radashi-org/radashi/pull/37)
* [@localusercamp](https://github.com/localusercamp) made their first contribution in [#33](https://github.com/radashi-org/radashi/pull/33)

[radashi@12.2.3]: https://github.com/radashi-org/radashi/compare/v12.2.2..v12.2.3

[radashi@12.2.2]: https://github.com/radashi-org/radashi/compare/v12.2.1..v12.2.2

[radashi@12.2.1]: https://github.com/radashi-org/radashi/compare/v12.2.0..v12.2.1

[radashi@12.2.0]: https://github.com/radashi-org/radashi/compare/v12.1.0..v12.2.0

<!-- generated by git-cliff -->

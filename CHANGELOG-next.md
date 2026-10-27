# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [radashi@13.0.0-beta.87bc348] - 2026-10-27
### Details
#### <!-- 05 -->Changed

- Allow lossless `crush` ⇄ `construct` use by [@mikerowe81](https://github.com/mikerowe81) in [3af2c87](https://github.com/radashi-org/radashi/commit/3af2c875045045823bf929884d92be510a79342f)
- Drop support for Node 16 by [@aleclarson](https://github.com/aleclarson) in [b6de1a4](https://github.com/radashi-org/radashi/commit/b6de1a4ee593b42e33f123e0a89451741d8cd435)

#### <!-- 06 -->Fixed

- Align AggregateError polyfill with native behavior by [@n0liu](https://github.com/n0liu) in [b16b1a1](https://github.com/radashi-org/radashi/commit/b16b1a155af46e283602318def6dcfebd3775e7b)

### New Contributors
* [@mikerowe81](https://github.com/mikerowe81) made their first contribution
## [radashi@12.9.8] - 2026-10-27
### Details
#### <!-- 06 -->Fixed

- **(assign)** Skip dangerous keys to prevent prototype pollution by [@aleclarson](https://github.com/aleclarson) in [4e7a3fd](https://github.com/radashi-org/radashi/commit/4e7a3fd3acfbcc7ff80a1f09e6ede847a5ca7bc4)

## [radashi@12.9.7] - 2026-10-26
### Details
#### <!-- 06 -->Fixed

- **(round)** Preserve infinity with nonzero precision by [@Don-Yin](https://github.com/Don-Yin) in [#489](https://github.com/radashi-org/radashi/pull/489)

- **(parallel)** Stop treating falsy rejections as success by [@feritcemkahraman](https://github.com/feritcemkahraman) in [#488](https://github.com/radashi-org/radashi/pull/488)


### New Contributors
* [@feritcemkahraman](https://github.com/feritcemkahraman) made their first contribution in [#488](https://github.com/radashi-org/radashi/pull/488)
* [@Don-Yin](https://github.com/Don-Yin) made their first contribution in [#489](https://github.com/radashi-org/radashi/pull/489)
## [radashi@12.9.6] - 2026-09-21
### Details
#### <!-- 06 -->Fixed

- **(memo)** Stop inherited Object.prototype keys from being treated as cache hits by [@ethanstoner](https://github.com/ethanstoner) in [#486](https://github.com/radashi-org/radashi/pull/486)


## [radashi@12.9.5] - 2026-09-17
### Details
#### <!-- 06 -->Fixed

- **(selectFirst)** Map a matched undefined element by [@ethanstoner](https://github.com/ethanstoner) in [#484](https://github.com/radashi-org/radashi/pull/484)

- **(toggle)** Remove a matching undefined element instead of appending by [@MFA-G](https://github.com/MFA-G) in [#485](https://github.com/radashi-org/radashi/pull/485)


## [radashi@12.9.4] - 2026-09-14
### Details
#### <!-- 06 -->Fixed

- **(replaceOrAppend)** Treat only null/undefined as a missing new item by [@mahirhir](https://github.com/mahirhir) in [4f50de1](https://github.com/radashi-org/radashi/commit/4f50de1daf471e8837803e43c0e13dbfc234c883)
- **(replaceOrAppend)** Allow nullish value even if array type doesn't by [@aleclarson](https://github.com/aleclarson) in [#477](https://github.com/radashi-org/radashi/pull/477)


### New Contributors
* [@mahirhir](https://github.com/mahirhir) made their first contribution
## [radashi@12.9.3] - 2026-09-14
### Details
#### <!-- 06 -->Fixed

- **(diff)** Use a Set so identities cannot hit Object.prototype by [@MFA-G](https://github.com/MFA-G) in [8b825ae](https://github.com/radashi-org/radashi/commit/8b825aea350b97c83cf33ee3ad28575c24ea7aef)
- **(counting)** Build the tally on a null-prototype object by [@MFA-G](https://github.com/MFA-G) in [#481](https://github.com/radashi-org/radashi/pull/481)


## [radashi@12.9.2] - 2026-09-08
### Details
#### <!-- 06 -->Fixed

- **(snake)** Split every letter-number boundary, not just the first by [@Normanyadav](https://github.com/Normanyadav) in [7cbe750](https://github.com/radashi-org/radashi/commit/7cbe75077c678ea73e39b691b2649278dee1f68c)

### New Contributors
* [@Normanyadav](https://github.com/Normanyadav) made their first contribution
## [radashi@12.9.0] - 2026-05-05
### Details
#### <!-- 03 -->Added

- Add `mergeOptions` function by [@fResult](https://github.com/fResult) in [#442](https://github.com/radashi-org/radashi/pull/442)


#### <!-- 05 -->Changed

- Improve `sort` return type when sorting a tuple by [@nnmrts](https://github.com/nnmrts) in [#421](https://github.com/radashi-org/radashi/pull/421)


## [radashi@12.8.1] - 2026-05-05
### Details
#### <!-- 06 -->Fixed

- Mark dedent as side-effect free by [@aleclarson](https://github.com/aleclarson) in [7ada48f](https://github.com/radashi-org/radashi/commit/7ada48f5a35fceb1584068d8879566c9b81e5902)

## [radashi@12.8.0] - 2026-05-05
### Details
#### <!-- 03 -->Added

- Add `deburr` function by [@aleclarson](https://github.com/aleclarson) in [#449](https://github.com/radashi-org/radashi/pull/449)

- Add `getErrorMessage` function by [@aleclarson](https://github.com/aleclarson) in [#466](https://github.com/radashi-org/radashi/pull/466)


## [radashi@12.7.2] - 2026-02-24
### Details
#### <!-- 06 -->Fixed

- Chain type signatures after 3 arguments by [@mutewinter](https://github.com/mutewinter) in [#454](https://github.com/radashi-org/radashi/pull/454)


### New Contributors
* [@mutewinter](https://github.com/mutewinter) made their first contribution in [#454](https://github.com/radashi-org/radashi/pull/454)
## [radashi@12.7.1] - 2025-11-19
### Details
#### <!-- 06 -->Fixed

- Ensure DurationParser static properties can be tree-shaked by [@moo-w](https://github.com/moo-w) in [#447](https://github.com/radashi-org/radashi/pull/447)


### New Contributors
* [@moo-w](https://github.com/moo-w) made their first contribution in [#447](https://github.com/radashi-org/radashi/pull/447)
## [radashi@13.0.0-beta.e48d72a] - 2025-11-13
### Details
#### <!-- 03 -->Added

- Add `promiseDebounce` function by [@aleclarson](https://github.com/aleclarson) in [#109](https://github.com/radashi-org/radashi/pull/109)


#### <!-- 05 -->Changed

- Change `sort`'s direction argument to a string by [@nnmrts](https://github.com/nnmrts) in [#424](https://github.com/radashi-org/radashi/pull/424)

- Transpile to Node18 syntax by [@aleclarson](https://github.com/aleclarson) in [7002960](https://github.com/radashi-org/radashi/commit/70029601df1b0693589183205ca41880da0ee577)

## [radashi@12.7.0] - 2025-10-17
### Details
#### <!-- 03 -->Added

- Add `identity` function by [@nnmrts](https://github.com/nnmrts) in [#422](https://github.com/radashi-org/radashi/pull/422)

- Add `isArrayEqual` function by [@aleclarson](https://github.com/aleclarson) in [#417](https://github.com/radashi-org/radashi/pull/417)

- Add `isMapEqual` and `isSetEqual` functions by [@aleclarson](https://github.com/aleclarson) in [#437](https://github.com/radashi-org/radashi/pull/437)

- Add `getOrInsert` and `getOrInsertComputed` by [@aleclarson](https://github.com/aleclarson) in [#444](https://github.com/radashi-org/radashi/pull/444)

- **(objectify)** Add `index` parameter to getKey and getValue functions by [@ronen](https://github.com/ronen) in [#440](https://github.com/radashi-org/radashi/pull/440)

- Add absoluteJitter and proportionalJitter by [@aleclarson](https://github.com/aleclarson) in [#446](https://github.com/radashi-org/radashi/pull/446)


#### <!-- 05 -->Changed

- Preserve tuple type in `min`/`max` even with a `getter` by [@nnmrts](https://github.com/nnmrts) in [#436](https://github.com/radashi-org/radashi/pull/436)

- Use `identity` as default getter for `sort` by [@nnmrts](https://github.com/nnmrts) in [#423](https://github.com/radashi-org/radashi/pull/423)


## [radashi@12.6.2] - 2025-08-20
### Details
#### <!-- 06 -->Fixed

- **(range)** Ensure `end` parameter works when 0 by [@Richard-Krug](https://github.com/Richard-Krug) in [#432](https://github.com/radashi-org/radashi/pull/432)


### New Contributors
* [@Richard-Krug](https://github.com/Richard-Krug) made their first contribution in [#432](https://github.com/radashi-org/radashi/pull/432)
## [radashi@12.6.1] - 2025-08-09
### Details
#### <!-- 06 -->Fixed

- **(group)** Use `Object.create(null)` for the returned object by [@aleclarson](https://github.com/aleclarson) in [#427](https://github.com/radashi-org/radashi/pull/427)


## [radashi@13.0.0-beta.99854e3] - 2025-07-09
### Details
#### <!-- 03 -->Added

- **(memo)** Add `cache` option by [@aleclarson](https://github.com/aleclarson) in [#124](https://github.com/radashi-org/radashi/pull/124)

- Add `promiseMemo` function by [@iiison](https://github.com/iiison) in [#398](https://github.com/radashi-org/radashi/pull/398)


## [radashi@12.6.0] - 2025-06-26
### Details
#### <!-- 03 -->Added

- Add `assert` function by [@aleclarson](https://github.com/aleclarson) in [#403](https://github.com/radashi-org/radashi/pull/403)

- Add `escapeHTML` function by [@aleclarson](https://github.com/aleclarson) in [#401](https://github.com/radashi-org/radashi/pull/401)

- Add `queueByKey` function by [@aleclarson](https://github.com/aleclarson) in [#407](https://github.com/radashi-org/radashi/pull/407)

- Add `Semaphore` class by [@aleclarson](https://github.com/aleclarson) in [#415](https://github.com/radashi-org/radashi/pull/415)

- Add `parseDuration` and `parseQuantity` functions by [@aleclarson](https://github.com/aleclarson) in [#416](https://github.com/radashi-org/radashi/pull/416)

- Add `promiseChain` function by [@iiison](https://github.com/iiison) in [#402](https://github.com/radashi-org/radashi/pull/402)


#### <!-- 05 -->Changed

- **(group)** Pass array index to callback by [@aleclarson](https://github.com/aleclarson) in [6d66395](https://github.com/radashi-org/radashi/commit/6d66395d3e36194e01d95684b1c7815b093e5c09)

#### <!-- 06 -->Fixed

- **(selectFirst)** Filter out null from return type when no condition is given by [@Alimedhat000](https://github.com/Alimedhat000) in [#413](https://github.com/radashi-org/radashi/pull/413)

- **(isIntString)** Prevent incorrect type narrowing by [@lislon](https://github.com/lislon) in [#412](https://github.com/radashi-org/radashi/pull/412)


### New Contributors
* [@Alimedhat000](https://github.com/Alimedhat000) made their first contribution in [#413](https://github.com/radashi-org/radashi/pull/413)
## [radashi@12.5.1] - 2025-05-23
### Details
#### <!-- 06 -->Fixed

- **(set)** Avoid mutating nested objects without first cloning them by [@aleclarson](https://github.com/aleclarson) in [fc3c7c9](https://github.com/radashi-org/radashi/commit/fc3c7c91b6c864febad70528e0c39b2177b89adb)
- **(set)** Prevent prototype pollution by [@aleclarson](https://github.com/aleclarson) in [8147abc](https://github.com/radashi-org/radashi/commit/8147abc8cfc3cfe9b9a17cd389076a5d97235a66)

## [radashi@12.5.0] - 2025-05-15
### Details
#### <!-- 03 -->Added

- Add `pluck` function by [@nusohiro](https://github.com/nusohiro) in [#376](https://github.com/radashi-org/radashi/pull/376)

- Add `concat` function by [@aleclarson](https://github.com/aleclarson) in [#388](https://github.com/radashi-org/radashi/pull/388)


#### <!-- 05 -->Changed

- **(cluster)** Use tuple types for common size constants by [@fResult](https://github.com/fResult) in [#389](https://github.com/radashi-org/radashi/pull/389)


#### <!-- 06 -->Fixed

- **(objectify)** Wrap return type with Partial by [@Yukiniro](https://github.com/Yukiniro) in [#385](https://github.com/radashi-org/radashi/pull/385)

- **(mapify)** Pass the actual array index to callbacks by [@Yukiniro](https://github.com/Yukiniro) in [#384](https://github.com/radashi-org/radashi/pull/384)

- **(cluster)** Avoid infinite loop when size is `0` by [@fResult](https://github.com/fResult) in [#397](https://github.com/radashi-org/radashi/pull/397)


#### <!-- 08 -->Types

- Handle object types in CompatibleProperty by [@aleclarson](https://github.com/aleclarson) in [7f72da3](https://github.com/radashi-org/radashi/commit/7f72da3933854623eef444a15a8289feb2f0583a)

## [radashi@13.0.0-beta.f4c6a24] - 2025-03-19
### Details
#### <!-- 04 -->Removed

- Remove default size from `cluster` by [@aleclarson](https://github.com/aleclarson) in [#352](https://github.com/radashi-org/radashi/pull/352)


#### <!-- 05 -->Changed

- `trim` now requires both arguments by [@aleclarson](https://github.com/aleclarson) in [#351](https://github.com/radashi-org/radashi/pull/351)


#### <!-- 06 -->Fixed

- **(counting)** Wrap return type with Partial by [@Yukiniro](https://github.com/Yukiniro) in [#377](https://github.com/radashi-org/radashi/pull/377)


## [radashi@12.4.0] - 2025-03-16
### Details
#### <!-- 03 -->Added

- Add `isBigInt` function by [@shan-shaji](https://github.com/shan-shaji) in [#369](https://github.com/radashi-org/radashi/pull/369)

- Add `remove` function by [@nusohiro](https://github.com/nusohiro) in [#344](https://github.com/radashi-org/radashi/pull/344)

- Add `isAsyncIterable` function by [@aleclarson](https://github.com/aleclarson) in [#366](https://github.com/radashi-org/radashi/pull/366)

- Add `memoLastCall` function by [@aleclarson](https://github.com/aleclarson) in [#353](https://github.com/radashi-org/radashi/pull/353)

- Add `toResult` function by [@aleclarson](https://github.com/aleclarson) in [#375](https://github.com/radashi-org/radashi/pull/375)


#### <!-- 08 -->Types

- `reduce` accumulator type when no initial value is given by [@aleclarson](https://github.com/aleclarson) in [7a14bf6](https://github.com/radashi-org/radashi/commit/7a14bf6c069c07b7c4700cb7568acbb0aa699ca8)

## [radashi@13.0.0-beta.ffa4778] - 2025-01-26
### Details
#### <!-- 05 -->Changed

- Rework `debounce` function by [@aleclarson](https://github.com/aleclarson) in [c39b751](https://github.com/radashi-org/radashi/commit/c39b751fbe9c4f97443f183571a870fb73993f14)

#### <!-- 06 -->Fixed

- **(isNumber)** Return true for NaN values by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [42db8ae](https://github.com/radashi-org/radashi/commit/42db8aec99dc523f27e940a29f53031c07848831)
- Remove handling of types not present in type signatures by [@aleclarson](https://github.com/aleclarson) in [#70](https://github.com/radashi-org/radashi/pull/70)


## [radashi@12.3.4] - 2025-01-26
### Details
#### <!-- 06 -->Fixed

- **(reduce)** Align with native reduce behavior + perf improvements by [@aleclarson](https://github.com/aleclarson) in [#341](https://github.com/radashi-org/radashi/pull/341)


## [radashi@12.3.3] - 2025-01-11
### Details
#### <!-- 08 -->Types

- Let `map` callback return a `PromiseLike` object by [@aleclarson](https://github.com/aleclarson) in [#330](https://github.com/radashi-org/radashi/pull/330)


## [radashi@12.3.2] - 2025-01-10
### Details
#### <!-- 06 -->Fixed

- **(shuffle)** Correction to Fisher-Yates implementation by [@crishoj](https://github.com/crishoj) in [#338](https://github.com/radashi-org/radashi/pull/338)


## [radashi@12.3.1] - 2025-01-07
### Details
#### <!-- 06 -->Fixed

- **(parallel)** Avoid range error with empty array by [@aleclarson](https://github.com/aleclarson) in [#337](https://github.com/radashi-org/radashi/pull/337)


## [radashi@12.3.0] - 2024-12-01
### Details
#### <!-- 00 -->Security

- Pin cspell version by [@aleclarson](https://github.com/aleclarson) in [a33e5a4](https://github.com/radashi-org/radashi/commit/a33e5a47cd30b4db65f0a7f86eb1174baf6f481a)

#### <!-- 03 -->Added

- Add `signal` option to `retry` and `parallel` by [@SaidbekAbdiganiev](https://github.com/SaidbekAbdiganiev) in [#262](https://github.com/radashi-org/radashi/pull/262)

- Add `isClass` function by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#239](https://github.com/radashi-org/radashi/pull/239)

- Add `isNullish` function in [#277](https://github.com/radashi-org/radashi/pull/277)

- Add `cartesianProduct` function by [@yamcodes](https://github.com/yamcodes) in [#241](https://github.com/radashi-org/radashi/pull/241)

- Add `isUndefined` function by [@RobinBobin](https://github.com/RobinBobin) in [#305](https://github.com/radashi-org/radashi/pull/305)

- Add `timeout` function by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#250](https://github.com/radashi-org/radashi/pull/250)

- Add `dedent` function by [@aleclarson](https://github.com/aleclarson) in [#120](https://github.com/radashi-org/radashi/pull/120)


#### <!-- 05 -->Changed

- **(parallel)** Clamp the limit between 1 and array length by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#238](https://github.com/radashi-org/radashi/pull/238)


### New Contributors
* [@RobinBobin](https://github.com/RobinBobin) made their first contribution in [#305](https://github.com/radashi-org/radashi/pull/305)
* [@SaidbekAbdiganiev](https://github.com/SaidbekAbdiganiev) made their first contribution in [#262](https://github.com/radashi-org/radashi/pull/262)
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
#### <!-- 07 -->Performance

- **(merge)** Improved handling of large arrays by [@Minhir](https://github.com/Minhir) in [#240](https://github.com/radashi-org/radashi/pull/240)


#### <!-- 08 -->Types

- Publicize the `Falsy` type by [@aleclarson](https://github.com/aleclarson) in [736d334](https://github.com/radashi-org/radashi/commit/736d3342f86cf16199d6d50cacd0cec3f51db078)
- Avoid inferring `memo` return type from `key` option by [@aleclarson](https://github.com/aleclarson) in [#231](https://github.com/radashi-org/radashi/pull/231)

- Allow readonly array in `omit` function by [@shan-shaji](https://github.com/shan-shaji) in [#272](https://github.com/radashi-org/radashi/pull/272)


## [radashi@12.2.0-beta.af825f4] - 2024-08-17
### Details
#### <!-- 03 -->Added

- Add `withResolvers` ponyfill by [@Minhir](https://github.com/Minhir) in [#148](https://github.com/radashi-org/radashi/pull/148)

- **(debounce)** Add `leading` option by [@crishoj](https://github.com/crishoj) in [#128](https://github.com/radashi-org/radashi/pull/128)

- Add isResult, isResultOk, and isResultErr functions by [@aleclarson](https://github.com/aleclarson) in [#172](https://github.com/radashi-org/radashi/pull/172)

- Add `isError` function by [@aleclarson](https://github.com/aleclarson) in [#173](https://github.com/radashi-org/radashi/pull/173)


#### <!-- 06 -->Fixed

- **(toggle)** Use -1 as index for `toKey()` with toggled `item` by [@Minhir](https://github.com/Minhir) in [#167](https://github.com/radashi-org/radashi/pull/167)

- **(pascal)** Handle camel-cased strings correctly by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#178](https://github.com/radashi-org/radashi/pull/178)


#### <!-- 08 -->Types

- Make `assign` return type more accurate + add `Assign` type by [@aleclarson](https://github.com/aleclarson) in [#142](https://github.com/radashi-org/radashi/pull/142)

- Add Ok/Err/Result/ResultPromise types by [@aleclarson](https://github.com/aleclarson) in [#132](https://github.com/radashi-org/radashi/pull/132)

- Align `isPromise` return type with its logic by [@aleclarson](https://github.com/aleclarson) in [#175](https://github.com/radashi-org/radashi/pull/175)


## [radashi@12.2.0-beta.7fb6e89] - 2024-08-07
### Details
#### <!-- 08 -->Types

- Remove type constraint for mapped array passed to `sum` by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [dea0f50](https://github.com/radashi-org/radashi/commit/dea0f504f417b23aaf2b91495943501c894a172a)

## [radashi@12.2.0-beta.83909af] - 2024-07-24
### Details
#### <!-- 03 -->Added

- Add `similarity` function by [@aleclarson](https://github.com/aleclarson) in [#122](https://github.com/radashi-org/radashi/pull/122)

- **(throttle)** Add `trailing` option by [@crishoj](https://github.com/crishoj) in [#127](https://github.com/radashi-org/radashi/pull/127)

- **(throttle)** Add `trigger` method to ThrottleFunction by [@aleclarson](https://github.com/aleclarson) in [#135](https://github.com/radashi-org/radashi/pull/135)


#### <!-- 08 -->Types

- Let `shift` accept a readonly array type by [@nnmrts](https://github.com/nnmrts) in [#126](https://github.com/radashi-org/radashi/pull/126)


## [radashi@12.2.0-beta.313bfb4] - 2024-07-21
### Details
#### <!-- 05 -->Changed

- Use native AggregateError if available by [@MarlonPassos-git](https://github.com/MarlonPassos-git) in [#116](https://github.com/radashi-org/radashi/pull/116)


#### <!-- 06 -->Fixed

- **(crush)** Fix handling of period-containing property names by [@stefaanv](https://github.com/stefaanv) in [#95](https://github.com/radashi-org/radashi/pull/95)


### New Contributors
* [@stefaanv](https://github.com/stefaanv) made their first contribution in [#95](https://github.com/radashi-org/radashi/pull/95)
## [radashi@12.2.0-beta.cf2d48e] - 2024-07-19
### Details
#### <!-- 08 -->Types

- Make `select` more option-friendly by [@aleclarson](https://github.com/aleclarson) in [c9cfcd0](https://github.com/radashi-org/radashi/commit/c9cfcd0a7eb1af98682f5d9b56555162c92b7085)

## [radashi@12.2.0-beta.4aac7d7] - 2024-07-16
### Details
#### <!-- 06 -->Fixed

- **(assign)** Fix overriding a nested object with null by [@aleclarson](https://github.com/aleclarson) in [#112](https://github.com/radashi-org/radashi/pull/112)


## [radashi@12.2.0-beta.c090534] - 2024-07-14
### Details
#### <!-- 03 -->Added

- Add `castMapping` function by [@aleclarson](https://github.com/aleclarson) in [#43](https://github.com/radashi-org/radashi/pull/43)

- Add `clamp` function by [@aleclarson](https://github.com/aleclarson) in [#106](https://github.com/radashi-org/radashi/pull/106)

- Add `castArray` and `castArrayIfExists` by [@aleclarson](https://github.com/aleclarson) in [#97](https://github.com/radashi-org/radashi/pull/97)

- Add `castComparator` function by [@aleclarson](https://github.com/aleclarson) in [#34](https://github.com/radashi-org/radashi/pull/34)

- Add reverse argument to `castComparator` by [@aleclarson](https://github.com/aleclarson) in [1d7937e](https://github.com/radashi-org/radashi/commit/1d7937ef006139883aedac782ad032c1d6269c7a)
- Add `isBoolean` function by [@aleclarson](https://github.com/aleclarson) in [adc419d](https://github.com/radashi-org/radashi/commit/adc419d5bbb1786d75619ed3d7f41a45f68c9857)
- Add `noop` and `always` functions by [@aleclarson](https://github.com/aleclarson) in [eb77c8f](https://github.com/radashi-org/radashi/commit/eb77c8f004a35f1499968f6e40d01b3595384848)

#### <!-- 05 -->Changed

- **(mapify)** Provide an index argument to the callbacks by [@aleclarson](https://github.com/aleclarson) in [#100](https://github.com/radashi-org/radashi/pull/100)


## [radashi@12.2.0-beta.5b5a0a7] - 2024-07-12
### Details
#### <!-- 03 -->Added

- Add `traverse` function by [@aleclarson](https://github.com/aleclarson) in [#59](https://github.com/radashi-org/radashi/pull/59)

- Add `cloneDeep` function by [@aleclarson](https://github.com/aleclarson) in [#81](https://github.com/radashi-org/radashi/pull/81)


## [radashi@12.2.0-beta.0dc9c8a] - 2024-07-10
### Details
#### <!-- 06 -->Fixed

- **(toggle)** Handle falsy input as expected by [@Minhir](https://github.com/Minhir) in [#82](https://github.com/radashi-org/radashi/pull/82)


#### <!-- 08 -->Types

- Handle tuples in `isArray` return type by [@aleclarson](https://github.com/aleclarson) in [9257535](https://github.com/radashi-org/radashi/commit/925753578761bda277838bf8fbbcc24b3813f2b9)

## [radashi@12.2.0-beta.a39a81e] - 2024-07-09
### Details
#### <!-- 03 -->Added

- Add `isMap` function by [@aleclarson](https://github.com/aleclarson) in [4f2e48c](https://github.com/radashi-org/radashi/commit/4f2e48c24e7e10162cf0040f8c9b7b91bc9a37c0)
- Add `isRegExp` function by [@aleclarson](https://github.com/aleclarson) in [58e7d96](https://github.com/radashi-org/radashi/commit/58e7d96baed7ea73e09dff3884aeebb6150f9485)
- Add `isSet` function by [@aleclarson](https://github.com/aleclarson) in [73e70c1](https://github.com/radashi-org/radashi/commit/73e70c1011fffa21d1d38bb04d5616073c8e8739)
- Add `isWeakSet` function by [@aleclarson](https://github.com/aleclarson) in [aacd5be](https://github.com/radashi-org/radashi/commit/aacd5be35e38e4ba7a6ecabb7942eafb26111486)
- Add `isWeakMap` function by [@aleclarson](https://github.com/aleclarson) in [f32cfd5](https://github.com/radashi-org/radashi/commit/f32cfd5c2160724d5d12d3e9f9a43c328daf0f4d)

## [radashi@12.2.0-beta.ef0154b] - 2024-07-08
### Details
#### <!-- 03 -->Added

- Add `once` function by [@aleclarson](https://github.com/aleclarson) in [#80](https://github.com/radashi-org/radashi/pull/80)

- Add `lerp` function by [@aleclarson](https://github.com/aleclarson) in [#86](https://github.com/radashi-org/radashi/pull/86)


#### <!-- 05 -->Changed

- **(pick)** Accept a callback for advanced picking by [@aleclarson](https://github.com/aleclarson) in [#30](https://github.com/radashi-org/radashi/pull/30)


#### <!-- 08 -->Types

- `select` return type when no condition is defined by [@aleclarson](https://github.com/aleclarson) in [ab76d65](https://github.com/radashi-org/radashi/commit/ab76d6502e479b378ad824c89974f389ec597a9e)
- Add `FilteredKeys` type by [@aleclarson](https://github.com/aleclarson) in [6a6f899](https://github.com/radashi-org/radashi/commit/6a6f899316229efc6706d8c40998df5fa99e004b)
- Improve the return type of `filterKey` by [@aleclarson](https://github.com/aleclarson) in [bc298c6](https://github.com/radashi-org/radashi/commit/bc298c6cfcaaf74726e1f2b901e210dea1fed641)

## [radashi@12.2.0-beta.c59abfd] - 2024-07-07
### Details
#### <!-- 03 -->Added

- Add `flip` function by [@aleclarson](https://github.com/aleclarson) in [#35](https://github.com/radashi-org/radashi/pull/35)


## [radashi@12.2.0-beta.85fb266] - 2024-07-05
### Details
#### <!-- 07 -->Performance

- **(shuffle)** Use the Fisher-Yates algorithm by [@eumkz](https://github.com/eumkz) in [#76](https://github.com/radashi-org/radashi/pull/76)


### New Contributors
* [@eumkz](https://github.com/eumkz) made their first contribution in [#76](https://github.com/radashi-org/radashi/pull/76)
## [radashi@12.2.0-beta.6bdfb09] - 2024-07-04
### Details
#### <!-- 06 -->Fixed

- `toInt` and `toFloat` should not throw on symbols by [@aleclarson](https://github.com/aleclarson) in [cafc7fc](https://github.com/radashi-org/radashi/commit/cafc7fc4833447d6e5ed6bdc88957201aae6372a)

#### <!-- 08 -->Types

- Improve the `isArray` return type for `unknown` input type by [@aleclarson](https://github.com/aleclarson) in [#72](https://github.com/radashi-org/radashi/pull/72)


## [radashi@12.2.0-beta.dc9ade1] - 2024-07-03
### Details
#### <!-- 03 -->Added

- Add `mapify` function by [@cimbraien](https://github.com/cimbraien) in [#58](https://github.com/radashi-org/radashi/pull/58)

- Add `unzip` function by [@aleclarson](https://github.com/aleclarson) in [#64](https://github.com/radashi-org/radashi/pull/64)


#### <!-- 07 -->Performance

- **(cluster)** Avoid an array allocation by [@aleclarson](https://github.com/aleclarson) in [#63](https://github.com/radashi-org/radashi/pull/63)

- **(replace)** Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#61](https://github.com/radashi-org/radashi/pull/61)

- **(merge)** Avoid arrow function in loop and avoid calling user-provided key generator more than once per item by [@aleclarson](https://github.com/aleclarson) in [#60](https://github.com/radashi-org/radashi/pull/60)

- **(replaceOrAppend)** Avoid creating 2 intermediate arrays by [@aleclarson](https://github.com/aleclarson) in [#62](https://github.com/radashi-org/radashi/pull/62)


#### <!-- 08 -->Types

- Let `zip` accept readonly arrays by [@aleclarson](https://github.com/aleclarson) in [f7d93cc](https://github.com/radashi-org/radashi/commit/f7d93cc9c9909e081a2584175154eb4a141d88a3)

### New Contributors
* [@cimbraien](https://github.com/cimbraien) made their first contribution in [#58](https://github.com/radashi-org/radashi/pull/58)
## [radashi@12.2.0-beta.af936c4] - 2024-07-01
### Details
#### <!-- 03 -->Added

- Add `round` function by [@shan-shaji](https://github.com/shan-shaji) in [#53](https://github.com/radashi-org/radashi/pull/53)


#### <!-- 08 -->Types

- Add `TryitResult<T>` type by [@aleclarson](https://github.com/aleclarson) in [f044364](https://github.com/radashi-org/radashi/commit/f0443644bace43ad3092751e0ba4193ead336ef6)
- Add `MemoOptions<T>` type by [@aleclarson](https://github.com/aleclarson) in [877a1e4](https://github.com/radashi-org/radashi/commit/877a1e4e4d6fba76eea04731e69f7490d3f3191a)
- Export `UppercaseKeys` and `LowercaseKeys` types by [@aleclarson](https://github.com/aleclarson) in [96b28b9](https://github.com/radashi-org/radashi/commit/96b28b9b037bd03277511d0174e4896729bcee93)

## [radashi@12.2.0-beta.8fb5382] - 2024-06-30
### Details
#### <!-- 05 -->Changed

- Add selectFirst by [@adamhamlin](https://github.com/adamhamlin) in [#52](https://github.com/radashi-org/radashi/pull/52)


#### <!-- 07 -->Performance

- **(series)** Avoid object spread in loop by [@cdreeves](https://github.com/cdreeves) in [#37](https://github.com/radashi-org/radashi/pull/37)


### New Contributors
* [@cdreeves](https://github.com/cdreeves) made their first contribution in [#37](https://github.com/radashi-org/radashi/pull/37)
## [radashi@12.2.0-beta.6fba837] - 2024-06-27
### Details
#### <!-- 03 -->Added

- Add `isIntString` function by [@aleclarson](https://github.com/aleclarson) in [fa500d3](https://github.com/radashi-org/radashi/commit/fa500d329d7e06062e7a42cbf4ff9ad9dcb89191)
- Add `isPlainObject` type guard by [@aleclarson](https://github.com/aleclarson) in [#16](https://github.com/radashi-org/radashi/pull/16)


#### <!-- 05 -->Changed

- **(intersects)** Let `identity` callback return any value by [@aleclarson](https://github.com/aleclarson) in [#11](https://github.com/radashi-org/radashi/pull/11)

- **(unique)** Let `toKey` return any kind of value by [@aleclarson](https://github.com/aleclarson) in [#10](https://github.com/radashi-org/radashi/pull/10)

- **(select)** Let `condition` be undefined by [@aleclarson](https://github.com/aleclarson) in [#9](https://github.com/radashi-org/radashi/pull/9)

- Replace `matchKeys` with `filterKey` by [@aleclarson](https://github.com/aleclarson) in [#28](https://github.com/radashi-org/radashi/pull/28)

- **(filterKey)** Accept null/undefined filter by [@aleclarson](https://github.com/aleclarson) in [b10ad10](https://github.com/radashi-org/radashi/commit/b10ad105bada331494c232b7a28f9d76ff77dded)

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


#### <!-- 08 -->Types

- Let `filterKey` accept `key: keyof any` by [@aleclarson](https://github.com/aleclarson) in [73ac8bb](https://github.com/radashi-org/radashi/commit/73ac8bba9e2a2a39eb3c117cc940cc2b18199834)

### New Contributors
* [@localusercamp](https://github.com/localusercamp) made their first contribution in [#33](https://github.com/radashi-org/radashi/pull/33)

[radashi@13.0.0-beta.87bc348]: https://github.com/radashi-org/radashi/compare/v12.9.8..v13.0.0-beta.87bc348

[radashi@12.9.8]: https://github.com/radashi-org/radashi/compare/v12.9.7..v12.9.8

[radashi@12.9.7]: https://github.com/radashi-org/radashi/compare/v12.9.6..v12.9.7

[radashi@12.9.6]: https://github.com/radashi-org/radashi/compare/v12.9.5..v12.9.6

[radashi@12.9.5]: https://github.com/radashi-org/radashi/compare/v12.9.4..v12.9.5

[radashi@12.9.4]: https://github.com/radashi-org/radashi/compare/v12.9.3..v12.9.4

[radashi@12.9.3]: https://github.com/radashi-org/radashi/compare/v12.9.2..v12.9.3

[radashi@12.9.2]: https://github.com/radashi-org/radashi/compare/v12.9.1..v12.9.2

[radashi@12.9.0]: https://github.com/radashi-org/radashi/compare/v12.8.1..v12.9.0

[radashi@12.8.1]: https://github.com/radashi-org/radashi/compare/v12.8.0..v12.8.1

[radashi@12.8.0]: https://github.com/radashi-org/radashi/compare/v12.7.2..v12.8.0

[radashi@12.7.2]: https://github.com/radashi-org/radashi/compare/v12.7.1..v12.7.2

[radashi@12.7.1]: https://github.com/radashi-org/radashi/compare/v13.0.0-beta.e48d72a..v12.7.1

[radashi@13.0.0-beta.e48d72a]: https://github.com/radashi-org/radashi/compare/v12.7.0..v13.0.0-beta.e48d72a

[radashi@12.7.0]: https://github.com/radashi-org/radashi/compare/v12.6.2..v12.7.0

[radashi@12.6.2]: https://github.com/radashi-org/radashi/compare/v12.6.1..v12.6.2

[radashi@12.6.1]: https://github.com/radashi-org/radashi/compare/v13.0.0-beta.99854e3..v12.6.1

[radashi@13.0.0-beta.99854e3]: https://github.com/radashi-org/radashi/compare/v12.6.0..v13.0.0-beta.99854e3

[radashi@12.6.0]: https://github.com/radashi-org/radashi/compare/v12.5.1..v12.6.0

[radashi@12.5.1]: https://github.com/radashi-org/radashi/compare/v12.5.0..v12.5.1

[radashi@12.5.0]: https://github.com/radashi-org/radashi/compare/v13.0.0-beta.f4c6a24..v12.5.0

[radashi@13.0.0-beta.f4c6a24]: https://github.com/radashi-org/radashi/compare/v12.4.0..v13.0.0-beta.f4c6a24

[radashi@12.4.0]: https://github.com/radashi-org/radashi/compare/v13.0.0-beta.55909fb..v12.4.0

[radashi@13.0.0-beta.ffa4778]: https://github.com/radashi-org/radashi/compare/v12.3.4..v13.0.0-beta.ffa4778

[radashi@12.3.4]: https://github.com/radashi-org/radashi/compare/v12.3.3..v12.3.4

[radashi@12.3.3]: https://github.com/radashi-org/radashi/compare/v12.3.2..v12.3.3

[radashi@12.3.2]: https://github.com/radashi-org/radashi/compare/v12.3.1..v12.3.2

[radashi@12.3.1]: https://github.com/radashi-org/radashi/compare/v12.3.0..v12.3.1

[radashi@12.3.0]: https://github.com/radashi-org/radashi/compare/v12.2.3..v12.3.0

[radashi@12.2.3]: https://github.com/radashi-org/radashi/compare/v12.2.2..v12.2.3

[radashi@12.2.2]: https://github.com/radashi-org/radashi/compare/v12.2.1..v12.2.2

[radashi@12.2.1]: https://github.com/radashi-org/radashi/compare/v12.2.0..v12.2.1

[radashi@12.2.0]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.af825f4..v12.2.0

[radashi@12.2.0-beta.af825f4]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.7fb6e89..v12.2.0-beta.af825f4

[radashi@12.2.0-beta.7fb6e89]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.83909af..v12.2.0-beta.7fb6e89

[radashi@12.2.0-beta.83909af]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.313bfb4..v12.2.0-beta.83909af

[radashi@12.2.0-beta.313bfb4]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.cf2d48e..v12.2.0-beta.313bfb4

[radashi@12.2.0-beta.cf2d48e]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.4aac7d7..v12.2.0-beta.cf2d48e

[radashi@12.2.0-beta.4aac7d7]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.c090534..v12.2.0-beta.4aac7d7

[radashi@12.2.0-beta.c090534]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.5b5a0a7..v12.2.0-beta.c090534

[radashi@12.2.0-beta.5b5a0a7]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.0dc9c8a..v12.2.0-beta.5b5a0a7

[radashi@12.2.0-beta.0dc9c8a]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.a39a81e..v12.2.0-beta.0dc9c8a

[radashi@12.2.0-beta.a39a81e]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.ef0154b..v12.2.0-beta.a39a81e

[radashi@12.2.0-beta.ef0154b]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.c59abfd..v12.2.0-beta.ef0154b

[radashi@12.2.0-beta.c59abfd]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.85fb266..v12.2.0-beta.c59abfd

[radashi@12.2.0-beta.85fb266]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.6bdfb09..v12.2.0-beta.85fb266

[radashi@12.2.0-beta.6bdfb09]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.dc9ade1..v12.2.0-beta.6bdfb09

[radashi@12.2.0-beta.dc9ade1]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.af936c4..v12.2.0-beta.dc9ade1

[radashi@12.2.0-beta.af936c4]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.8fb5382..v12.2.0-beta.af936c4

[radashi@12.2.0-beta.8fb5382]: https://github.com/radashi-org/radashi/compare/v12.2.0-beta.6fba837..v12.2.0-beta.8fb5382

[radashi@12.2.0-beta.6fba837]: https://github.com/radashi-org/radashi/compare/v12.1.0..v12.2.0-beta.6fba837

<!-- generated by git-cliff -->

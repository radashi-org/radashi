# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [radashi@12.7.0] - 2025-10-17
### Details
#### <!-- 03 -->Added

- Add `identity` function in [38e2f37](https://github.com/radashi-org/radashi/commit/38e2f37e411eefaf383d9c363ed1a481d69dbf38)
- Add `isArrayEqual` function in [095f2b0](https://github.com/radashi-org/radashi/commit/095f2b049fb29836c0b912630e4465cb56936deb)
- Add `isMapEqual` and `isSetEqual` functions in [0fa566a](https://github.com/radashi-org/radashi/commit/0fa566a133eb2dd85faa9116e3f18c930be4243f)
- Add `getOrInsert` and `getOrInsertComputed` in [4675076](https://github.com/radashi-org/radashi/commit/46750764d17ab545f9d5ed72e4ba5f4a0253070a)
- **(objectify)** Add `index` parameter to getKey and getValue functions in [1506472](https://github.com/radashi-org/radashi/commit/150647245b473b789a1c6f4b11e57d34f2ff5514)
- Add absoluteJitter and proportionalJitter in [ebea7d7](https://github.com/radashi-org/radashi/commit/ebea7d73a3b3ae7da6a3db82374600317fd25b08)

#### <!-- 05 -->Changed

- Preserve tuple type in `min`/`max` even with a `getter` in [c72a1c4](https://github.com/radashi-org/radashi/commit/c72a1c4b090cc985a2dd7baa44548693dc7e8e36)
- Use `identity` as default getter for `sort` in [df55a6e](https://github.com/radashi-org/radashi/commit/df55a6efacb129bf6bcbee00ff84f0886a604c23)

## [radashi@12.6.2] - 2025-08-20
### Details
#### <!-- 06 -->Fixed

- **(range)** Ensure `end` parameter works when 0 in [9c8ffa0](https://github.com/radashi-org/radashi/commit/9c8ffa041088f1096740d1de744cd3f24ed76f1c)

## [radashi@12.6.1] - 2025-08-09
### Details
#### <!-- 06 -->Fixed

- **(group)** Use `Object.create(null)` for the returned object in [5db8c37](https://github.com/radashi-org/radashi/commit/5db8c37f8e58379b63817144edcd422dbea5d989)

## [radashi@12.6.0] - 2025-06-26
### Details
#### <!-- 03 -->Added

- Add `assert` function in [c318129](https://github.com/radashi-org/radashi/commit/c318129b7409d4184ab689939c93db0759717ff3)
- Add `escapeHTML` function in [9ad9c0b](https://github.com/radashi-org/radashi/commit/9ad9c0b6aa4593cdf430364e3dfabdcd59fa1d59)
- Add `queueByKey` function in [fb30703](https://github.com/radashi-org/radashi/commit/fb30703d6bb142939b26faa75a58ed941849c987)
- Add `Semaphore` class in [5f733db](https://github.com/radashi-org/radashi/commit/5f733dbdcea2d63538b09258fce1b490e2fc4b4e)
- Add `parseDuration` and `parseQuantity` functions in [95e1336](https://github.com/radashi-org/radashi/commit/95e1336be329e6dfbe45a27d04a9dce1a334e5fd)
- Add `promiseChain` function in [f64fa07](https://github.com/radashi-org/radashi/commit/f64fa07da9afab79a2f4f39863c09ca7a9a26df3)

#### <!-- 05 -->Changed

- **(group)** Pass array index to callback in [6d66395](https://github.com/radashi-org/radashi/commit/6d66395d3e36194e01d95684b1c7815b093e5c09)

#### <!-- 06 -->Fixed

- **(selectFirst)** Filter out null from return type when no condition is given in [73cb995](https://github.com/radashi-org/radashi/commit/73cb9958cd795a3bb054450e4e247a7717a790ca)
- **(isIntString)** Prevent incorrect type narrowing in [fafd68a](https://github.com/radashi-org/radashi/commit/fafd68a0ec9b016ff3a2fc157df3e20091be49dc)

## [radashi@12.5.1] - 2025-05-23
### Details
#### <!-- 06 -->Fixed

- **(set)** Avoid mutating nested objects without first cloning them in [fc3c7c9](https://github.com/radashi-org/radashi/commit/fc3c7c91b6c864febad70528e0c39b2177b89adb)
- **(set)** Prevent prototype pollution in [8147abc](https://github.com/radashi-org/radashi/commit/8147abc8cfc3cfe9b9a17cd389076a5d97235a66)

## [radashi@12.5.0] - 2025-05-15
### Details
#### <!-- 03 -->Added

- Add `pluck` function in [8d5c06c](https://github.com/radashi-org/radashi/commit/8d5c06c36056dc589d3ca7cfd13512cc54c46115)
- Add `concat` function in [8f54e73](https://github.com/radashi-org/radashi/commit/8f54e73e7a18cd5da897de0b69dd357125dbb213)

#### <!-- 05 -->Changed

- **(cluster)** Use tuple types for common size constants in [ca2abdd](https://github.com/radashi-org/radashi/commit/ca2abdd6fd996cf397501f8123be8de40c24c11e)

#### <!-- 06 -->Fixed

- **(mapify)** Pass the actual array index to callbacks in [a83a72d](https://github.com/radashi-org/radashi/commit/a83a72d30f134ff0eb9489da68dc24f569771bf2)
- **(cluster)** Avoid infinite loop when size is `0` in [214ce5d](https://github.com/radashi-org/radashi/commit/214ce5dccb3638b6b6770b1ffde5485735321c2b)

#### <!-- 08 -->Types

- Handle object types in CompatibleProperty in [7f72da3](https://github.com/radashi-org/radashi/commit/7f72da3933854623eef444a15a8289feb2f0583a)

## [radashi@12.4.0] - 2025-03-16
### Details
#### <!-- 03 -->Added

- Add `isBigInt` function in [05ae69a](https://github.com/radashi-org/radashi/commit/05ae69ac97810ffa84f83745e8a358f1353c52e5)
- Add `remove` function in [e29c59e](https://github.com/radashi-org/radashi/commit/e29c59e576abfd087b0d6ebc4491150e080a1c0e)
- Add `isAsyncIterable` function in [d3c69d7](https://github.com/radashi-org/radashi/commit/d3c69d7aa814fff20413f26697c83ee04b4553a9)
- Add `memoLastCall` function in [5848451](https://github.com/radashi-org/radashi/commit/584845159758bec69131fb341e246d0f356e5e3a)
- Add `toResult` function in [66299bd](https://github.com/radashi-org/radashi/commit/66299bd02a2eb7368f790ad861a1a536daedb93c)

#### <!-- 08 -->Types

- `reduce` accumulator type when no initial value is given in [7a14bf6](https://github.com/radashi-org/radashi/commit/7a14bf6c069c07b7c4700cb7568acbb0aa699ca8)

## [radashi@12.3.4] - 2025-01-26
### Details
#### <!-- 06 -->Fixed

- **(reduce)** Align with native reduce behavior + perf improvements in [1bc47b7](https://github.com/radashi-org/radashi/commit/1bc47b74dc1b21178c7ee61a6d7a0762196bf746)

## [radashi@12.3.3] - 2025-01-11
### Details
#### <!-- 08 -->Types

- Let `map` callback return a `PromiseLike` object in [1c679b3](https://github.com/radashi-org/radashi/commit/1c679b3fc51c26fe90af0651e2e9ebf169de9014)

## [radashi@12.3.2] - 2025-01-10
### Details
#### <!-- 06 -->Fixed

- **(shuffle)** Correction to Fisher-Yates implementation in [5df2dc8](https://github.com/radashi-org/radashi/commit/5df2dc82ab850638ab3476497b32bec1f7f7877d)

## [radashi@12.3.1] - 2025-01-07
### Details
#### <!-- 06 -->Fixed

- **(parallel)** Avoid range error with empty array in [f16445d](https://github.com/radashi-org/radashi/commit/f16445d22b0374ad9fe86cf66f491bfe315b4650)

## [radashi@12.3.0] - 2024-12-01
### Details
#### <!-- 00 -->Security

- Pin cspell version in [a33e5a4](https://github.com/radashi-org/radashi/commit/a33e5a47cd30b4db65f0a7f86eb1174baf6f481a)

#### <!-- 03 -->Added

- Add `signal` option to `retry` and `parallel` in [73a4e90](https://github.com/radashi-org/radashi/commit/73a4e9035b7ca4ebbb13a1245b2d1ddfa7c00e6d)
- Add `isClass` function in [2d1b3b2](https://github.com/radashi-org/radashi/commit/2d1b3b2864cc16ede1c7ec75e0c83270adb377f7)
- Add `isNullish` function in [7470f9d](https://github.com/radashi-org/radashi/commit/7470f9db2f324f01a6966bd04c7bb21e60bc10ed)
- Add `cartesianProduct` function in [84dd509](https://github.com/radashi-org/radashi/commit/84dd50995936b390f26b744611a07ca3f4356810)
- Add `isUndefined` function in [d527d98](https://github.com/radashi-org/radashi/commit/d527d984f8e42c8f0ce31d364ca7ebdbeb8954ae)
- Add `timeout` function in [6a0ba7e](https://github.com/radashi-org/radashi/commit/6a0ba7e5aaa304b5f14479fa984e2dd7b3dacfac)
- Add `dedent` function in [14132e5](https://github.com/radashi-org/radashi/commit/14132e522709bd929251c98d08f2bea032542191)

#### <!-- 05 -->Changed

- **(parallel)** Clamp the limit between 1 and array length in [b4854f6](https://github.com/radashi-org/radashi/commit/b4854f60f1da4ca8cb33f68e1ad16656cabd7ac5)

## [radashi@12.2.3] - 2024-11-12
### Details
#### <!-- 06 -->Fixed

- **(all)** Be more lenient, reduce memory usage in [e6accd8](https://github.com/radashi-org/radashi/commit/e6accd870910f8df9487b6f54e1888bc5ae1ba92)

## [radashi@12.2.2] - 2024-11-10
### Details
#### <!-- 08 -->Types

- Export `PromiseWithResolvers` type in [a2a5da1](https://github.com/radashi-org/radashi/commit/a2a5da1d9e215fdf73da6860e7b62b24dec81559)
- Improve `isEmpty` signature in [b95cb73](https://github.com/radashi-org/radashi/commit/b95cb73226b9616056197991e3425db4b8adeb46)
- Narrow return type of `first` and `last` in [665ba72](https://github.com/radashi-org/radashi/commit/665ba72328b25014e907a7f956eb002086d1994c)
- Improve `draw` signature for non-empty arrays in [fee290a](https://github.com/radashi-org/radashi/commit/fee290ad08f9fa5413ccde3f06fe5667dd5a5ec4)

## [radashi@12.2.1] - 2024-11-09
### Details
#### <!-- 08 -->Types

- Improve signature of `shake` in [8fe71d8](https://github.com/radashi-org/radashi/commit/8fe71d82bdd67ec94c80d2d0c3318b1e62a58edb)
- `mapValues` index signature handling in [2ade9be](https://github.com/radashi-org/radashi/commit/2ade9bec805c3612e5bb08c7edd025af51a2dad5)
- Let `zipToObject` receive readonly arrays in [2c68597](https://github.com/radashi-org/radashi/commit/2c685979897fab26eac2a66fa676b0e01ab6349b)

## [radashi@12.2.0] - 2024-11-01
### Details
#### <!-- 03 -->Added

- Add `isIntString` function in [fa500d3](https://github.com/radashi-org/radashi/commit/fa500d329d7e06062e7a42cbf4ff9ad9dcb89191)
- Add `isPlainObject` type guard in [ddae618](https://github.com/radashi-org/radashi/commit/ddae6182de6afb270a9e94c4dafcabe51dea602f)
- Add `round` function in [eadf5d0](https://github.com/radashi-org/radashi/commit/eadf5d03054a0cba93c989303debfd99144e9d0c)
- Add `mapify` function in [b82b292](https://github.com/radashi-org/radashi/commit/b82b292212c0b2c72df2d103c495800843834fa1)
- Add `unzip` function in [dc0a546](https://github.com/radashi-org/radashi/commit/dc0a54607d4abc5bd73c386c5dc3f4667728fb7a)
- Add `flip` function in [66a71b0](https://github.com/radashi-org/radashi/commit/66a71b0e454f1431530745d9d6975de01db4bc33)
- Add `once` function in [3401240](https://github.com/radashi-org/radashi/commit/340124042ca838dbd5911a277a4759332cbcbc14)
- Add `lerp` function in [072778f](https://github.com/radashi-org/radashi/commit/072778fbef15b2200642155ccfb146fc8a902b6d)
- Add `isMap` function in [4f2e48c](https://github.com/radashi-org/radashi/commit/4f2e48c24e7e10162cf0040f8c9b7b91bc9a37c0)
- Add `isRegExp` function in [58e7d96](https://github.com/radashi-org/radashi/commit/58e7d96baed7ea73e09dff3884aeebb6150f9485)
- Add `isSet` function in [73e70c1](https://github.com/radashi-org/radashi/commit/73e70c1011fffa21d1d38bb04d5616073c8e8739)
- Add `isWeakSet` function in [aacd5be](https://github.com/radashi-org/radashi/commit/aacd5be35e38e4ba7a6ecabb7942eafb26111486)
- Add `isWeakMap` function in [f32cfd5](https://github.com/radashi-org/radashi/commit/f32cfd5c2160724d5d12d3e9f9a43c328daf0f4d)
- Add `traverse` function in [2231c0e](https://github.com/radashi-org/radashi/commit/2231c0e8f782d6dfcdbf20509340eb4aad095d78)
- Add `cloneDeep` function in [46ee7c7](https://github.com/radashi-org/radashi/commit/46ee7c73a6b89d562517286d56e7c2b1e658848d)
- Add `castMapping` function in [27382bb](https://github.com/radashi-org/radashi/commit/27382bb554901c434c19b7f37c1d840d664f4bab)
- Add `clamp` function in [7f4a449](https://github.com/radashi-org/radashi/commit/7f4a4499e7dbdb6ee7247abf967d415773e776a1)
- Add `castArray` and `castArrayIfExists` in [8758ed7](https://github.com/radashi-org/radashi/commit/8758ed7201443eff34e9664cbd828945795d6230)
- Add `castComparator` function in [ddc114c](https://github.com/radashi-org/radashi/commit/ddc114cfc9c6e8704833c32366b7d8a5b67d2404)
- Add reverse argument to `castComparator` in [1d7937e](https://github.com/radashi-org/radashi/commit/1d7937ef006139883aedac782ad032c1d6269c7a)
- Add `isBoolean` function in [adc419d](https://github.com/radashi-org/radashi/commit/adc419d5bbb1786d75619ed3d7f41a45f68c9857)
- Add `noop` and `always` functions in [eb77c8f](https://github.com/radashi-org/radashi/commit/eb77c8f004a35f1499968f6e40d01b3595384848)
- Add `similarity` function in [dac01cc](https://github.com/radashi-org/radashi/commit/dac01ccb918629cc4191b8b7db47bb3cb050f9cc)
- **(throttle)** Add `trailing` option in [0480a16](https://github.com/radashi-org/radashi/commit/0480a167e5496ba0b379e3d8a144082902f4c459)
- **(throttle)** Add `trigger` method to ThrottleFunction in [ac3f6d9](https://github.com/radashi-org/radashi/commit/ac3f6d9e4806cb46428a0265a07bd58b37e95a13)
- Add `withResolvers` ponyfill in [79f1ac7](https://github.com/radashi-org/radashi/commit/79f1ac74247d7d8565128fd10d1a1a0ca32b010a)
- **(debounce)** Add `leading` option in [942057e](https://github.com/radashi-org/radashi/commit/942057eb2383178d6d71c04a5d91e7fbf656da1b)
- Add isResult, isResultOk, and isResultErr functions in [08d4329](https://github.com/radashi-org/radashi/commit/08d4329536f5d128982410813ccb44db8788ab0e)
- Add `isError` function in [c772099](https://github.com/radashi-org/radashi/commit/c77209900d11d4167a5ac1981bc731fa50491ce9)

#### <!-- 05 -->Changed

- **(intersects)** Let `identity` callback return any value in [49a0dc4](https://github.com/radashi-org/radashi/commit/49a0dc49c93e2785d928ae35cc45518586f1fd7b)
- **(unique)** Let `toKey` return any kind of value in [3fd8446](https://github.com/radashi-org/radashi/commit/3fd8446522aba8236b3151636191e64713ff2377)
- **(select)** Let `condition` be undefined in [dc74ace](https://github.com/radashi-org/radashi/commit/dc74aceedfd90bf4b443dc25a7ae548db9cf2ba9)
- Replace `matchKeys` with `filterKey` in [3652c3e](https://github.com/radashi-org/radashi/commit/3652c3e8fa7af3b5c2438363a374d1683ea7c408)
- **(filterKey)** Accept null/undefined filter in [b10ad10](https://github.com/radashi-org/radashi/commit/b10ad105bada331494c232b7a28f9d76ff77dded)
- Add selectFirst in [f792633](https://github.com/radashi-org/radashi/commit/f792633c2db24cba2a27334f685b562f6914af15)
- **(pick)** Accept a callback for advanced picking in [b9dc648](https://github.com/radashi-org/radashi/commit/b9dc6480553589bcdda3174c78be98861ded188c)
- **(mapify)** Provide an index argument to the callbacks in [f010ad4](https://github.com/radashi-org/radashi/commit/f010ad47d70d1612668350441d78c3e981ac6cff)
- Use native AggregateError if available in [5668b85](https://github.com/radashi-org/radashi/commit/5668b85246219776bf9b98fb8734f528521b0ed9)

#### <!-- 06 -->Fixed

- **(retry)** Stop using `range()` in [5d60893](https://github.com/radashi-org/radashi/commit/5d60893471240516a49c6ddf48839165b5961a47)
- **(assign)** Remove inefficiencies in loop in [99274cc](https://github.com/radashi-org/radashi/commit/99274cce29a375071779e522f0e95c3dee705d2d)
- **(set)** Avoid false positive of array index in path in [ff0c3cf](https://github.com/radashi-org/radashi/commit/ff0c3cf03a16265e02de5614eea659ebbdf77f5f)
- **(shake)** Stop using `Omit` on return type and give `filter` parameter a safer type in [e6f75aa](https://github.com/radashi-org/radashi/commit/e6f75aa836358491f4d1a1088b498cc2cd73cb09)
- **(series)** Allow `items` param to be a readonly array in [5114eb2](https://github.com/radashi-org/radashi/commit/5114eb22ecc8cc22fb1b3cb687cab79e8159e196)
- Copy `is-plain-obj` implementation in [08a18e2](https://github.com/radashi-org/radashi/commit/08a18e218d83bf094354d4af1b5c9dcf92c18d1f)
- Avoid `isObject` for internal use in [3b6a67c](https://github.com/radashi-org/radashi/commit/3b6a67ca7298cdcfde329a4ef28440205602b0e3)
- **(isArray)** Work with `readonly T[]` types in [88c12b6](https://github.com/radashi-org/radashi/commit/88c12b6e3941b1fa6072b9ec9bf214c508e7bb70)
- **(keys)** Improve perf by avoiding excessive array allocations in [f0e06ba](https://github.com/radashi-org/radashi/commit/f0e06ba0cfa172df34054055dde507704ed10277)
- Ensure `mapValues` and `group` work together in [630f9ef](https://github.com/radashi-org/radashi/commit/630f9efc471dd7cf3d31a4024059eff37d2a45c6)
- Use typeof in `isFunction` in [6ad96f4](https://github.com/radashi-org/radashi/commit/6ad96f44f17949ee33acda9a073307b19dca7796)
- `toInt` and `toFloat` should not throw on symbols in [cafc7fc](https://github.com/radashi-org/radashi/commit/cafc7fc4833447d6e5ed6bdc88957201aae6372a)
- **(toggle)** Handle falsy input as expected in [547c6f3](https://github.com/radashi-org/radashi/commit/547c6f335cb67a03d70314e800a764d287d68b48)
- **(assign)** Fix overriding a nested object with null in [30c42e9](https://github.com/radashi-org/radashi/commit/30c42e9563249254987e707d5d0792bd6ea00432)
- **(crush)** Fix handling of period-containing property names in [a5e5180](https://github.com/radashi-org/radashi/commit/a5e51808a73480b525884a293deaf4c748e983f2)
- **(toggle)** Use -1 as index for `toKey()` with toggled `item` in [10ee12d](https://github.com/radashi-org/radashi/commit/10ee12d87cf808e1e3e3381032074c5d7b67c6fc)
- **(pascal)** Handle camel-cased strings correctly in [a1c8822](https://github.com/radashi-org/radashi/commit/a1c882280c8b3b7ce43fb34807fc449f0fc1fe54)

#### <!-- 07 -->Performance

- Avoid excessive array allocation in `fork` in [88807cc](https://github.com/radashi-org/radashi/commit/88807cc0e73f5877ea3a6aafb0f5abfc6429c926)
- Make `template` faster in [8e4eb5e](https://github.com/radashi-org/radashi/commit/8e4eb5e997501e02430ecbd08d1738004237f172)
- **(series)** Avoid object spread in loop in [d3b6331](https://github.com/radashi-org/radashi/commit/d3b6331cdd1334d82da263ecf3897c3317bafece)
- **(cluster)** Avoid an array allocation in [978789d](https://github.com/radashi-org/radashi/commit/978789d3b57626cb7243b370ef470f53fcf02a73)
- **(replace)** Avoid creating 2 intermediate arrays in [20daf2a](https://github.com/radashi-org/radashi/commit/20daf2a3d0e89ad8e2c4856d6cd904305d433b13)
- **(merge)** Avoid arrow function in loop and avoid calling user-provided key generator more than once per item in [1437d19](https://github.com/radashi-org/radashi/commit/1437d19e1a41c5e1e0753f1451b42187e2e7f6d4)
- **(replaceOrAppend)** Avoid creating 2 intermediate arrays in [26ecbc7](https://github.com/radashi-org/radashi/commit/26ecbc78839c483c97122c4b05851c92aede7c84)
- **(shuffle)** Use the Fisher-Yates algorithm in [27b1710](https://github.com/radashi-org/radashi/commit/27b17106bc78e339ff987f86837b237b09303d93)
- **(merge)** Improved handling of large arrays in [d8f7281](https://github.com/radashi-org/radashi/commit/d8f72812cbb6dffad8254093666fea46a028c701)

#### <!-- 08 -->Types

- Let `filterKey` accept `key: keyof any` in [73ac8bb](https://github.com/radashi-org/radashi/commit/73ac8bba9e2a2a39eb3c117cc940cc2b18199834)
- Add `TryitResult<T>` type in [f044364](https://github.com/radashi-org/radashi/commit/f0443644bace43ad3092751e0ba4193ead336ef6)
- Add `MemoOptions<T>` type in [877a1e4](https://github.com/radashi-org/radashi/commit/877a1e4e4d6fba76eea04731e69f7490d3f3191a)
- Export `UppercaseKeys` and `LowercaseKeys` types in [96b28b9](https://github.com/radashi-org/radashi/commit/96b28b9b037bd03277511d0174e4896729bcee93)
- Let `zip` accept readonly arrays in [f7d93cc](https://github.com/radashi-org/radashi/commit/f7d93cc9c9909e081a2584175154eb4a141d88a3)
- Improve the `isArray` return type for `unknown` input type in [ef14440](https://github.com/radashi-org/radashi/commit/ef14440d4e53805f7acbb118aeea6e1926962f01)
- `select` return type when no condition is defined in [ab76d65](https://github.com/radashi-org/radashi/commit/ab76d6502e479b378ad824c89974f389ec597a9e)
- Add `FilteredKeys` type in [6a6f899](https://github.com/radashi-org/radashi/commit/6a6f899316229efc6706d8c40998df5fa99e004b)
- Improve the return type of `filterKey` in [bc298c6](https://github.com/radashi-org/radashi/commit/bc298c6cfcaaf74726e1f2b901e210dea1fed641)
- Handle tuples in `isArray` return type in [9257535](https://github.com/radashi-org/radashi/commit/925753578761bda277838bf8fbbcc24b3813f2b9)
- Make `select` more option-friendly in [c9cfcd0](https://github.com/radashi-org/radashi/commit/c9cfcd0a7eb1af98682f5d9b56555162c92b7085)
- Let `shift` accept a readonly array type in [5e19d66](https://github.com/radashi-org/radashi/commit/5e19d66f324a6f9c491da13f3c9930ac7dcfc036)
- Remove type constraint for mapped array passed to `sum` in [dea0f50](https://github.com/radashi-org/radashi/commit/dea0f504f417b23aaf2b91495943501c894a172a)
- Make `assign` return type more accurate + add `Assign` type in [f1e4957](https://github.com/radashi-org/radashi/commit/f1e495720fd70ac7f87a011026b249731a2f24ac)
- Add Ok/Err/Result/ResultPromise types in [f5db070](https://github.com/radashi-org/radashi/commit/f5db07075698b4c0a7f2650c87a3cfad653be0f6)
- Align `isPromise` return type with its logic in [d6e0dff](https://github.com/radashi-org/radashi/commit/d6e0dff794fa8947d8d362eb75e74f66045f1452)
- Publicize the `Falsy` type in [736d334](https://github.com/radashi-org/radashi/commit/736d3342f86cf16199d6d50cacd0cec3f51db078)
- Avoid inferring `memo` return type from `key` option in [7b4656e](https://github.com/radashi-org/radashi/commit/7b4656ef5ccc4ad6a06ab598407a92557594fcd6)
- Allow readonly array in `omit` function in [a88fa1b](https://github.com/radashi-org/radashi/commit/a88fa1b0d2014b991830753400b9d1705ca0cd29)


[radashi@12.7.0]: https://github.com/radashi-org/radashi/compare/v12.6.2..v12.7.0

[radashi@12.6.2]: https://github.com/radashi-org/radashi/compare/v12.6.1..v12.6.2

[radashi@12.6.1]: https://github.com/radashi-org/radashi/compare/v12.6.0..v12.6.1

[radashi@12.6.0]: https://github.com/radashi-org/radashi/compare/v12.5.1..v12.6.0

[radashi@12.5.1]: https://github.com/radashi-org/radashi/compare/v12.5.0..v12.5.1

[radashi@12.5.0]: https://github.com/radashi-org/radashi/compare/v12.4.0..v12.5.0

[radashi@12.4.0]: https://github.com/radashi-org/radashi/compare/v12.3.4..v12.4.0

[radashi@12.3.4]: https://github.com/radashi-org/radashi/compare/v12.3.3..v12.3.4

[radashi@12.3.3]: https://github.com/radashi-org/radashi/compare/v12.3.2..v12.3.3

[radashi@12.3.2]: https://github.com/radashi-org/radashi/compare/v12.3.1..v12.3.2

[radashi@12.3.1]: https://github.com/radashi-org/radashi/compare/v12.3.0..v12.3.1

[radashi@12.3.0]: https://github.com/radashi-org/radashi/compare/v12.2.3..v12.3.0

[radashi@12.2.3]: https://github.com/radashi-org/radashi/compare/v12.2.2..v12.2.3

[radashi@12.2.2]: https://github.com/radashi-org/radashi/compare/v12.2.1..v12.2.2

[radashi@12.2.1]: https://github.com/radashi-org/radashi/compare/v12.2.0..v12.2.1

[radashi@12.2.0]: https://github.com/radashi-org/radashi/compare/v12.1.0..v12.2.0

<!-- generated by git-cliff -->

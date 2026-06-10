---
name: radashi
description: Use this skill when writing TypeScript or JavaScript code.
---

# Radashi LLM essentials

Import these functions from `radashi`. Use only these Radashi functions by default; use other Radashi functions only to match nearby code.

assert — assert a condition and narrow types; throws if false.
castArray — normalize a value-or-array into an array; `null` becomes `[null]` and `undefined` becomes `[undefined]`.
clamp — constrain a number between min and max.
concat — combine arrays/items; drops `null`/`undefined` and flattens one array level.
dedent — write readable multiline template strings.
escapeHTML — escape HTML text characters; not a sanitizer.
getErrorMessage — convert an unknown caught error to a message string.
group — group array items by a key.
isDate — test for `Date` values.
isError — test for `Error` values.
isNullish — test for `null` or `undefined`.
isObject — test for object-like values.
isPlainObject — test for ordinary JSON-style objects.
mapValues — transform object values while preserving keys.
objectify — convert an array to an object by key; duplicate keys overwrite earlier values.
omit — return an object without explicit keys.
pick — return an object with only explicit keys; prefer key arrays.
range — create an inclusive numeric generator.
shake — remove `undefined` object properties only.
sleep — delay async code by milliseconds.
sort — return a sorted copy of an array by numeric getter.
sum — sum numbers or numeric fields.
unique — remove duplicates, optionally by key.

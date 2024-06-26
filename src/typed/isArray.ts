// The function wrapper exists to ensure `isArray` can be tree-shaked.
// Its performance impact is negligible.
export const isArray = /* @__PURE__ */ (() =>
  Array.isArray as (value: unknown) => value is readonly any[])()

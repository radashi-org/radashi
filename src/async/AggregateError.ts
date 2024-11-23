interface AggregateError extends Error {
  errors: any[]
}

interface AggregateErrorConstructor {
  new (errors: Iterable<any>, message?: string): AggregateError
  (errors: Iterable<any>, message?: string): AggregateError
  readonly prototype: AggregateError
}

declare const globalThis: {
  AggregateError?: AggregateErrorConstructor
}

/**
 * The `AggregateError` object represents an error when several errors
 * need to be wrapped in a single error.
 *
 * As this error type is relatively new, it's not available in every
 * environment supported by Radashi (last checked on July 20, 2024).
 * When it's not globally defined, Radashi provides a polyfill.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
 * @version 12.2.0
 */
const AggregateErrorOrPolyfill: AggregateErrorConstructor =
  /* @__PURE__ */ (() =>
    globalThis.AggregateError ??
    (class AggregateError extends Error {
      errors: Error[]
      constructor(errors: Error[] = []) {
        super()
        const name = errors.find(e => e.name)?.name ?? ''
        this.name = `AggregateError(${name}...)`
        this.message = `AggregateError with ${errors.length} errors`
        this.stack = errors.find(e => e.stack)?.stack ?? this.stack!
        this.errors = errors
      }
    } as unknown as AggregateErrorConstructor))()

// Do not export directly, so the polyfill isn't renamed to
// `AggregateError2` at build time (which ESBuild does to prevent
// variable shadowing).
export { AggregateErrorOrPolyfill as AggregateError }

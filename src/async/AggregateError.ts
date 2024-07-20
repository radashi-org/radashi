/// <reference lib="es2021.promise" />

declare const process: { env: any } | undefined

/**
 * Support for the built-in AggregateError is still new. Node < 15
 * doesn't have it so patching here.
 *
 * If `AggregateError` is globally available, it will be used;
 * otherwise a polyfill is provided by Radashi.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError#browser_compatibility
 */
const AggregateErrorOrPolyfill: AggregateErrorConstructor =
  globalThis.AggregateError ??
  (class AggregateError extends Error {
    errors: Error[]
    constructor(errors: Error[] = []) {
      super()
      const name = errors.find(e => e.name)?.name ?? ''
      this.name = `AggregateError(${name}...)`
      this.message = `AggregateError with ${errors.length} errors`
      this.stack = errors.find(e => e.stack)?.stack ?? this.stack
      this.errors = errors
    }
  } as unknown as AggregateErrorConstructor)

// Do not export directly, so the polyfill isn't renamed to
// `AggregateError2` at build time (which ESBuild does to prevent
// variable shadowing).
export { AggregateErrorOrPolyfill as AggregateError }

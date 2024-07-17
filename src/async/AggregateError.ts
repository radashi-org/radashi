/// <reference lib="es2021.promise" />
/**
 * Support for the built-in AggregateError is still new. Node < 15
 * doesn't have it so patching here.
 * If AggregateError is available, it will be used; otherwise use
 * a polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError#browser_compatibility
 */
class AggregateErrorPolyfill extends Error {
  errors: Error[]
  constructor(errors: Error[] = []) {
    super()
    const name = errors.find(e => e.name)?.name ?? ''
    this.name = `AggregateError(${name}...)`
    this.message = `AggregateError with ${errors.length} errors`
    this.stack = errors.find(e => e.stack)?.stack ?? this.stack
    this.errors = errors
  }
}

export const AggregateError: AggregateErrorConstructor =
  globalThis.AggregateError ?? AggregateErrorPolyfill

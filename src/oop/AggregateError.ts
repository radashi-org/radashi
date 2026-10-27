interface AggregateError extends Error {
  errors: any[]
  cause?: unknown
}

interface AggregateErrorConstructor {
  new (
    errors: Iterable<any>,
    message?: string,
    options?: { cause?: unknown },
  ): AggregateError
  (
    errors: Iterable<any>,
    message?: string,
    options?: { cause?: unknown },
  ): AggregateError
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
 * The polyfill copies the iterable of errors and supports an optional
 * message and `options.cause`, like the native constructor.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
 * @version 12.2.0
 */
const AggregateErrorOrPolyfill: AggregateErrorConstructor =
  /* @__PURE__ */ (() => {
    if (globalThis.AggregateError) {
      return globalThis.AggregateError
    }

    function AggregateError(
      errors: Iterable<any>,
      message?: string,
      options: { cause?: unknown } | undefined = undefined,
    ): AggregateError {
      const error = Reflect.construct(
        Error,
        [message],
        new.target ?? AggregateError,
      )
      if (
        options !== null &&
        (typeof options === 'object' || typeof options === 'function') &&
        'cause' in options
      ) {
        Object.defineProperty(error, 'cause', {
          value: options.cause,
          writable: true,
          configurable: true,
        })
      }
      Object.defineProperty(error, 'errors', {
        value: [...errors],
        writable: true,
        configurable: true,
      })
      return error
    }

    Object.setPrototypeOf(AggregateError, Error)
    Object.setPrototypeOf(AggregateError.prototype, Error.prototype)
    Object.defineProperty(AggregateError, 'prototype', { writable: false })
    Object.defineProperties(AggregateError.prototype, {
      name: { value: 'AggregateError', writable: true, configurable: true },
      message: { value: '', writable: true, configurable: true },
    })
    return AggregateError as unknown as AggregateErrorConstructor
  })()

// Do not export directly, so the polyfill isn't renamed to
// `AggregateError2` at build time (which ESBuild does to prevent
// variable shadowing).
export { AggregateErrorOrPolyfill as AggregateError }

/**
 * Gets a readable message from an unknown error value.
 *
 * Empty error messages and unsupported values return `"Unknown error."`.
 *
 * @see https://radashi.js.org/reference/typed/getErrorMessage
 * @example
 * ```ts
 * getErrorMessage(new Error('Request failed')) // => 'Request failed'
 * getErrorMessage('Request failed') // => 'Request failed'
 * getErrorMessage(null) // => 'Unknown error.'
 * ```
 * @version 12.8.0
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return typeof error === 'string' && error.length > 0
    ? error
    : 'Unknown error.'
}

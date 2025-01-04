/**
 * Clean an URL by removing duplicate slashes.
 * The protocol part of the URL is not modified.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The cleaned URL string, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @example
 * ```ts
 * cleanPath('/path//to///resource') // => '/path/to/resource'
 * cleanPath('http://example.com//path//to///resource') // => 'http://example.com/path/to/resource'
 * cleanPath(undefined) // => undefined
 * cleanPath(null) // => null
 * ```
 */
export function cleanPath(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  return url.replace(/([^:]\/)\/+/g, '$1')
}

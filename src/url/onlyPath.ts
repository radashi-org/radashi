/**
 * Extract only the path from an URI with optional query and fragments.
 *
 * For example, all these parameters will return `/path`:
 *  - `/path`
 *  - `/path?query=thing`
 *  - `/path#fragment`
 *  - `/path?query=thing#fragment`
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without query and fragment, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @example
 * ```ts
 * onlyPath('/path') // => '/path'
 * onlyPath('/path?query=thing') // => '/path'
 * onlyPath('/path#fragment') // => '/path'
 * onlyPath('/path?query=thing#fragment') // => '/path'
 * onlyPath(undefined) // => undefined
 * onlyPath(null) // => null
 * ```
 */
export function onlyPath(url: string): string

/**
 * Extract only the path from an URI with optional query and fragments.
 *
 * For example, all these parameters will return `/path`:
 *  - `/path`
 *  - `/path?query=thing`
 *  - `/path#fragment`
 *  - `/path?query=thing#fragment`
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without query and fragment, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @example
 * ```ts
 * onlyPath('/path') // => '/path'
 * onlyPath('/path?query=thing') // => '/path'
 * onlyPath('/path#fragment') // => '/path'
 * onlyPath('/path?query=thing#fragment') // => '/path'
 * onlyPath(undefined) // => undefined
 * onlyPath(null) // => null
 * ```
 */
export function onlyPath(url: null): null

/**
 * Extract only the path from an URI with optional query and fragments.
 *
 * For example, all these parameters will return `/path`:
 *  - `/path`
 *  - `/path?query=thing`
 *  - `/path#fragment`
 *  - `/path?query=thing#fragment`
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without query and fragment, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @example
 * ```ts
 * onlyPath('/path') // => '/path'
 * onlyPath('/path?query=thing') // => '/path'
 * onlyPath('/path#fragment') // => '/path'
 * onlyPath('/path?query=thing#fragment') // => '/path'
 * onlyPath(undefined) // => undefined
 * onlyPath(null) // => null
 * ```
 */
export function onlyPath(url: undefined): undefined

/**
 * Extract only the path from an URI with optional query and fragments.
 *
 * For example, all these parameters will return `/path`:
 *  - `/path`
 *  - `/path?query=thing`
 *  - `/path#fragment`
 *  - `/path?query=thing#fragment`
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without query and fragment, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @example
 * ```ts
 * onlyPath('/path') // => '/path'
 * onlyPath('/path?query=thing') // => '/path'
 * onlyPath('/path#fragment') // => '/path'
 * onlyPath('/path?query=thing#fragment') // => '/path'
 * onlyPath(undefined) // => undefined
 * onlyPath(null) // => null
 * ```
 */
export function onlyPath(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  const [path] = url.split(/[?#]/)
  return path
}

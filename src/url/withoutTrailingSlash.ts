/**
 * Removes the trailing slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutTrailingSlash
 *
 * @example
 * ```ts
 * withoutTrailingSlash('') // => ''
 * withoutTrailingSlash('/') // => ''
 * withoutTrailingSlash('no/slash/') // => 'no/slash'
 * withoutTrailingSlash('already/has/slash') // => 'already/has/slash'
 * withoutTrailingSlash(undefined) // => undefined
 * withoutTrailingSlash(null) // => null
 * ```
 */
export function withoutTrailingSlash(url: string): string

/**
 * Removes the trailing slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutTrailingSlash
 *
 * @example
 * ```ts
 * withoutTrailingSlash('') // => ''
 * withoutTrailingSlash('/') // => ''
 * withoutTrailingSlash('no/slash/') // => 'no/slash'
 * withoutTrailingSlash('already/has/slash') // => 'already/has/slash'
 * withoutTrailingSlash(undefined) // => undefined
 * withoutTrailingSlash(null) // => null
 * ```
 */
export function withoutTrailingSlash(url: undefined): undefined

/**
 * Removes the trailing slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutTrailingSlash
 *
 * @example
 * ```ts
 * withoutTrailingSlash('') // => ''
 * withoutTrailingSlash('/') // => ''
 * withoutTrailingSlash('no/slash/') // => 'no/slash'
 * withoutTrailingSlash('already/has/slash') // => 'already/has/slash'
 * withoutTrailingSlash(undefined) // => undefined
 * withoutTrailingSlash(null) // => null
 * ```
 */
export function withoutTrailingSlash(url: null): null

/**
 * Removes the trailing slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutTrailingSlash
 *
 * @example
 * ```ts
 * withoutTrailingSlash('') // => ''
 * withoutTrailingSlash('/') // => ''
 * withoutTrailingSlash('no/slash/') // => 'no/slash'
 * withoutTrailingSlash('already/has/slash') // => 'already/has/slash'
 * withoutTrailingSlash(undefined) // => undefined
 * withoutTrailingSlash(null) // => null
 * ```
 */
export function withoutTrailingSlash(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  return url[url.length - 1] === '/' ? url.slice(0, -1) : url
}

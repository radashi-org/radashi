/**
 * Adds a trailing slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withTrailingSlash
 *
 * @example
 * ```ts
 * withTrailingSlash('') // => '/'
 * withTrailingSlash('no/slash') // => 'no/slash/'
 * withTrailingSlash('already/has/slash/') // => 'already/has/slash/'
 * withTrailingSlash(undefined) // => undefined
 * withTrailingSlash(null) // => null
 * ```
 */
export function withTrailingSlash(url: string): string

/**
 * Adds a trailing slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withTrailingSlash
 *
 * @example
 * ```ts
 * withTrailingSlash('') // => '/'
 * withTrailingSlash('no/slash') // => 'no/slash/'
 * withTrailingSlash('already/has/slash/') // => 'already/has/slash/'
 * withTrailingSlash(undefined) // => undefined
 * withTrailingSlash(null) // => null
 * ```
 */
export function withTrailingSlash(url: undefined): undefined

/**
 * Adds a trailing slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withTrailingSlash
 *
 * @example
 * ```ts
 * withTrailingSlash('') // => '/'
 * withTrailingSlash('no/slash') // => 'no/slash/'
 * withTrailingSlash('already/has/slash/') // => 'already/has/slash/'
 * withTrailingSlash(undefined) // => undefined
 * withTrailingSlash(null) // => null
 * ```
 */
export function withTrailingSlash(url: null): null

/**
 * Adds a trailing slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a trailing slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a trailing slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withTrailingSlash
 *
 * @example
 * ```ts
 * withTrailingSlash('') // => '/'
 * withTrailingSlash('no/slash') // => 'no/slash/'
 * withTrailingSlash('already/has/slash/') // => 'already/has/slash/'
 * withTrailingSlash(undefined) // => undefined
 * withTrailingSlash(null) // => null
 * ```
 */
export function withTrailingSlash(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  return url[url.length - 1] === '/' ? url : url + '/'
}

/**
 * Adds a leading slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withLeadingSlash
 *
 * @example
 * ```ts
 * withLeadingSlash('') // => '/'
 * withLeadingSlash('no/slash') // => '/no/slash'
 * withLeadingSlash('/already/has/slash') // => '/already/has/slash'
 * withLeadingSlash(undefined) // => undefined
 * withLeadingSlash(null) // => null
 * ```
 */
export function withLeadingSlash(url: string): string

/**
 * Adds a leading slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withLeadingSlash
 *
 * @example
 * ```ts
 * withLeadingSlash('') // => '/'
 * withLeadingSlash('no/slash') // => '/no/slash'
 * withLeadingSlash('/already/has/slash') // => '/already/has/slash'
 * withLeadingSlash(undefined) // => undefined
 * withLeadingSlash(null) // => null
 * ```
 */
export function withLeadingSlash(url: undefined): undefined

/**
 * Adds a leading slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withLeadingSlash
 *
 * @example
 * ```ts
 * withLeadingSlash('') // => '/'
 * withLeadingSlash('no/slash') // => '/no/slash'
 * withLeadingSlash('/already/has/slash') // => '/already/has/slash'
 * withLeadingSlash(undefined) // => undefined
 * withLeadingSlash(null) // => null
 * ```
 */
export function withLeadingSlash(url: null): null

/**
 * Adds a leading slash `/` to the given URL if it is not already present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * with a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string with a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withLeadingSlash
 *
 * @example
 * ```ts
 * withLeadingSlash('') // => '/'
 * withLeadingSlash('no/slash') // => '/no/slash'
 * withLeadingSlash('/already/has/slash') // => '/already/has/slash'
 * withLeadingSlash(undefined) // => undefined
 * withLeadingSlash(null) // => null
 * ```
 */
export function withLeadingSlash(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  return url[0] === '/' ? url : '/' + url
}

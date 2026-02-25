/**
 * Removes the leading slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutLeadingSlash
 *
 * @example
 * ```ts
 * withoutLeadingSlash('') // => ''
 * withoutLeadingSlash('/') // => ''
 * withoutLeadingSlash('/no/slash') // => 'no/slash'
 * withoutLeadingSlash('already/has/slash') // => 'already/has/slash'
 * withoutLeadingSlash(undefined) // => undefined
 * withoutLeadingSlash(null) // => null
 * ```
 */
export function withoutLeadingSlash(url: string): string

/**
 * Removes the leading slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutLeadingSlash
 *
 * @example
 * ```ts
 * withoutLeadingSlash('') // => ''
 * withoutLeadingSlash('/') // => ''
 * withoutLeadingSlash('/no/slash') // => 'no/slash'
 * withoutLeadingSlash('already/has/slash') // => 'already/has/slash'
 * withoutLeadingSlash(undefined) // => undefined
 * withoutLeadingSlash(null) // => null
 * ```
 */
export function withoutLeadingSlash(url: undefined): undefined

/**
 * Removes the leading slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutLeadingSlash
 *
 * @example
 * ```ts
 * withoutLeadingSlash('') // => ''
 * withoutLeadingSlash('/') // => ''
 * withoutLeadingSlash('/no/slash') // => 'no/slash'
 * withoutLeadingSlash('already/has/slash') // => 'already/has/slash'
 * withoutLeadingSlash(undefined) // => undefined
 * withoutLeadingSlash(null) // => null
 * ```
 */
export function withoutLeadingSlash(url: null): null

/**
 * Removes the leading slash `/` from the given URL if it is present.
 *
 * This function is useful for ensuring that URLs are properly formatted
 * without a leading slash, which is often required in web development for
 * consistency and to avoid issues with relative paths.
 *
 * @param url - The URL string to be processed. Can be `string`, `undefined`, or `null`.
 * @returns The URL string without a leading slash, or `undefined` if the input is `undefined`, or `null` if the input is `null`.
 *
 * @see https://radashi.js.org/reference/url/withoutLeadingSlash
 *
 * @example
 * ```ts
 * withoutLeadingSlash('') // => ''
 * withoutLeadingSlash('/') // => ''
 * withoutLeadingSlash('/no/slash') // => 'no/slash'
 * withoutLeadingSlash('already/has/slash') // => 'already/has/slash'
 * withoutLeadingSlash(undefined) // => undefined
 * withoutLeadingSlash(null) // => null
 * ```
 */
export function withoutLeadingSlash(
  url: string | undefined | null,
): string | undefined | null {
  if (url === undefined || url === null) {
    return url
  }
  return url[0] === '/' ? url.slice(1) : url
}

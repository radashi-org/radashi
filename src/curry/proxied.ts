/**
 * Creates a Proxy object that will dynamically call the handler
 * argument when attributes are accessed.
 *
 * @see https://radashi-org.github.io/reference/curry/proxied
 * @example
 * ```ts
 * const proxy = proxied(propertyName => propertyName.toUpperCase())
 * proxy.foo // => "FOO"
 * ```
 */
export function proxied<T, K>(
  handler: (propertyName: T) => K,
): Record<string, K> {
  return new Proxy(
    {},
    {
      get: (target, propertyName: any) => handler(propertyName),
    },
  )
}

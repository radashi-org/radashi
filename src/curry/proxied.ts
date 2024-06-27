/**
 * Creates a Proxy object that will dynamically call the handler
 * argument when attributes are accessed
 */
export function proxied<T, K>(
  handler: (propertyName: T) => K
): Record<string, K> {
  return new Proxy(
    {},
    {
      get: (target, propertyName: any) => handler(propertyName)
    }
  )
}

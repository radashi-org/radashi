/**
 * A helper to try an async function that returns undefined if it
 * fails.
 *
 * @see https://radashi.js.org/reference/async/guard
 * @example
 * ```ts
 * const result = await guard(fetchUsers)() ?? [];
 * ```
 * @version 12.1.0
 */
export function guard<TFunction extends () => any>(
  func: TFunction,
  shouldGuard?: (err: any) => boolean,
): ReturnType<TFunction> extends Promise<any>
  ? Promise<Awaited<ReturnType<TFunction>> | undefined>
  : ReturnType<TFunction> | undefined {
  const _guard = (err: any) => {
    if (shouldGuard && !shouldGuard(err)) {
      throw err
    }
    return undefined as any
  }
  try {
    const result = func()
    return result instanceof Promise ? result.catch(_guard) : result
  } catch (err) {
    return _guard(err)
  }
}

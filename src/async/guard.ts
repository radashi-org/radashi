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
): GuardReturnType<TFunction> {
  const onError = (err: any): any => {
    if (shouldGuard && !shouldGuard(err)) {
      throw err
    }
  }
  try {
    const result = func()
    return result instanceof Promise ? (result.catch(onError) as any) : result
  } catch (err) {
    return onError(err)
  }
}

export type GuardReturnType<TFunction extends () => any> =
  TFunction extends () => Promise<infer TResolved>
    ? Promise<TResolved | undefined>
    : ReturnType<TFunction> | undefined

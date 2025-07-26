import { tryit } from 'radashi'

/**
 * Useful when for script like things where cleanup should be done on
 * fail or success no matter.
 *
 * You can call defer many times to register many deferred functions
 * that will all be called when the function exits in any state.
 *
 * @see https://radashi.js.org/reference/async/defer
 * @example
 * ```ts
 * const result = await defer(async (defer) => {
 *   const fileHandle = await openFile('path/to/file')
 *   defer(() => fileHandle.close())
 *
 *   // Perform operations on the file
 *   return processFile(fileHandle)
 * })
 * ```
 * @version 12.1.0
 */
export async function defer<TResponse>(
  func: (
    register: (
      fn: (error?: any) => any,
      options?: { rethrow?: boolean },
    ) => void,
  ) => Promise<TResponse>,
): Promise<TResponse> {
  const callbacks: {
    fn: (error?: any) => any
    rethrow: boolean
  }[] = []
  const register = (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean },
  ) =>
    callbacks.push({
      fn,
      rethrow: options?.rethrow ?? false,
    })
  const [err, response] = await tryit(func)(register)
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err)
    if (rethrown && rethrow) {
      throw rethrown
    }
  }
  if (err) {
    throw err
  }
  return response
}

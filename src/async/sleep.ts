declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * Async wait
 */
export const sleep = (milliseconds: number) => {
  return new Promise<void>(res => setTimeout(res, milliseconds))
}

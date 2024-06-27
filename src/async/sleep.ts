declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * Async wait
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise(res => setTimeout(res, milliseconds))
}

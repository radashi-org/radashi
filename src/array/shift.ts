/**
 * Shift array items by n steps If n > 0 items will shift n steps to
 * the right If n < 0 items will shift n steps to the left
 */
export function shift<T>(arr: Array<T>, n: number) {
  if (arr.length === 0) return arr

  const shiftNumber = n % arr.length

  if (shiftNumber === 0) return arr

  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}

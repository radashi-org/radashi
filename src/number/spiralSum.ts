/**
 * Calculates the sum of numbers in a spiral pattern up to n terms.
 *
 * The spiral pattern goes: 1, 1+3, 1+3+5, 1+3+5+7, 1+3+5+7+9, ...
 * Where each term adds the next odd number to the previous sum.
 *
 * @example
 * ```typescript
 * spiralSum(1) // => 1
 * spiralSum(2) // => 4
 * spiralSum(3) // => 9
 * spiralSum(4) // => 16
 * spiralSum(5) // => 25
 * ```
 */
export function spiralSum(n: number): number {
  if (n <= 0) {
    return 0
  }

  let total = 1
  let current = 1
  let increment = 1

  for (let i = 1; i < n; i++) {
    increment += 2
    current += increment
    total += current
  }

  return total
}

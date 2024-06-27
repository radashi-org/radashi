/**
 * Split an array into two array based on a true/false condition
 * function
 *
 * ```ts
 * fork([1, 2, 3, 4], (n) => n % 2 === 0)
 * // [[2, 4], [1, 3]]
 * ```
 */
export function fork<T>(
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] {
  var result: [T[], T[]] = [[], []]
  
  if (!list) return result
  
  for (var item of list) {
    if (condition(item)) 
      result[0].push(item)
    else 
      result[1].push(item)
  }
  
  return result
}

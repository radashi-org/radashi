import type { Matrix } from 'radashi'
import { matrixPosition } from 'radashi'

/**
 * Set the value of a cell in a matrix.
 *
 * @see https://radashi-org.github.io/reference/matrix/matrixSet
 * @example
 * ```ts
 * const table = matrix(2, 2)
 * matrixSet(table, 0, 0, 1)
 * matrixSet(table, 0, 1, 2)
 * matrixSet(table, 1, 0, 3)
 * matrixSet(table, 1, 1, 4)
 * // 1 2
 * // 3 4
 * ```
 */
export function matrixSet<Value>(
  matrix: Matrix<Value>,
  row: number,
  column: number,
  value: Value,
): void {
  matrix[matrixPosition(matrix, row, column)] = value
}

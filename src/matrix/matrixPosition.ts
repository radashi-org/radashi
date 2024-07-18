import type { Matrix } from './matrix'

/**
 * Get the position of a cell in a matrix.
 *
 * @see https://radashi-org.github.io/reference/matrix/matrixPosition
 * @example
 * ```ts
 * const table = matrix(3, 3, (row, column) => row * 3 + column + 1)
 * // 1 2 3
 * // 4 5 6
 * // 7 8 9
 *
 * matrixPosition(table, 0, 0) // 0
 * matrixPosition(table, 1, 2) // 5
 * matrixPosition(table, 2, 1) // 7
 * ```
 */
export function matrixPosition<Value>(
  matrix: Matrix<Value>,
  row: number,
  column: number,
): number {
  if (row < 0 || row >= matrix.rows) {
    throw new RangeError(`Row ${row} is out of bounds`)
  }
  if (column < 0 || column >= matrix.columns) {
    throw new RangeError(`Column ${column} is out of bounds`)
  }
  return row * matrix.columns + column
}

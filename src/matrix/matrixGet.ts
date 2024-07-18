import { type Matrix, matrixPosition } from 'radashi'

/**
 * Get the value of a cell in a matrix.
 *
 * @see https://radashi-org.github.io/reference/matrix/matrixGet
 * @example
 * ```ts
 * const table = matrix(3, 3, (row, column) => row * 3 + column + 1)
 * // 1 2 3
 * // 4 5 6
 * // 7 8 9
 *
 * matrixGet(table, 0, 0) // 1
 * matrixGet(table, 1, 2) // 6
 * matrixGet(table, 2, 1) // 8
 * ```
 */
export function matrixGet<Value>(
  matrix: Matrix<Value>,
  row: number,
  column: number,
): Value {
  return matrix[matrixPosition(matrix, row, column)]
}

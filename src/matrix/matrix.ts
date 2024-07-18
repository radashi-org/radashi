/**
 * Create a matrix (or 2D array) of values.
 *
 * An optional `fill` callback can be used to populate the matrix with
 * values.
 *
 * @see https://radashi-org.github.io/reference/matrix/matrix
 * @example
 * ```ts
 * const table = matrix(3, 3, (row, column) => row * 3 + column + 1)
 * // 1 2 3
 * // 4 5 6
 * // 7 8 9
 * ```
 */
export function matrix<Value>(
  rows: number,
  columns: number,
  fill?: (row: number, column: number) => Value,
): Matrix<Value> {
  const matrix = new Array(rows * columns) as Matrix<Value>
  if (fill) {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        matrix[row * columns + column] = fill(row, column)
      }
    }
  }
  matrix.rows = rows
  matrix.columns = columns
  return matrix
}

/**
 * A matrix (or 2D array) of values.
 *
 * @see https://radashi-org.github.io/reference/matrix/matrix
 */
export interface Matrix<Value> extends Array<Value> {
  rows: number
  columns: number
}

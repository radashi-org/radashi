/**
 * RGB color model.
 *
 * Its values range from 0 to 1.
 *
 * Objects of this type are safe to stringify using template literals.
 *
 * ```ts
 * const color = new Color(0.5, 0.5, 0.5)
 * console.log(`Color: ${color}`)
 * // Logs “Color: rgba(128, 128, 128, 1)”
 * ```
 */
export class Color {
  constructor(
    public red: number,
    public green: number,
    public blue: number,
    public alpha = 1,
  ) {}
  /**
   * Returns a string representation of the color in the format
   * 'rgba(255, 255, 255, 1)'
   */
  toString(): string {
    return `rgba(${Math.trunc(this.red * 255)}, ${Math.trunc(this.green * 255)}, ${Math.trunc(this.blue * 255)}, ${this.alpha})`
  }
}

export type ColorLike = Color | string

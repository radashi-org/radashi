import { Color, isString, lerp, parseColor, type ColorLike } from 'radashi'

/**
 * Mixes two colors according to a given ratio using the CMYK color
 * model.
 *
 * This function first converts the input colors to CMYK before
 * mixing. CMYK is preferred over RGB for color mixing because:
 * 1. It better represents how physical pigments mix.
 * 2. It's less likely to produce muddy or unexpected colors when
 *    mixing.
 * 3. It often results in more vibrant and natural-looking color
 *    blends.
 *
 * The mixing process:
 * 1. Convert input colors to CMYK if they're not already.
 * 2. Interpolate each CMYK component (Cyan, Magenta, Yellow, Key)
 *    separately.
 * 3. Convert the resulting CMYK color back to RGB.
 *
 * Note: While this method produces good results for most use cases,
 * it's not perceptually uniform. For the highest perceptual accuracy,
 * consider using `colorMixLAB`, though it has a larger bundle size
 * impact (~70% heavier).
 *
 * ```ts
 * colorMixCMYK('#000', '#fff', 0.5)
 * // => "#808080" (50% black, 50% white)
 *
 * const blue = 'rgb(0, 0, 255)'
 * const yellow = 'rgb(255, 255, 0)'
 * colorMixCMYK(blue, yellow, 0.5)
 * // => "rgb(128, 128, 128)" (50% blue, 50% yellow)
 * ```
 */
export function colorMixCMYK(
  from: ColorLike | Color.CMYK,
  to: ColorLike | Color.CMYK,
  ratio: number,
): Color {
  from = isString(from)
    ? colorRgbToCmyk(parseColor(from))
    : 'red' in from
      ? colorRgbToCmyk(from)
      : from

  to = isString(to)
    ? colorRgbToCmyk(parseColor(to))
    : 'red' in to
      ? colorRgbToCmyk(to)
      : to

  const key = lerp(from.key, to.key, ratio)
  return new Color(
    (1 - lerp(from.cyan, to.cyan, ratio)) * (1 - key),
    (1 - lerp(from.yellow, to.yellow, ratio)) * (1 - key),
    (1 - lerp(from.magenta, to.magenta, ratio)) * (1 - key),
    lerp(from.alpha, to.alpha, ratio),
  )
}

function colorRgbToCmyk(input: Color): Color.CMYK {
  const key = 1 - Math.max(input.red, input.green, input.blue)
  return {
    cyan: channelRgbToCmyk(input.red, key),
    magenta: channelRgbToCmyk(input.green, key),
    yellow: channelRgbToCmyk(input.blue, key),
    key,
    alpha: input.alpha,
  }
}

function channelRgbToCmyk(input: number, key: number): number {
  const channel = (1 - input - key) / (1 - key)
  return Number.isNaN(channel) ? 0 : channel
}

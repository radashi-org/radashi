import * as ColorHex from './model/hex'
import * as ColorHSL from './model/hsl'
import * as ColorLAB from './model/lab'
import * as ColorOKLCH from './model/oklch'
import * as ColorRGB from './model/rgb'
import type {
  AnyComponentList,
  ColorParser,
  ColorType,
  ColorValues,
  ParsedColor,
} from './model/types'

export { ColorHex, ColorHSL, ColorLAB, ColorOKLCH, ColorRGB }

export type ColorLike = Color | string

export type Color<Type extends ColorType = ColorType> = {} & ParsedColor<Type>

export declare namespace Color {
  export type Hex = Color<ColorHex.Type>
  export type RGB = Color<ColorRGB.Type>
  export type HSL = Color<ColorHSL.Type>
  export type LAB = Color<ColorLAB.Type>
  export type OKLCH = Color<ColorOKLCH.Type>

  /**
   * The color model identifies the name of the colorspace and its
   * components (in order of occurrence in CSS format).
   */
  export type Type<
    ComponentList extends AnyComponentList = AnyComponentList,
    Alpha extends boolean = boolean,
  > = ColorType<ComponentList, Alpha>

  /**
   * A color parser that returns a color in a specific colorspace.
   */
  export type Parser<
    Model extends ColorType,
    Input extends string | RegExpExecArray = string | RegExpExecArray,
  > = ColorParser<Model, Input>

  /**
   * The named values of a color in a specific colorspace.
   */
  export type Values<Model extends ColorType> = ColorValues<Model>
}

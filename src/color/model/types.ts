export type AnyComponentList = readonly string[]

export type ParsedColor<Type extends ColorType = ColorType> =
  {} & (Type extends any
    ? {
        type: Type
        alpha: number
        /**
         * Returns a string representation of the color in its format.
         */
        toString(): string
      } & ColorValues<Type>
    : never)

export type ColorType<
  ComponentList extends AnyComponentList = AnyComponentList,
  Alpha extends boolean = boolean,
> = {
  name: string
  components: ComponentList
  alpha?: Alpha
}

export type ColorParser<
  Model extends ColorType,
  Input extends string | RegExpExecArray = string | RegExpExecArray,
> = Input extends string
  ? {
      model: Model
      parse: (color: Input) => ParsedColor<Model> | undefined
    }
  : {
      model: Model
      regex: RegExp
      parse: (match: Input) => ParsedColor<Model> | undefined
    }

export type ColorValues<Model extends ColorType> = {
  [K in Model['components'][number]]: number
}

import * as _ from 'radashi'
import type { Class } from 'radashi'
import { expectTypeOf } from 'vitest'

declare class Person {
  name: string
}

describe('isClass', () => {
  test('value is union containing a class type', () => {
    const value = {} as Person | typeof Person
    if (_.isClass(value)) {
      expectTypeOf(value).toEqualTypeOf<typeof Person>()
      expectTypeOf(new value()).toEqualTypeOf<Person>()
    } else {
      expectTypeOf(value).toEqualTypeOf<Person>()
    }
  })
  test('value is unknown', () => {
    const value = {} as unknown
    if (_.isClass(value)) {
      expectTypeOf(value).toEqualTypeOf<Class<unknown[], unknown>>()
      expectTypeOf(new value()).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>()
    }
  })
  test('value is any', () => {
    const value = {} as any
    if (_.isClass(value)) {
      expectTypeOf(value).toEqualTypeOf<Class<unknown[], unknown>>()
      expectTypeOf(new value()).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('value is string', () => {
    const value = {} as string
    if (_.isClass(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
})

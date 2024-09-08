import type { Class } from 'radashi'
import * as _ from 'radashi'
import { expectTypeOf } from 'vitest'

describe('isClass', () => {
  test('Type inference', () => {
    const value = {} as unknown
    console.log('value is', value)
    if (_.isClass(value)) {
      console.log('value is a class')
      expectTypeOf(value).toMatchTypeOf<Class>()
      assertType(new value())
    } else {
      console.log('value is not a class')
      expectTypeOf(value).not.toMatchTypeOf<Class>()
    }
  })
})

import * as _ from 'radashi'

describe('proxied function', () => {
  test('returns proxy that calls callback function', () => {
    const handler = (propertyName: string) => {
      if (propertyName === 'x') {
        return 2
      }
      if (propertyName === 'getName') {
        return () => 'radash'
      }
      return undefined
    }
    const proxy = _.proxied(handler) as any
    expect(proxy.x).toBe(2)
    expect(proxy.getName()).toBe('radash')
    expect(proxy.nil).toBeUndefined()
  })
})

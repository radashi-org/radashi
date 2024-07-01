import * as _ from 'radashi'

describe('proxied', () => {
  test('returns proxy that calls callback function', () => {
    const handler = (propertyName: string) => {
      if (propertyName === 'x') {
        return 2
      }
      if (propertyName === 'getName') {
        return () => 'radashi'
      }
      return undefined
    }
    const proxy = _.proxied(handler) as any
    expect(proxy.x).toBe(2)
    expect(proxy.getName()).toBe('radashi')
    expect(proxy.nil).toBeUndefined()
  })
})

import * as vm from 'node:vm'
import * as _ from 'radashi'

describe('isWeakMap', () => {
  test('returns true for WeakMap instances', () => {
    expect(_.isWeakMap(new WeakMap())).toBe(true)
  })
  test('returns true for WeakMap subclass instances', () => {
    expect(_.isWeakMap(new (class extends WeakMap {})())).toBe(true)
  })
  test('returns true for WeakMap instances from other realms', () => {
    expect(_.isWeakMap(vm.runInNewContext('new WeakMap()'))).toBe(true)
  })
  test('returns false for undefined', () => {
    expect(_.isWeakMap(undefined)).toBe(false)
  })
  test('returns false for null', () => {
    expect(_.isWeakMap(null)).toBe(false)
  })
  test('returns false for non-WeakMap objects', () => {
    expect(_.isWeakMap({})).toBe(false)
  })
})

import * as vm from 'node:vm'
import * as _ from 'radashi'

describe('isWeakSet', () => {
  test('returns true for WeakSet instances', () => {
    expect(_.isWeakSet(new WeakSet())).toBe(true)
  })
  test('returns true for WeakSet subclass instances', () => {
    expect(_.isWeakSet(new (class extends WeakSet {})())).toBe(true)
  })
  test('returns true for WeakSet instances from other realms', () => {
    expect(_.isWeakSet(vm.runInNewContext('new WeakSet()'))).toBe(true)
  })
  test('returns false for undefined', () => {
    expect(_.isWeakSet(undefined)).toBe(false)
  })
  test('returns false for null', () => {
    expect(_.isWeakSet(null)).toBe(false)
  })
  test('returns false for non-WeakSet objects', () => {
    expect(_.isWeakSet({})).toBe(false)
  })
})

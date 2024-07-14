import type { Comparable, ComparableProperty, Comparator } from 'radashi'
import * as _ from 'radashi'

describe('castComparator', () => {
  test('with property name only', () => {
    expectTypeOf(_.castComparator('name')).toEqualTypeOf<
      Comparator<{ name: Comparable }>
    >()

    expectTypeOf(_.castComparator('name')).toEqualTypeOf<
      (left: { name: Comparable }, right: { name: Comparable }) => number
    >()
  })
  test('with property name with explicit type parameter', () => {
    expectTypeOf(_.castComparator<{ a: number }>('a')).toEqualTypeOf<
      Comparator<{ a: number }>
    >()

    expectTypeOf(_.castComparator<{ a: number }>('a')).toEqualTypeOf<
      (left: { a: number }, right: { a: number }) => number
    >()
  })
  test('with property name with compare callback', () => {
    expectTypeOf(
      _.castComparator('a', (left: number, right: number) => left - right),
    ).toEqualTypeOf<Comparator<{ a: number }>>()
  })
  test('with generic property name', () => {
    function test<
      T,
      TProperty extends ComparableProperty<T> = ComparableProperty<T>,
    >(a: TProperty) {
      const comparator = _.castComparator<T>(a)

      expectTypeOf(comparator).toEqualTypeOf<Comparator<T>>()

      return comparator
    }

    expectTypeOf(test<string>('length')).toEqualTypeOf<Comparator<string>>()
  })
  test('with mapping function', () => {
    expectTypeOf(_.castComparator((a: number) => a)).toEqualTypeOf<
      Comparator<number>
    >()

    expectTypeOf(_.castComparator((obj: { a: number }) => obj.a)).toEqualTypeOf<
      Comparator<{ a: number }>
    >()

    // Explicit type parameter
    expectTypeOf(_.castComparator<string>(str => str.length)).toEqualTypeOf<
      Comparator<string>
    >()
  })
})

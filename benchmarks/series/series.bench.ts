import * as _ from 'radashi'

const sut = _.series([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
] as const)

describe('series', () => {
  describe('min method', () => {
    bench('min of two items', () => {
      sut.min('monday', 'tuesday')
    })
  })

  describe('max method', () => {
    bench('max of two items', () => {
      sut.max('thursday', 'tuesday')
    })
  })

  describe('first method', () => {
    bench('get first item', () => {
      sut.first()
    })
  })

  describe('last method', () => {
    bench('get last item', () => {
      sut.last()
    })
  })

  describe('next method', () => {
    bench('get next item', () => {
      sut.next('wednesday')
    })
  })

  describe('previous method', () => {
    bench('get previous item', () => {
      sut.previous('wednesday')
    })
  })

  describe('spin method', () => {
    bench('spin by zero', () => {
      sut.spin('wednesday', 0)
    })

    bench('spin by positive number', () => {
      sut.spin('wednesday', 3)
    })

    bench('spin by negative number', () => {
      sut.spin('wednesday', -3)
    })
  })
})

import * as _ from 'radashi'

describe('clone', () => {
  bench('with object', () => {
    const obj = {
      x: 22,
      add: (a: number, b: number) => a + b,
      child: {
        key: 'yolo',
      },
    }
    _.clone(obj)
  })

  bench('with class instance', () => {
    class Data {
      val = 0
    }
    const obj = new Data()
    obj.val = 1
    _.clone(obj)
  })
})

import * as lodash from 'lodash'
import * as radashi from 'radashi'

const libs = { radashi, lodash } as const

type Library = (typeof libs)[keyof typeof libs]
type Benchmark = (_: Library) => void

function isLodash(_: Library): _ is typeof lodash {
  return _ === lodash
}

const jay = {
  name: 'jay',
  age: 17,
  friends: [
    {
      name: 'carl',
      age: 17,
      friends: [
        {
          name: 'sara',
          age: 17,
        },
      ],
    },
  ],
}

const objects: any = radashi.list<number>(0, 5, i => {
  const object: any = {}
  radashi.set(object, 'a.b.c.d.e.f.g.h.i.k.l.m.n.o.p', i)
  return object
})

const benchmarks: Partial<
  Record<keyof typeof radashi, Benchmark | Record<string, Benchmark>>
> = {
  capitalize: _ => {
    _.capitalize('hello world')
  },
  unique: {
    'with non-empty array': _ => {
      const list = [1, 1, 2]
      if (isLodash(_)) {
        _.uniq(list)
      } else {
        _.unique(list)
      }
    },
    'with key fn': _ => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' },
      ]
      if (isLodash(_)) {
        _.uniqBy(list, x => x.id)
      } else {
        _.unique(list, x => x.id)
      }
    },
  },
  group: _ => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    if (isLodash(_)) {
      _.groupBy(list, x => x.group)
    } else {
      _.group(list, x => x.group)
    }
  },
  pick: {
    'with empty keys': _ => {
      const input = { a: 2 }

      if (isLodash(_)) {
        _.pickBy(input, [])
      } else {
        _.pick(input, [])
      }
    },
    'with key not in object': _ => {
      const input = { a: 2, b: 3 }

      if (isLodash(_)) {
        _.pickBy(input, ['c'])
      } else {
        _.pick(input, ['c'] as unknown as ['b'])
      }
    },
    'with one key not in object': _ => {
      const input = { a: 2, b: 3 }

      if (isLodash(_)) {
        _.pickBy(input, ['a', 'c'])
      } else {
        _.pick(input, ['a', 'c'] as unknown as ['a'])
      }
    },
  },
  castArray: {
    'with an array': _ => {
      const input = new Array(100)

      if (isLodash(_)) {
        _.castArray(input)
      } else {
        _.castArray(input)
      }
    },
    'with number': _ => {
      const input = 1

      if (isLodash(_)) {
        _.castArray(input)
      } else {
        _.castArray(input)
      }
    },
    'with null': _ => {
      if (isLodash(_)) {
        _.castArray(null)
      } else {
        _.castArray(null)
      }
    },
  },
  max: {
    'with numbers': _ => {
      const list = [5, 5, 10, 2]
      _.max(list)
    },
    'with objects': _ => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 },
      ]
      _.max(list, x => x.score)
    },
  },
  zip: {
    'with non-empty arrays': _ => {
      if (isLodash(_)) {
        _.zip(['a', 'b'], [1, 2], [true, false])
      } else {
        _.zip(['a', 'b'], [1, 2], [true, false])
      }
    },
  },
  set: {
    'with simple path': _ => {
      if (isLodash(_)) {
        _.set({}, 'foo', 0)
      } else {
        _.set({}, 'foo', 0)
      }
    },
    'with deep path': _ => {
      if (isLodash(_)) {
        _.set({}, 'cards.value', 2)
      } else {
        _.set({}, 'cards.value', 2)
      }
    },
    'with array index path': _ => {
      if (isLodash(_)) {
        _.set({}, 'cards[0].value', 2)
      } else {
        _.set({}, 'cards[0].value', 2)
      }
    },
    'with numeric key': _ => {
      if (isLodash(_)) {
        _.set({}, 'cards[0]value', 2)
      } else {
        _.set({}, 'cards[0]value', 2)
      }
    },
  },
  clone: {
    'with object': _ => {
      const obj = {
        x: 22,
        add: (a: number, b: number) => a + b,
        child: {
          key: 'yolo',
        },
      }
      _.clone(obj)
    },
    'with class instance': _ => {
      class Data {
        val = 0
      }
      const obj = new Data()
      obj.val = 1
      _.clone(obj)
    },
  },
  isPlainObject: {
    'with object literal': _ => {
      _.isPlainObject({})
    },
    'with Object.create(null)': _ => {
      _.isPlainObject(Object.create(null))
    },
    'with non-plain object (Date)': _ => {
      _.isPlainObject(new Date())
    },
    'with namespace object': _ => {
      _.isPlainObject(Math)
    },
    'with non-plain object (arguments)': _ => {
      function returnArguments() {
        // biome-ignore lint/style/noArguments: <explanation>
        return arguments
      }
      _.isPlainObject(returnArguments())
    },
    'with null': _ => {
      _.isPlainObject(null)
    },
  },
  get: {
    'with simple path': _ => {
      if (isLodash(_)) {
        _.get(jay, 'name')
      } else {
        _.get(jay, 'name')
      }
    },
    'with array index path': _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[0].age')
      } else {
        _.get(jay, 'friends[0].age')
      }
    },
    'with default value': _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[1].age', 22)
      } else {
        _.get(jay, 'friends[1].age', 22)
      }
    },
    'with undefined nested path and default value': _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[0].friends[0].friends[0].age', 22)
      } else {
        _.get(jay, 'friends[0].friends[0].friends[0].age', 22)
      }
    },
  },
  isFunction: {
    'with null': _ => {
      _.isFunction(null)
    },
    'with anonymous function': _ => {
      _.isFunction(() => 'hello')
    },
    'with arrow function': _ => {
      _.isFunction(() => {
        return 'hello'
      })
    },
    'with named function': _ => {
      function sayHello() {
        return 'hello'
      }
      _.isFunction(sayHello)
    },
  },
  isString: {
    'with null': _ => {
      _.isString(null)
    },
    'with string': _ => {
      _.isString('abc')
    },
    'with number': _ => {
      _.isString(22)
    },
    'with object': _ => {
      _.isString({})
    },
  },
  isNumber: {
    'with null': _ => {
      _.isNumber(null)
    },
    'with integer': _ => {
      _.isNumber(22)
    },
    'with float': _ => {
      _.isNumber(22.0567)
    },
    'with non-number': _ => {
      _.isNumber('22')
    },
  },
  isObject: {
    'with null': _ => {
      _.isObject(null)
    },
    'with object literal': _ => {
      _.isObject({})
    },
    'with class instance': _ => {
      class Data {}
      _.isObject(new Data())
    },
  },
  isEmpty: {
    'with null': _ => {
      _.isEmpty(null)
    },
    'with empty object': _ => {
      _.isEmpty({})
    },
    'with empty string': _ => {
      _.isEmpty('')
    },
    'with non-empty object': _ => {
      _.isEmpty({ name: 'x' })
    },
    'with non-empty string': _ => {
      _.isEmpty('abc')
    },
  },
  snake: {
    'with valid input': _ => {
      const input = 'hello world'
      if (isLodash(_)) {
        _.snakeCase(input)
      } else {
        _.snake(input)
      }
    },
  },
  title: _ => {
    if (isLodash(_)) {
      _.startCase('hello world')
    } else {
      _.title('hello world')
    }
  },
  dash: _ => {
    if (isLodash(_)) {
      _.kebabCase('hello world')
    } else {
      _.dash('hello world')
    }
  },
  camel: _ => {
    if (isLodash(_)) {
      _.camelCase('hello world')
    } else {
      _.camel('hello world')
    }
  },
  cloneDeep: _ => {
    if (isLodash(_)) {
      _.cloneDeep(objects)
    } else {
      _.cloneDeep(objects)
    }
  },
  flat: _ => {
    const lists = [['a', 'b'], ['c', 'd'], ['e']]
    if (isLodash(_)) {
      _.flatten(lists)
    } else {
      _.flat(lists)
    }
  },
  diff: {
    'with entirely different arrays': _ => {
      const list1 = ['a', 'b', 'c']
      const list2 = ['c', 'd', 'e']
      if (isLodash(_)) {
        _.difference(list1, list2)
      } else {
        _.diff(list1, list2)
      }
    },
    'with identity function': _ => {
      const identity = ({ letter }: { letter: string }) => letter
      const letter = (l: string) => ({ letter: l })
      const list1 = [letter('a'), letter('b'), letter('c')]
      const list2 = [letter('c'), letter('d'), letter('e')]
      if (isLodash(_)) {
        _.differenceWith(list1, list2, (a, b) => identity(a) === identity(b))
      } else {
        _.diff(list1, list2, identity)
      }
    },
  },
}
for (const [funcName, run] of Object.entries(benchmarks)) {
  if (!radashi.isFunction(run)) {
    const tests = Object.entries(run)
    for (const [testName, run] of tests) {
      describe(`${funcName}: ${testName}`, () => {
        for (const [libName, lib] of Object.entries(libs)) {
          bench(libName, () => run(lib))
        }
      })
    }
  } else {
    describe(funcName, () => {
      for (const [libName, lib] of Object.entries(libs)) {
        bench(libName, () => run(lib))
      }
    })
  }
}

import lodash from 'lodash'
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

const array100 = new Array(100)

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
    // ok
    'with an array': _ => {
      if (isLodash(_)) {
        _.castArray(array100)
      } else {
        _.castArray(array100)
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
  last: _ => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    if (isLodash(_)) {
      _.last(list)
    } else {
      _.last(list)
    }
  },
  assign: _ => {
    const initial = {
      name: 'jay',
      cards: ['ac'],
      location: {
        street: '23 main',
        state: {
          abbreviation: 'FL',
          name: 'Florida',
        },
      },
    }
    const override = {
      name: 'charles',
      cards: ['4c'],
      location: {
        street: '8114 capo',
        state: {
          abbreviation: 'TX',
          name: 2,
          a: 2,
        },
      },
    }
    if (isLodash(_)) {
      const a = _.assign(initial, override)
    } else {
      const a = _.assign(initial, override)
    }
  },
  isArray: _ => {
    _.isArray([])
  },
  isBoolean: {
    'with boolean value': _ => {
      _.isBoolean(true)
    },
    'with non-boolean value': _ => {
      _.isBoolean(null)
    },
  },
  isDate: {
    'with valid input': _ => {
      _.isDate(new Date())
    },
    'with invalid input': _ => {
      _.isDate(new Date('invalid value'))
    },
    'with non-Date value': _ => {
      _.isDate(22)
    },
  },
  cluster: {
    'with default cluster size': _ => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1]
      if (isLodash(_)) {
        _.chunk(list, 2)
      } else {
        _.cluster(list, 2)
      }
    },
    'specified cluster size of 3': _ => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]

      if (isLodash(_)) {
        _.chunk(list, 3)
      } else {
        _.cluster(list, 3)
      }
    },
  },
  isEqual: {
    'with numbers': _ => {
      _.isEqual(1, 1)
    },
    'with string': _ => {
      _.isEqual('a', 'a')
    },
    'with object': _ => {
      _.isEqual({ a: 1 }, { a: 1 })
    },
    'with array': _ => {
      _.isEqual([1, 2], [1, 2])
    },
    'with complex object': _ => {
      class Person {
        constructor(readonly name: string) {}
      }
      const jake = new Person('jake')
      const symbolKey = Symbol('symbol')
      const complex = {
        num: 0,
        str: '',
        boolean: true,
        unf: void 0,
        nul: null,
        obj: { name: 'object', id: 1, children: [0, 1, 2] },
        arr: [0, 1, 2],
        func() {
          console.log('function')
        },
        loop: null as any,
        person: jake,
        date: new Date(0),
        reg: /\/regexp\/ig/,
        [symbolKey]: 'symbol',
      }
      complex.loop = complex

      _.isEqual(complex, { ...complex })
    },
  },
  isError: {
    'with error': _ => {
      _.isError(new Error())
    },
    'with non-error': _ => {
      _.isError(new Date())
    },
  },
  isInt: {
    'with integer': _ => {
      if (isLodash(_)) {
        _.isInteger(22)
      } else {
        _.isInt(22)
      }
    },
    'with non-integer': _ => {
      if (isLodash(_)) {
        _.isInteger(22.0567)
      } else {
        _.isInt(22.0567)
      }
    },
    'with non-number': _ => {
      if (isLodash(_)) {
        _.isInteger('abc')
      } else {
        _.isInt('22')
      }
    },
  },
  isMap: {
    'with valid input': _ => {
      _.isMap(new Map())
    },
    'with invalid input': _ => {
      _.isMap({})
    },
  },
  isRegExp: _ => {
    _.isRegExp(/abc/)
  },
  isSet: _ => {
    _.isSet(new Set())
  },
  isSymbol: _ => {
    _.isSymbol(Symbol('abc'))
  },
  isWeakMap: _ => {
    _.isWeakMap(new WeakMap())
  },
  isWeakSet: _ => {
    _.isWeakSet(new WeakSet())
  },
  template: _ => {
    const tmp = `
      Hello my name is {{name}}. I am a {{type}}.
      Not sure why I am {{reason}}.

      Thank You - {{name}}
    `
    const data = {
      name: 'SpongeBob',
      type: 'squarePants',
      reason: 'so likeable',
    }

    if (isLodash(_)) {
      const compiled = _.template(tmp, {
        interpolate: /{{([\s\S]+?)}}/g,
      })
      compiled(data)
    } else {
      _.template(tmp, data)
    }
  },
  trim: {
    'with valid input': _ => {
      _.trim('  hello world  ')
    },
    'with a specific character': _ => {
      _.trim('__hello__', '_')
    },
    'with two specific characters': _ => {
      _.trim('_- hello_- ', '_- ')
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

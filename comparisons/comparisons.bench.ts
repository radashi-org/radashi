import * as lodash from 'lodash'
import * as radashi from 'radashi'

const libs = {radashi, lodash} as const

type Library = typeof libs[keyof typeof libs]
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

const benchmarks:  Partial<Record<keyof typeof radashi, Benchmark | Record<string, Benchmark>>> = {
  capitalize: _ => {
      _.capitalize('hello world')
  },
  unique: {
    "with non-empty array": _ => {
      const list = [1, 1, 2]
      if (isLodash(_)) {
        _.uniq(list)
      } else {
        _.unique(list)
      }
    },
    "with key fn": _ => {
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
    }
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
    "with empty keys": _ => {
      const input = { a: 2 }

      if (isLodash(_)) {
        _.pickBy(input, [])
      } else {
        _.pick(input, [])
      }
    },
    "with key not in object": _ => {
      const input = { a: 2, b: 3 }

      if (isLodash(_)) {
        _.pickBy(input, ['c'])
      } else {
        _.pick(input, ['c'] as  unknown as ["b"])
      }
    },
    "with one key not in object": _ => {
      const input = { a: 2, b: 3 }

      if (isLodash(_)) {
        _.pickBy(input, ['a', 'c'])
      } else {
        _.pick(input, ['a', 'c'] as unknown as ["a"])
      }
    }
  },
  castArray: {
    "with an array": _ => {
      const input = new Array(100)

      if (isLodash(_)) {
        _.castArray(input)
      } else {
        _.castArray(input)
      }
    },
    "with number": _ => {
      const input = 1

      if (isLodash(_)) {
        _.castArray(input)
      } else {
        _.castArray(input)
      }
    },
    "with null": _ => {
      if (isLodash(_)) {
        _.castArray(null)
      } else {
        _.castArray(null)
      }
    }
  },
  dash: _ => {
    const input = 'TestString123 with_MIXED_CASES, special!@#$%^&*()Characters, and numbers456'
    if (isLodash(_)) {
      _.kebabCase(input)
    } else {
      _.dash(input)
    }
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
    }
  },
  zip: {
    "with non-empty arrays": _ => {
      if (isLodash(_)) {
        _.zip(['a', 'b'], [1, 2], [true, false])
      } else {
        _.zip(['a', 'b'], [1, 2], [true, false])
      }
    }
  },
  set: {
    "with simple path": _ => {
      if (isLodash(_)) {
        _.set({}, 'foo', 0)
      } else {
        _.set({}, 'foo', 0)
      }
    },
    "with deep path": _ => {
      if (isLodash(_)) {
        _.set({}, 'cards.value', 2)
      } else {
        _.set({}, 'cards.value', 2)
      }
    },
    "with array index path": _ => {
      if (isLodash(_)) {
        _.set({}, 'cards[0].value', 2)
      } else {
        _.set({}, 'cards[0].value', 2)
      }
    },
    "with numeric key": _ => {
      if (isLodash(_)) {
        _.set({}, 'cards[0]value', 2)
      } else {
        _.set({}, 'cards[0]value', 2)
      }
    }
  },
  clone: {
    "with object": _ => {
      const obj = {
        x: 22,
        add: (a: number, b: number) => a + b,
        child: {
          key: 'yolo',
        },
      }
      _.clone(obj)
      
    },
    "with class instance": _ => {
      class Data {
        val = 0
      }
      const obj = new Data()
      obj.val = 1
      _.clone(obj)
      
    }
  },
  isPlainObject: {
    "with object literal": _ => {
        _.isPlainObject({})
    },
    "with Object.create(null)": _ => {
        _.isPlainObject(Object.create(null))
    },
    "with non-plain object (Date)": _ => {
        _.isPlainObject(new Date())
    },
    "with namespace object": _ => {
      _.isPlainObject(Math)
    },
    "with non-plain object (arguments)": _ => {
      function returnArguments() {
        return arguments
      }
      _.isPlainObject(returnArguments())
    },
    "with null": _ => {
      _.isPlainObject(null)
    }
  },
  get: {
    "with simple path": _ => {
      if (isLodash(_)) {
        _.get(jay, 'name')
      } else {
        _.get(jay, 'name')
      }
    },
    "with array index path": _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[0].age')
      } else {
        _.get(jay, 'friends[0].age')
      }
    },
    "with default value": _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[1].age', 22)
      } else {
        _.get(jay, 'friends[1].age', 22)
      }
    },
    "with undefined nested path and default value": _ => {
      if (isLodash(_)) {
        _.get(jay, 'friends[0].friends[0].friends[0].age', 22)
      } else {
        _.get(jay, 'friends[0].friends[0].friends[0].age', 22)
      }
    }
  }
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
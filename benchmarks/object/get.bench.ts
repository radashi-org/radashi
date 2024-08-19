import * as _ from 'radashi'

type Person = {
  name: string
  age: number
  friends?: Person[]
}

const jay: Person = {
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

describe('get', () => {
  bench('with simple path', () => {
    _.get(jay, 'name')
  })

  bench('with array index path', () => {
    _.get(jay, 'friends[0].age')
  })

  bench('with default value', () => {
    _.get(jay, 'friends.1.age', 22)
  })

  bench('with undefined nested path and default value', () => {
    _.get(jay, 'friends[0].friends[0].friends[0].age', 22)
  })
})

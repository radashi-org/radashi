import * as _ from 'radashi'

describe('alphabetical', () => {
  bench('with ascending order', () => {
    const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
    _.alphabetical(list, i => i.name)
  })

  bench('with descending order', () => {
    const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
    _.alphabetical(list, i => i.name, 'desc')
  })
})

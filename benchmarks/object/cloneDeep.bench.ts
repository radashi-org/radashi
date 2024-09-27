import * as _ from 'radashi'

describe('cloneDeep', () => {
  const objects: any = _.list<number>(0, 5, i => {
    const object: any = {}
    _.set(object, 'a.b.c.d.e.f.g.h.i.k.l.m.n.o.p', i)
    return object
  })

  bench('dozens of nested plain objects', () => {
    _.cloneDeep(objects)
  })
})

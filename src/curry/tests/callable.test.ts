import * as _ from 'radashi'

describe('callable function', () => {
  test('makes object callable', async () => {
    const request = {
      source: 'client',
      body: 'ford',
      doors: 2
    }

    const call = _.callable(request, self => (id: string) => ({ ...self, id }))

    expect(call.source).toBe('client')
    expect(call.body).toBe('ford')
    expect(call.doors).toBe(2)
    const s = call('23')
    expect(s.doors).toBe(2)
    expect(s.id).toBe('23')

    call.doors = 4
    expect(call.doors).toBe(4)
    const x = call('9')
    expect(x.doors).toBe(4)
    expect(x.id).toBe('9')
  })
})

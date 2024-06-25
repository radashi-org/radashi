import * as _ from 'radashi'

describe('defer function', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('calls registered defer function', async () => {
    let val = 0
    await _.defer(async defer => {
      defer(() => {
        val = 1
      })
    })
    expect(val).toBe(1)
  })
  test('returns the resulting value of the given function', async () => {
    let val = 0
    const result = await _.defer(async defer => {
      defer(() => {
        val = 1
      })
      return 'x'
    })
    expect(val).toBe(1)
    expect(result).toBe('x')
  })
  test('calls all registered defer functions', async () => {
    let one = 0
    let two = 0
    let three = 0
    const result = await _.defer(async defer => {
      defer(async () => {
        one = 1
      })
      defer(async () => {
        two = 2
      })
      defer(async () => {
        three = 3
      })
      return 'x'
    })
    expect(one).toBe(1)
    expect(two).toBe(2)
    expect(three).toBe(3)
    expect(result).toBe('x')
  })
  test('calls all registered defer functions when error is thrown', async () => {
    let one = 0
    let two = 0
    let three = 0
    try {
      await _.defer(async defer => {
        defer(async () => {
          one = 1
        })
        defer(async () => {
          two = 2
        })
        defer(async () => {
          three = 3
        })
        if (!!true) throw new Error('soooo broken')
        return 'x'
      })
    } catch {}
    expect(one).toBe(1)
    expect(two).toBe(2)
    expect(three).toBe(3)
  })
  test('throws the error', async () => {
    let error: Error | null = null
    try {
      await _.defer(async () => {
        throw new Error('soooo broken')
      })
    } catch (err: any) {
      error = err
    }
    expect(error).not.toBeNull()
    expect(error?.message).toBe('soooo broken')
  })
  test('rethrows the rethrown error when rethrow is true', async () => {
    let error: Error | null = null
    try {
      await _.defer(async register => {
        register(
          async () => {
            throw new Error('soooo broken')
          },
          { rethrow: true }
        )
      })
    } catch (err: any) {
      error = err
    }
    expect(error).not.toBeNull()
    expect(error?.message).toBe('soooo broken')
  })
  test('does not rethrow the rethrown error when rethrow is false', async () => {
    let error: Error | null = null
    try {
      await _.defer(async register => {
        register(
          async () => {
            throw new Error('soooo broken')
          },
          { rethrow: false }
        )
      })
    } catch (err: any) {
      error = err
    }
    expect(error).toBeNull()
  })
  test('does not rethrow the rethrown error by default', async () => {
    let error: Error | null = null
    try {
      await _.defer(async register => {
        register(async () => {
          throw new Error('soooo broken')
        })
      })
    } catch (err: any) {
      error = err
    }
    expect(error).toBeNull()
  })
  test('returns awaited async results', async () => {
    const result = await _.defer(() => {
      return new Promise<string>(res => res('x'))
    })
    expect(result).toBe('x')
  })
})

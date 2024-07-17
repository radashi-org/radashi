test('should use the the native AggregateError if available', async () => {
  const { AggregateError } = await import('radashi')
  expect(AggregateError).toBe(globalThis.AggregateError)
  expect(new AggregateError([])).toBeInstanceOf(globalThis.AggregateError)
})

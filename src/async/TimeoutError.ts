export class TimeoutError extends Error {
  name = 'TimeoutError'
  constructor(message?: string) {
    super(message ?? 'Operation timed out')
  }
}

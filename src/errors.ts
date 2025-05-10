export class IllegalSizeError extends Error {
  constructor(private _message = 'Size must not be less than 0') {
    super(_message)
    super.name = IllegalSizeError.name
  }

  get message(): string {
    return this._message
  }
}

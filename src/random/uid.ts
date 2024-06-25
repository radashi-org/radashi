import { iterate } from 'radashi'
import { random } from 'radashi'

export const uid = (length: number, specials: string = '') => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials
  return iterate(
    length,
    acc => {
      return acc + characters.charAt(random(0, characters.length - 1))
    },
    ''
  )
}

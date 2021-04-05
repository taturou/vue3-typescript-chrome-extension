import { StorageType } from './types'
import LocalStorage from './LocalStorage'
import StorageLocal from './StorageLocal'
import Mock from './Mock'

export function Storage(kind?: 'LocalStorage' | 'storage.local' | 'mock'): StorageType {
  if (kind) {
    switch (kind) {
      case 'LocalStorage':
        return new LocalStorage()
      case 'storage.local':
        return new StorageLocal()
      case 'mock':
        return new Mock()
      default: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore TS6133: 'req' is declared but its value is never read.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = kind
        throw new Error('Invalid kind.')
      }
    }
  } else {
    if (process.env.REPO_ENV === 'mock') {
      return new Mock()
    } else {
      return new LocalStorage()
    }
  }
}

import type { StorageType } from './types'
import storage_local from './storage_local'
import storage_sync from './storage_sync'
import localStorage from './localStorage'
import sessionStorage from './sessionStorage'
import memoryStorage from './memory'

export function StorageFactory(kind: 'storage.local' | 'storage.sync' | 'localStorage' | 'sessionStorage' | 'memory'): StorageType {
  switch (kind) {
    case 'storage.local':
      return new storage_local()
    case 'storage.sync':
      return new storage_sync()
    case 'localStorage':
      return new localStorage()
    case 'sessionStorage':
      return new sessionStorage()
    case 'memory':
      return new memoryStorage()
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS6133: 'req' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = kind
      throw new Error('Invalid kind.')
    }
  }
}

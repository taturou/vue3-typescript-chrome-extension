import { StorageType } from './types'
import LocalStorage from './LocalStorage'
import StorageLocal from './StorageLocal'
import Mock from './Mock'

export function Storage (kind?: 'LocalStorage' | 'storage.local' | 'mock'): StorageType {
  if (kind) {
    switch(kind) {
    case 'LocalStorage': return new LocalStorage()
    case 'storage.local': return new StorageLocal()
    case 'mock': return new Mock()
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-case-declarations
      const dummy: never = kind
      throw new Error('Invalid kind.')
    }
  } else {
    if (process.env.REPO_ENV === 'mock') {
      return new Mock()
    } else {
      {{#if_eq manifestVer "v2"}}return new LocalStorage(){{/if_eq}}{{#if_eq manifestVer "v3"}}return new StorageLocal(){{/if_eq}}
    }
  }
}

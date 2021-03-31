import { RepositoryType as CounterRepositoryType } from './counter/types'
import CounterLocalStorageRepository from './counter/LocalStorageRepository'
import CounterMockRepository from './counter/MockRepository'
import { RepositoryType as MemosRepositoryType } from './memos/types'
import MemosLocalStorageRepository from './memos/LocalStorageRepository'
import MemosMockRepository from './memos/MockRepository'

export interface Repositories {
  counter: () => CounterRepositoryType,
  memos: () => MemosRepositoryType
}

export default {
  counter: () => {
    if (process.env.REPO_ENV === 'mock') {
      return new CounterMockRepository()
    } else {
      return new CounterLocalStorageRepository()
    }
  },
  memos: () => {
    if (process.env.REPO_ENV === 'mock') {
      return new MemosMockRepository()
    } else {
      return new MemosLocalStorageRepository()
    }
  }
} as Repositories

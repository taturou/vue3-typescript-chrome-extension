import { RepositoryType as CounterRepositoryType } from './Counter/types'
import CounterLocalStorageRepository from './Counter/LocalStorageRepository'
import CounterMockRepository from './Counter/MockRepository'
import { RepositoryType as MemosRepositoryType } from './Memos/types'
import MemosLocalStorageRepository from './Memos/LocalStorageRepository'
import MemosMockRepository from './Memos/MockRepository'

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

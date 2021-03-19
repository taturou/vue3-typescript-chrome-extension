import { RepositoryType as CounterRepositoryType } from './Counter/types'
import CounterLocalStorageRepository from './Counter/LocalStorageRepository'
import CounterMockRepository from './Counter/MockRepository'

export interface Repositories {
  counter: () => CounterRepositoryType
}

export default {
  counter: () => {
    if (process.env.REPO_ENV === 'mock') {
      return new CounterMockRepository()
    } else {
      return new CounterLocalStorageRepository()
    }
  }
} as Repositories

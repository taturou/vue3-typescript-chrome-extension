import { RepositoryType as CounterRepositoryType } from './counter/types'
import CounterRepository from './counter'
import { RepositoryType as MemosRepositoryType } from './memos/types'
import MemosRepository from './memos'

export interface Repositories {
  counter: CounterRepositoryType,
  memos: MemosRepositoryType
}

export default {
  counter: CounterRepository,
  memos: MemosRepository
} as Repositories

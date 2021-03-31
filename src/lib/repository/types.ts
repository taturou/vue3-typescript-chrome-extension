import { RepositoryType as CounterRepositoryType } from './counter/types'
import { RepositoryType as MemosRepositoryType } from './memos/types'

export interface RepositoriesType {
  counter: CounterRepositoryType,
  memos: MemosRepositoryType
}

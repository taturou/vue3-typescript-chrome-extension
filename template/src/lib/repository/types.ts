import type { RepositoryType as CounterRepositoryType } from './counter/types'
import type { RepositoryType as MemosRepositoryType } from './memos/types'

export interface RepositoriesType {
  counter: CounterRepositoryType
  memos: MemosRepositoryType
}

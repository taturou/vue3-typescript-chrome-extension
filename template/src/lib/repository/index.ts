import type { RepositoriesType } from './types'
import CounterRepository from './counter'
import MemosRepository from './memos'

const repositories: RepositoriesType = {
  counter: CounterRepository,
  memos: MemosRepository
}

export default repositories

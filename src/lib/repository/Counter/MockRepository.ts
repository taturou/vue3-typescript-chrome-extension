import { StateType } from '@/lib/store/Counter/types'
import { RepositoryType, ReposotySetCountParam } from './types'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      count: 0
    }
  }

  fetch (): Promise<StateType> {
    return new Promise((resolve) => {
      resolve(this.state)
    })
  }

  count (): Promise<number> {
    return new Promise((resolve) => {
      resolve(this.state.count)
    })
  }

  setCount (payload: ReposotySetCountParam): Promise<number> {
    return new Promise((resolve) => {
      this.state.count = payload.count
      resolve(this.state.count)
    })
  }
}

export default MockRepository

import { StateType } from '@/lib/store/Counter/types'
import { RepositoryType } from './types'

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

  setCount (payload: { count: number }): Promise<number> {
    return new Promise((resolve) => {
      this.state.count = payload.count
      resolve(this.state.count)
    })
  }
}

export default MockRepository

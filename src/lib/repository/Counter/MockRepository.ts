import { StateType } from '@/lib/store/Counter/types'
import { CounterRepositoryType } from './types'

class CounterMockRepository implements CounterRepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      count: 0
    }
  }

  fetch(): Promise<StateType> {
    return new Promise((resolve) => {
      resolve(this.state)
    })
  }

  count(): Promise<number> {
    return new Promise((resolve) => {
      resolve(this.state.count)
    })
  }

  setCount(value: number): Promise<number> {
    return new Promise((resolve) => {
      this.state.count = value
      resolve(this.state.count)
    })
  }
}

export default CounterMockRepository

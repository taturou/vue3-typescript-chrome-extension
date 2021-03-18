import { messageType } from '@/lib/message/types'
import { StateType } from '@/lib/store/Counter/types'
import { CounterRepositoryType } from './types'

class CounterLocalStorageRepository implements CounterRepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      count: 0
    }
  }

  fetch(): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'counter',
            counter: {
              type: 'fetch',
              response: {
                state: {} as StateType
              }
            }
          }
        } as messageType,
        (state: StateType) => {
          this.state.count = state.count
          resolve(this.state)
        }
      )
    })
  }

  count(): Promise<number> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'counter',
            counter: {
              type: 'count',
              response: {
                count: 0
              }
            }
          }
        } as messageType,
        (count: number) => {
          this.state.count = count
          resolve(this.state.count)
        }
      )
    })
  }

  setCount(value: number): Promise<number> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'counter',
            counter: {
              type: 'setCount',
              params: {
                value: value
              },
              response: {
                count: 0
              }
            }
          }
        } as messageType,
        (count: number) => {
          this.state.count = count
          resolve(this.state.count)
        }
      )
    })
  }
}

export default CounterLocalStorageRepository

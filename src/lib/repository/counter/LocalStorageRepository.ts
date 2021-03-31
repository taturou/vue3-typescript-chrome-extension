import { backgroundMessageType } from '@/background/message/types'
import { StateType } from '@/lib/store/counter/types'
import { RepositoryType } from './types'

class LocalStorageRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      count: 0
    }
  }

  async fetch (): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'repository',
          repository: {
            type: 'counter',
            counter: {
              type: 'fetch',
              response: {} as StateType
            }
          }
        } as backgroundMessageType,
        (state: StateType) => {
          this.state = state
          resolve(this.state)
        }
      )
    })
  }

  setCount (payload: { count: number }): Promise<number> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'repository',
          repository: {
            type: 'counter',
            counter: {
              type: 'setCount',
              params: {
                count: payload.count
              },
              response: 0
            }
          }
        } as backgroundMessageType,
        (count: number) => {
          this.state.count = count
          resolve(this.state.count)
        }
      )
    })
  }
}

export default LocalStorageRepository

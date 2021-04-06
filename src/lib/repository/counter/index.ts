import type { backgroundMessageType } from '@/background/message/types'
import type { StateType } from '@/lib/store/counter/types'
import type { RepositoryType } from './types'

const repository: RepositoryType = {
  fetch(): Promise<StateType> {
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
          resolve(state)
        }
      )
    })
  },
  setCount(payload: { count: number }): Promise<number> {
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
          resolve(count)
        }
      )
    })
  }
}

export default repository

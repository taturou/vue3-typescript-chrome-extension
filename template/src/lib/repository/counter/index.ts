import { browser } from 'webextension-polyfill-ts'
import type { backgroundMessageType } from '@/background/message/types'
import type { StateType } from '@/lib/store/counter/types'
import type { RepositoryType } from './types'

const repository: RepositoryType = {
  async fetch(): Promise<StateType> {
    const response = (await browser.runtime.sendMessage({
      type: 'repository',
      repository: {
        type: 'counter',
        counter: {
          type: 'fetch',
          response: {} as StateType
        }
      }
    } as backgroundMessageType)) as StateType
    return response
  },
  async setCount(payload: { count: number }): Promise<number> {
    const response = (await browser.runtime.sendMessage({
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
    } as backgroundMessageType)) as number
    return response
  }
}

export default repository

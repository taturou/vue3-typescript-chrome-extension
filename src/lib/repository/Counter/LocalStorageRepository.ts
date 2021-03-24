import { backgroundType } from '@/background/message/types'
import { StateType } from '@/lib/store/Counter/types'
import { RepositoryType } from './types'
import * as tabs from '@/lib/tabs'

class LocalStorageRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      count: 0
    }
  }

  async fetch (): Promise<StateType> {
    const currentTab = await tabs.getCurrent()
    const tab = currentTab ? { id: currentTab.id as number } : undefined

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'counter',
            counter: {
              type: 'fetch',
              tab: tab,
              response: {} as StateType
            }
          }
        } as backgroundType,
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
          type: 'localStorage',
          localStorage: {
            type: 'counter',
            counter: {
              type: 'setCount',
              params: {
                count: payload.count
              },
              response: 0
            }
          }
        } as backgroundType,
        (count: number) => {
          this.state.count = count
          resolve(this.state.count)
        }
      )
    })
  }
}

export default LocalStorageRepository

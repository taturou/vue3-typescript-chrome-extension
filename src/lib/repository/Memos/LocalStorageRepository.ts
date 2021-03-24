import { backgroundType } from '@/background/message/types'
import { StateType } from '@/lib/store/Memos/types'
import { RepositoryType } from './types'
import * as tabs from '@/lib/tabs'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      maxId: 0,
      memos: []
    }
  }

  async fetch(): Promise<StateType> {
    const currentTab = await tabs.getCurrent()
    const tab = currentTab ? { id: currentTab.id as number } : undefined

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            memos: {
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

  // 2nd return value is the index of the MemoType.memo[] that was added.
  add (payload: { content: string }): Promise<[StateType, number]> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            memos: {
              type: 'add',
              params: {
                content: payload.content
              },
              response: [{} as StateType, 0]
            }
          }
        } as backgroundType,
        (response: { state: StateType, index: number }) => {
          this.state = response.state
          resolve([this.state, response.index])
        }
      )
    })
  }

  updateById (payload: { id: number, content: string }): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            memos: {
              type: 'updateById',
              params: {
                id: payload.id,
                content: payload.content
              },
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

  deleteById (payload: { id: number }): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            memos: {
              type: 'deleteById',
              params: {
                id: payload.id
              },
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
}

export default MockRepository

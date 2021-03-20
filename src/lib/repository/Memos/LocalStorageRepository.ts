import { messageType } from '@/background/message/types'
import { StateType } from '@/lib/store/Memos/types'
import { RepositoryType } from './types'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      maxId: 0,
      memos: []
    }
  }

  fetch(): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            memos: {
              type: 'fetch',
              response: {} as StateType
            }
          }
        } as messageType,
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
        } as messageType,
        (response: { state: StateType, index: number }) => {
          this.state = response.state
          resolve([this.state, response.index])
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
        } as messageType,
        (state: StateType) => {
          this.state = state
          resolve(this.state)
        }
      )
    })
  }
}

export default MockRepository
import { backgroundMessageType } from '@/background/message/types'
import { StateType } from '@/lib/store/memos/types'
import { RepositoryType } from './types'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      maxId: 0,
      memos: []
    }
  }

  async fetch(): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'repository',
          repository: {
            type: 'memos',
            memos: {
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

  // 2nd return value is the index of the MemoType.memo[] that was added.
  add (payload: { content: string }): Promise<{ state: StateType, addedIndex: number }> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'repository',
          repository: {
            type: 'memos',
            memos: {
              type: 'add',
              params: {
                content: payload.content
              },
              response: {
                state: {},
                addedIndex: 0
              }
            }
          }
        } as backgroundMessageType,
        (response: { state: StateType, addedIndex: number }) => {
          this.state = response.state
          resolve({ state: this.state, addedIndex: response.addedIndex })
        }
      )
    })
  }

  updateById (payload: { id: number, content: string }): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'repository',
          repository: {
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
        } as backgroundMessageType,
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
          type: 'repository',
          repository: {
            type: 'memos',
            memos: {
              type: 'deleteById',
              params: {
                id: payload.id
              },
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
}

export default MockRepository

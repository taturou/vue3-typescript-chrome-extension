import { messageType } from '@/background/message/types'
import { StateType } from '@/lib/store/Memos/types'
import { RepositoryType, RepositoryAddParams, RepositoryDeleteByIdParams } from './types'

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
            counter: {
              type: 'fetch',
              response: {
                state: {} as StateType
              }
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

  add (payload: RepositoryAddParams): Promise<[StateType, number]> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            counter: {
              type: 'add',
              params: {
                content: payload.content
              },
              response: {
                state: {} as StateType
              }
            }
          }
        } as messageType,
        (state: StateType) => {
          this.state = state
          resolve([this.state, this.state.memos.length - 1])
        }
      )
    })
  }

  deleteById (payload: RepositoryDeleteByIdParams): Promise<StateType> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: 'localStorage',
          localStorage: {
            type: 'memos',
            counter: {
              type: 'deleteById',
              params: {
                id: payload.id
              },
              response: {
                state: {} as StateType
              }
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

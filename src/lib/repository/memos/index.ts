import { backgroundMessageType } from '@/background/message/types'
import { StateType } from '@/lib/store/memos/types'
import { RepositoryType } from './types'

const repository: RepositoryType = {
  fetch(): Promise<StateType> {
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
          resolve(state)
        }
      )
    })
  },
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
          resolve({ state: response.state, addedIndex: response.addedIndex })
        }
      )
    })
  },
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
          resolve(state)
        }
      )
    })
  },
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
          resolve(state)
        }
      )
    })
  }
}

export default repository

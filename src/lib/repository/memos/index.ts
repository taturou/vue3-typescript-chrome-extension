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
  add(payload: { content: string }): Promise<{ state: StateType; addedIndex: number | null }> {
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
                addedIndex: null
              }
            }
          }
        } as backgroundMessageType,
        (response: { state: StateType; addedIndex: number | null }) => {
          resolve({ state: response.state, addedIndex: response.addedIndex })
        }
      )
    })
  },
  updateById(payload: { id: number; content: string }): Promise<{ state: StateType; updatedIndex: number | null }> {
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
              response: {
                state: {},
                updatedIndex: null
              }
            }
          }
        } as backgroundMessageType,
        (response: { state: StateType; updatedIndex: number | null }) => {
          resolve({ state: response.state, updatedIndex: response.updatedIndex })
        }
      )
    })
  },
  deleteById(payload: { id: number }): Promise<{ state: StateType; success: boolean }> {
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
              response: {
                state: {},
                success: false
              }
            }
          }
        } as backgroundMessageType,
        (response: { state: StateType; success: boolean }) => {
          resolve({ state: response.state, success: response.success })
        }
      )
    })
  }
}

export default repository

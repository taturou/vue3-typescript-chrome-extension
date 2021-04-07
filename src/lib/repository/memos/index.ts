import { browser } from 'webextension-polyfill-ts'
import type { backgroundMessageType } from '@/background/message/types'
import type { StateType } from '@/lib/store/memos/types'
import type { RepositoryType } from './types'

const repository: RepositoryType = {
  async fetch(): Promise<StateType> {
    const response = (await browser.runtime.sendMessage({
      type: 'repository',
      repository: {
        type: 'memos',
        memos: {
          type: 'fetch',
          response: {} as StateType
        }
      }
    } as backgroundMessageType)) as StateType
    return response
  },
  async add(payload: { content: string }): Promise<{ state: StateType; addedIndex: number | null }> {
    const response = (await browser.runtime.sendMessage({
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
    } as backgroundMessageType)) as { state: StateType; addedIndex: number | null }
    return response
  },
  async updateById(payload: {
    id: number
    content: string
  }): Promise<{ state: StateType; updatedIndex: number | null }> {
    const response = (await browser.runtime.sendMessage({
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
    } as backgroundMessageType)) as { state: StateType; updatedIndex: number | null }
    return response
  },
  async deleteById(payload: { id: number }): Promise<{ state: StateType; success: boolean }> {
    const response = (await browser.runtime.sendMessage({
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
    } as backgroundMessageType)) as { state: StateType; success: boolean }
    return response
  }
}

export default repository

import { MemoType, StateType } from '@/lib/store/Memos/types'
import { RepositoryType } from './types'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    const now = new Date().toISOString()
    this.state = {
      maxId: 2,
      memos: [
        {
          id: 1,
          content: 'Sample content 1',
          createdAt: now,
          modifiedAt: now
        },
        {
          id: 2,
          content: 'Sample content 2\nThis is long text.',
          createdAt: now,
          modifiedAt: now
        }
      ]
    }
  }

  fetch(): Promise<StateType> {
    return new Promise((resolve) => {
      resolve(this.state)
    })
  }

  // 2nd return value is the index of the MemoType.memo[] that was added.
  add (payload: { content: string }): Promise<[StateType, number]> {
    return new Promise((resolve) => {
      this.state.maxId += 1
      const now = new Date().toISOString()
      const memo: MemoType = {
        id: this.state.maxId,
        content: payload.content,
        createdAt: now,
        modifiedAt: now
      }
      this.state.memos.push(memo)
      resolve([this.state, this.state.memos.length - 1])
    })
  }

  updateById (payload: { id: number, content: string }): Promise<StateType> {
    return new Promise((resolve) => {
      this.state.memos
        .filter((memo) => { return memo.id !== payload.id })
        .map((memo) => {
          memo.content = payload.content
          memo.modifiedAt = new Date().toISOString()
        })
      resolve(this.state)
    })
  }

  deleteById (payload: { id: number }): Promise<StateType> {
    return new Promise((resolve) => {
      this.state.memos = this.state.memos.filter((memo) => {
        return memo.id !== payload.id
      })
      resolve(this.state)
    })
  }
}

export default MockRepository

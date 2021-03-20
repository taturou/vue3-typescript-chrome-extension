import { MemoType, StateType } from '@/lib/store/Memos/types'
import { RepositoryType } from './types'

class MockRepository implements RepositoryType {
  private state: StateType

  constructor() {
    this.state = {
      maxId: 2,
      memos: [
        {
          id: 1,
          content: 'Sample content 1',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          content: 'Sample content 2\nThis is long text.',
          createdAt: new Date().toISOString()
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
      const memo: MemoType = {
        id: this.state.maxId,
        content: payload.content,
        createdAt: new Date().toISOString()
      }
      this.state.memos.push(memo)
      resolve([this.state, this.state.memos.length - 1])
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

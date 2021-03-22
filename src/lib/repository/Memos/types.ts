import { StateType } from '@/lib/store/Memos/types'

export interface RepositoryType {
  fetch (): Promise<StateType>,
  add (payload: { content: string }): Promise<[StateType, number]>, // 2nd return value is the index of the MemoType.memo[] that was added.
  updateById (payload: { id: number, content: string }): Promise<StateType>
  deleteById (payload: { id: number }): Promise<StateType>
}

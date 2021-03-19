import { MemoType, StateType } from '@/lib/store/Memos/types'

export type RepositoryAddParams = Pick<MemoType, 'content'>
export type RepositoryDeleteByIdParams = Pick<MemoType, 'id'>

export interface RepositoryType {
  fetch (): Promise<StateType>,
  add (payload: RepositoryAddParams): Promise<[StateType, number]>, // 2nd return value is the index of the MemoType.memo[] that was added.
  deleteById (payload: RepositoryDeleteByIdParams): Promise<StateType>
}

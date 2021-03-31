import { StateType } from '@/lib/store/memos/types'

export interface RepositoryType {
  fetch (): Promise<StateType>,
  add (payload: { content: string }): Promise<{ state: StateType, addedIndex: number }>,
  updateById (payload: { id: number, content: string }): Promise<StateType>
  deleteById (payload: { id: number }): Promise<StateType>
}

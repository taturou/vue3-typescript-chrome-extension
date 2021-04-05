import { StateType } from '@/lib/store/memos/types'

export interface RepositoryType {
  fetch (): Promise<StateType>,
  // If an error occur, "addedIndex" will be set to null.
  add (payload: { content: string }): Promise<{ state: StateType, addedIndex: number | null }>,
  // If an error occur, "updatedIndex" will be set to null.
  updateById (payload: { id: number, content: string }): Promise<{ state: StateType, updatedIndex: number | null }>
  deleteById (payload: { id: number }): Promise<{ state: StateType, success: boolean }>
}

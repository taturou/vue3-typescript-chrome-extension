import { StateType } from '@/lib/store/Counter/types'

export interface RepositoryType {
  fetch (): Promise<StateType>,
  count (): Promise<number>,
  setCount (payload: { count: number }): Promise<number>
}

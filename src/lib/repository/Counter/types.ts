import { StateType } from '@/lib/store/Counter/types'

export interface RepositoryType {
  fetch (): Promise<StateType>,
  setCount (payload: { count: number }): Promise<number>
}

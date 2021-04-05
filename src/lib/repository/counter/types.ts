import { StateType } from '@/lib/store/counter/types'

export interface RepositoryType {
  fetch(): Promise<StateType>
  setCount(payload: { count: number }): Promise<number>
}

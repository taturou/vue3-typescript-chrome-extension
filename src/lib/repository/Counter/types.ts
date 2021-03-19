import { StateType } from '@/lib/store/Counter/types'

export type ReposotySetCountParam = Pick<StateType, 'count'>

export interface RepositoryType {
  fetch (): Promise<StateType>,
  count (): Promise<number>,
  setCount (payload: ReposotySetCountParam): Promise<number>
}

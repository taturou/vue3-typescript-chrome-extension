import { StateType } from '@/lib/store/Counter/types'

export interface CounterRepositoryType {
  fetch (): Promise<StateType>,
  count (): Promise<number>,
  setCount (value: number): Promise<number>
}

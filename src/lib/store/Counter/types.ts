import { StoreActionsInjecteeType, StoreModuleType } from '@/lib/store/_types'
import { RootState } from '@/lib/store/types'

export interface StateType {
  count: number
}

export interface GettersType {
  object (state: StateType): StateType,
  count (state: StateType): number
}

export type MutationSetCountParams = Pick<StateType, 'count'>

export interface MutationsType {
  setCount (state: StateType, payload: MutationSetCountParams): void
}

export type ActionsInjecteeType = StoreActionsInjecteeType<RootState, StateType, MutationsType>

export interface ActionsType {
  fetch (injectee: ActionsInjecteeType): Promise<void>,
  increment (injectee: ActionsInjecteeType): Promise<void>,
  decrement (injectee: ActionsInjecteeType): Promise<void>
}

export type CounterStoreModuleType<M extends string> = StoreModuleType<M, StateType, GettersType, MutationsType, ActionsType>

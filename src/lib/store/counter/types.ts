import type { StoreActionsInjecteeType, StoreModuleType } from '@/lib/store/_types'
import type { RootState } from '@/lib/store/types'

export interface StateType {
  count: number
  max: number
  min: number
}

export interface GettersType {
  object(state: StateType): StateType
  count(state: StateType): number
}

export interface MutationsType {
  count(state: StateType, payload: { count: number }): void
}

export type ActionsInjecteeType = StoreActionsInjecteeType<RootState, StateType, MutationsType>

export interface ActionsType {
  fetch(injectee: ActionsInjecteeType): Promise<void>
  increment(injectee: ActionsInjecteeType): Promise<void>
  decrement(injectee: ActionsInjecteeType): Promise<void>
}

export type CounterStoreModuleType<M extends string> = StoreModuleType<
  M,
  StateType,
  GettersType,
  MutationsType,
  ActionsType
>

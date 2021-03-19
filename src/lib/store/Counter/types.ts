import { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex'
import { RootState } from '@/lib/store/types'

export interface StateType {
  count: number
}

export interface GettersType {
  object (state: StateType): StateType,
  count (state: StateType): number
}

export type MutationSetCountParamsType = Pick<StateType, 'count'>

export interface MutationsType {
  setCount (state: StateType, payload: MutationSetCountParamsType): void
}

type ActionsInjecteeType = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload?: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>;
}
& Omit<ActionContext<StateType, RootState>, "commit">;

export interface ActionsType {
  fetch (injectee: ActionsInjecteeType): Promise<void>,
  increment (injectee: ActionsInjecteeType): Promise<void>,
  decrement (injectee: ActionsInjecteeType): Promise<void>
}

export type StoreModuleType<M extends string> = {
  getters: {
    [K in keyof GettersType as `${M}/${K}`]: ReturnType<GettersType[K]>
  }
}
& {
  commit<
    K extends keyof MutationsType
  >(
    key: `${M}/${K}`,
    payload?: Parameters<MutationsType[K]>[1],
    options?: CommitOptions
  ): ReturnType<MutationsType[K]>
}
& {
  dispatch<
    K extends keyof ActionsType
  >(
    key: `${M}/${K}`,
    payload?: Parameters<ActionsType[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsType[K]>,
}
& Omit<baseStore<StateType>, 'getters' | 'commit' | 'dispatch'>

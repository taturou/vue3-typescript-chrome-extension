import { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex'
import { RootState } from '@/lib/store/types'

export interface StateType {
  count: number
}

export interface GettersType {
  counterObject (state: StateType): StateType,
  counterCountValue (state: StateType): number
}

export interface MutationsType {
  counterSetCountValue (state: StateType, count: number): void
}

type ActionsInjecteeType = {
  commit<K extends keyof MutationsType>(
      key: K,
      payload?: Parameters<MutationsType[K]>[1]
    ): ReturnType<MutationsType[K]>;
  } &
  Omit<ActionContext<StateType, RootState>, "commit">;

export interface ActionsType {
  counterFetch (injectee: ActionsInjecteeType): Promise<void>,
  counterIncrement (injectee: ActionsInjecteeType): Promise<void>,
  counterDecrement (injectee: ActionsInjecteeType): Promise<void>
}

export type StoreModuleType<S = StateType> = {
  getters: {
    [K in keyof GettersType]: ReturnType<GettersType[K]>
  }
}
& {
  commit<
    K extends keyof MutationsType
  >(
    key: K,
    payload?: Parameters<MutationsType[K]>[1],
    options?: CommitOptions
  ): ReturnType<MutationsType[K]>
}
& {
  dispatch<
    K extends keyof ActionsType
  >(
    key: K,
    payload?: Parameters<ActionsType[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionsType[K]>,
}
& Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>

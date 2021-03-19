import { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex'
import { RootState } from '@/lib/store/types'

export interface MemoType {
  id: number,
  content: string,
  createdAt: string
}

export interface StateType {
  maxId: number,
  memos: MemoType[]
}

export interface GettersType {
  object (state: StateType): StateType,
  memos (state: StateType): MemoType[]
  total (state: StateType): number
}

export interface MutationsType {
  commit (state: StateType, payload: StateType): void
}

type ActionsInjecteeType = {
  commit<K extends keyof MutationsType>(
    key: K,
    payload?: Parameters<MutationsType[K]>[1]
  ): ReturnType<MutationsType[K]>;
}
& Omit<ActionContext<StateType, RootState>, "commit">;

export type ActionAddParams = Pick<MemoType, 'content'>
export type ActionDeleteByIdParams = Pick<MemoType, 'id'>

export interface ActionsType {
  fetch (injectee: ActionsInjecteeType): Promise<void>,
  add (injectee: ActionsInjecteeType, payload: ActionAddParams): Promise<MemoType>,
  deleteById (injectee: ActionsInjecteeType, payload: ActionDeleteByIdParams): Promise<void>
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

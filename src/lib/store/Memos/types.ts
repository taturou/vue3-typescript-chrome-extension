import { StoreActionsInjecteeType, StoreModuleType } from '@/lib/store/_types'
import { RootState } from '@/lib/store/types'

export interface MemoType {
  id: number,
  content: string,
  createdAt: string,
  modifiedAt: string
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

export type ActionsInjecteeType = StoreActionsInjecteeType<RootState, StateType, MutationsType>

export interface ActionsType {
  fetch (injectee: ActionsInjecteeType): Promise<void>,
  add (injectee: ActionsInjecteeType, payload: { content: string }): Promise<MemoType>,
  updateById (injectee: ActionsInjecteeType, payload: { id: number, content: string }): Promise<MemoType>
  deleteById (injectee: ActionsInjecteeType, payload: { id: number }): Promise<void>
}

export type MemosStoreModuleType<M extends string> = StoreModuleType<M, StateType, GettersType, MutationsType, ActionsType>

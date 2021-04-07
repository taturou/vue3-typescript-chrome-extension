import type { MakeStoreActionsInjecteeType, MakeStoreModuleType } from 'vuex-ts'
import type { RootState } from '@/lib/store/types'

export interface MemoType {
  id: number
  content: string
  createdAt: string
  modifiedAt: string
}

export interface StateType {
  maxId: number
  memos: MemoType[]
}

export interface GettersType {
  object(state: StateType): StateType
  memos(state: StateType): MemoType[]
  total(state: StateType): number
}

export interface MutationsType {
  commit(state: StateType, payload: StateType): void
}

export type ActionsInjecteeType = MakeStoreActionsInjecteeType<RootState, StateType, MutationsType>

export interface ActionsType {
  fetch(injectee: ActionsInjecteeType): Promise<void>
  add(injectee: ActionsInjecteeType, payload: { content: string }): Promise<MemoType | undefined>
  updateById(injectee: ActionsInjecteeType, payload: { id: number; content: string }): Promise<MemoType | undefined>
  deleteById(injectee: ActionsInjecteeType, payload: { id: number }): Promise<boolean>
}

export type MemosStoreModuleType<M extends string> = MakeStoreModuleType<
  M,
  StateType,
  GettersType,
  MutationsType,
  ActionsType
>

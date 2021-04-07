import type { GetterTree } from 'vuex'
import type { RootState } from '@/lib/store/types'
import type { MemoType, StateType, GettersType } from './types'

const getters: GetterTree<StateType, RootState> & GettersType = {
  object(state: StateType): StateType {
    return state
  },
  memos(state: StateType): MemoType[] {
    return state.memos
  },
  total(state: StateType): number {
    return state.memos.length
  }
}

export default getters

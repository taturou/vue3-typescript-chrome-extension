import type { GetterTree } from 'vuex'
import type { RootState } from '@/lib/store/types'
import type { StateType, GettersType } from './types'

const getters: GetterTree<StateType, RootState> & GettersType = {
  object(state: StateType): StateType {
    return state
  },
  count(state: StateType): number {
    return state.count
  }
}

export default getters

import { GetterTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { StateType, GettersType } from './types'

const getters: GetterTree<StateType, RootState> & GettersType = {
  counterObject (state: StateType): StateType {
    return state
  },
  counterCountValue (state: StateType): number {
    return state.count
  }
}

export default getters

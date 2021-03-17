import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { StateType, GettersType } from './types'

const getters: GetterTree<StateType, RootState> & GettersType = {
  counterCountValue: (state): number => {
    return state.count
  }
}

export default getters

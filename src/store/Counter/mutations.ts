import { MutationTree } from 'vuex'
import { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  counterIncrement: (state): void => {
    state.count += 1
  },
  counterDecrement: (state): void => {
    state.count -= 1
  }
}

export default mutations

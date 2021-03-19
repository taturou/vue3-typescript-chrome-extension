import { MutationTree } from 'vuex'
import { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  setCount (state: StateType, count: number): void {
    state.count = count
  }
}

export default mutations

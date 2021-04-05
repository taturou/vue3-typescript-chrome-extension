import { MutationTree } from 'vuex'
import { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  count(state: StateType, payload: { count: number }): void {
    state.count = payload.count
  }
}

export default mutations

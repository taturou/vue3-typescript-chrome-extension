import type { MutationTree } from 'vuex'
import type { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  count(state: StateType, payload: { count: number }): void {
    state.count = payload.count
  }
}

export default mutations

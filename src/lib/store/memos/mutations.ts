import type { MutationTree } from 'vuex'
import type { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  commit(state: StateType, payload: StateType): void {
    state.maxId = payload.maxId
    state.memos = payload.memos
  }
}

export default mutations

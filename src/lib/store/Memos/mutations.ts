import { MutationTree } from 'vuex'
import { StateType, MutationsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  commit (state: StateType, payload: StateType): void {
    state.maxId = payload.maxId
    state.memos = payload.memos
  }
}

export default mutations

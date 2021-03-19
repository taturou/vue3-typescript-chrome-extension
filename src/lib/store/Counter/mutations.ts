import { MutationTree } from 'vuex'
import { StateType, MutationsType, MutationSetCountParams } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  setCount (state: StateType, payload: MutationSetCountParams): void {
    state.count = payload.count
  }
}

export default mutations

import { MutationTree } from 'vuex'
import { StateType, MutationsType, MutationSetCountParamsType } from './types'

const mutations: MutationTree<StateType> & MutationsType = {
  setCount (state: StateType, payload: MutationSetCountParamsType): void {
    state.count = payload.count
  }
}

export default mutations

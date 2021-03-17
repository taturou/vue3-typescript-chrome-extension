import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { StateType, ActionsType } from './types'

const actions: ActionTree<StateType, RootState> & ActionsType = {
  counterIncrement: ({ commit }): void => {
    commit('counterIncrement')
  },
  counterDecrement: ({ commit }): void => {
    commit('counterDecrement')
  }
}

export default actions

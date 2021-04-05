import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { StateType, ActionsType } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.counter

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async fetch({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('count', { count: state.count })
  },
  async increment({ commit, state }): Promise<void> {
    state.count += 1
    if (state.count > state.max) {
      state.count = state.max
    } else {
      await repo.setCount({ count: state.count })
      commit('count', { count: state.count })
    }
  },
  async decrement({ commit, state }): Promise<void> {
    state.count -= 1
    if (state.count < state.min) {
      state.count = state.min
    } else {
      await repo.setCount({ count: state.count })
      commit('count', { count: state.count })
    }
  }
}

export default actions

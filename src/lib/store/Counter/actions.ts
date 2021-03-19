import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { StateType, ActionsType } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.counter()

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async fetch ({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('setCount', state.count)
  },
  async increment ({ commit, state }): Promise<void> {
    state.count += 1
    await repo.setCount(state.count)
    commit('setCount', state.count)
  },
  async decrement ({ commit, state }): Promise<void> {
    state.count -= 1
    await repo.setCount(state.count)
    commit('setCount', state.count)
  }
}

export default actions

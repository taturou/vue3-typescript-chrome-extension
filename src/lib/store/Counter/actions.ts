import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { StateType, ActionsType } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.counter()

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async counterFetch ({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('counterSetCountValue', state.count)
  },
  async counterIncrement ({ commit, state }): Promise<void> {
    state.count += 1
    await repo.setCount(state.count)
    commit('counterSetCountValue', state.count)
  },
  async counterDecrement ({ commit, state }): Promise<void> {
    state.count -= 1
    await repo.setCount(state.count)
    commit('counterSetCountValue', state.count)
  }
}

export default actions

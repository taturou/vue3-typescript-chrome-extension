import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { MemoType, StateType, ActionsType, ActionAddParams, ActionDeleteByIdParams } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.memos()

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async fetch ({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('commit', state)
  },
  async add ({ commit }, payload: ActionAddParams): Promise<MemoType> {
    const [state, index] = await repo.add({ content: payload.content })
    commit('commit', state)
    return state.memos[index]
  },
  async deleteById ({ commit }, payload: ActionDeleteByIdParams): Promise<void> {
    const state = await repo.deleteById({ id: payload.id })
    commit('commit', state)
  }
}

export default actions

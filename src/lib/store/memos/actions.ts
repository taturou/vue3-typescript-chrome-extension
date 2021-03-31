import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { MemoType, StateType, ActionsType } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.memos

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async fetch ({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('commit', state)
  },
  async add ({ commit }, payload: { content: string }): Promise<MemoType> {
    const { state, addedIndex } = await repo.add({ content: payload.content })
    commit('commit', state)
    return state.memos[addedIndex]
  },
  async updateById ({ commit }, payload: { id: number, content: string }): Promise<MemoType> {
    const state = await repo.updateById({ id: payload.id, content: payload.content })
    commit('commit', state)
    return state.memos.filter((memo) => { return memo.id === payload.id})[0]
  },
  async deleteById ({ commit }, payload: { id: number }): Promise<void> {
    const state = await repo.deleteById({ id: payload.id })
    commit('commit', state)
  }
}

export default actions

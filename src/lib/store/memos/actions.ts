import { ActionTree } from 'vuex'
import { RootState } from '@/lib/store/types'
import { MemoType, StateType, ActionsType } from './types'
import Repositories from '@/lib/repository'

const repo = Repositories.memos

const actions: ActionTree<StateType, RootState> & ActionsType = {
  async fetch({ commit }): Promise<void> {
    const state = await repo.fetch()
    commit('commit', state)
  },
  async add({ commit }, payload: { content: string }): Promise<MemoType | undefined> {
    const { state, addedIndex } = await repo.add({ content: payload.content })
    commit('commit', state)
    return addedIndex ? state.memos[addedIndex] : undefined
  },
  async updateById({ commit }, payload: { id: number; content: string }): Promise<MemoType | undefined> {
    const { state, updatedIndex } = await repo.updateById({ id: payload.id, content: payload.content })
    commit('commit', state)
    return updatedIndex ? state.memos[updatedIndex] : undefined
  },
  async deleteById({ commit }, payload: { id: number }): Promise<boolean> {
    const { state, success } = await repo.deleteById({ id: payload.id })
    commit('commit', state)
    return success
  }
}

export default actions

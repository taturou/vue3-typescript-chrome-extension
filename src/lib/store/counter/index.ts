import type { Module } from 'vuex'
import type { RootState } from '@/lib/store/types'
import type { StateType } from './types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state: StateType = {
  count: 0,
  max: 100,
  min: 0
}

const counter: Module<StateType, RootState> = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}

export default counter

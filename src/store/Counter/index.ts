import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { StateType } from './types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state: StateType = {
  count: 0
}

const counter: Module<StateType, RootState> = {
  /* In using Typescript case, it is too difficult to resolve types when the namespace is used.
  namespaced: true,
  */
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}

export default counter

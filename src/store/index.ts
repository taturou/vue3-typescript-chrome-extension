import { createStore, ModuleTree, useStore as baseUseStore } from 'vuex'
import { RootState } from './types'
import CounterModule from './Counter'
import { StoreModuleType as CounterStoreModuleType } from './Counter/types'

const modules: ModuleTree<RootState> = {
  counter: CounterModule
}

export const store = createStore<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: modules
})

export type Store = CounterStoreModuleType

export const useStore = (): Store => {
  return baseUseStore() as Store
}

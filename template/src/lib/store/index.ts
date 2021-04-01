import { createStore, ModuleTree, useStore as baseUseStore } from 'vuex'
import { RootState } from './types'
import CounterModule from './counter'
import { CounterStoreModuleType } from './counter/types'
import MemosModule from './memos'
import { MemosStoreModuleType } from './memos/types'

const modules: ModuleTree<RootState> = {
  counter: CounterModule,
  memos: MemosModule
}

export const store = createStore<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: modules
})

// 'counter' is as same as the module name of CounterModule that is registered to the 'modules' object.
export type Store = CounterStoreModuleType<'counter'> & MemosStoreModuleType<'memos'>

export const useStore = (): Store => {
  return baseUseStore() as Store
}

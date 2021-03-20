import { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncType = (...args: any) => any

// R: RootState
// S: StateType
// M: MutationsType
export type StoreActionsInjecteeType<R, S, M> = {
  commit<
    K extends keyof M
  >(
    key: K,
    payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never
  ): M[K] extends FuncType ? ReturnType<M[K]> : void
}
& Omit<ActionContext<S, R>, "commit">

// T: Module name
// S: StateType
// G: GettersType
// M: MutationsType
// A: ActionsType
export type StoreModuleType<T extends string, S, G, M, A> = {
  getters: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [K in keyof G as `${T}/${K}`]: G[K] extends FuncType ? ReturnType<G[K]> : void
  }
}
& {
  commit<
    K extends keyof M
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${T}/${K}`,
    payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never,
    options?: CommitOptions
  ): M[K] extends FuncType ? ReturnType<M[K]> : void
}
& {
  dispatch<
    K extends keyof A
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${T}/${K}`,
    payload?: A[K] extends FuncType ? Parameters<A[K]>[1] : never,
    options?: DispatchOptions
  ): A[K] extends FuncType ? ReturnType<A[K]> : void
}
& Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>

import type { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncType = (...args: any) => any

/*
  Create an alternative parameter type for Vuex.ActionContext.

  Generics types:
  * R: RootState
  * S: StateType
  * M: MutationsType

  This type will replace only the 'commit' property.
  The 'commit' property will be...
  If you create MutationType as a input is:
    ```
    interface MutationsType {
      put (state: StateType, { id: number, value: string }): void
      delete (state: StateType, { id: number }): void
    }
    ```
  the output type is:
    ```
    type ActionsInjecteeType = MakeStoreActionsInjecteeType<R, S, MutationsType> = {
      commit(key: 'put', payload: { id: number, value: string}): void
    } | {
      commit(key: 'delete', payload: { id: number }): void
    }
    ```

  The implement of the actions of Vuex can use parameter 'commit' like this:
    ```
    const actions = {
      async put ({ commit }, payload: { id: number, value: string }): Promise<void> {
        const { id, value } = await fooPut(id, value)
        commit('put, { id: id, value: value })
      },
      async delete ({ commit }, payload: { id: number }): Promise<void> {
        const { id } = await fooDelete(id)
        commit('delete, { id: id })
      }
    }
    ```
*/
export type MakeStoreActionsInjecteeType<R, S, M> = {
  commit<K extends keyof M>(
    key: K,
    payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never
  ): M[K] extends FuncType ? ReturnType<M[K]> : void
} & Omit<ActionContext<S, R>, 'commit'>

/*
  Create an alternative Store type for Vuex.

  Generics types:
  * S: StateType
  * G: GettersType
  * M: MutationsType
  * A: ActionsType

  This type provides 'getters', 'commit', and 'dispatch' properties that support Vuex module.

  The 'getters' property will be...
  If you create GettersType as a input is:
    ```
    interface GettersType {
        get (state: StateType): string
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreType<S, GettersType, M, A> = {
      getters: {
        get: number
      }
    }
    ```

  The 'commit' property will be...
  If you create MutationsType as a input is:
    ```
    interface MutationsType {
      put (state: StateType, payload: { id: number, value: string }): void
      delete (state: StateType, payload: { id: number }): void
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreType<S, G, MutationsType, A> = {
      commit(
        key: 'put',
        payload?: { id: number, value: string },
        options?: vuex.CommitOptions
      ): void
    } | {
      commit(
        key: 'delete',
        payload?: { id: number },
        options?: vuex.CommitOptions
      ): void
    }
    ```

  The 'dispatch' property will be...
  If you create ActionsType as a input is:
    ```
    interface ActionsType {
      put (injectee: ActionsInjecteeTyp, payload: { id: number, value: string }): Promise<void>
      delete (injectee: ActionsInjecteeTyp, payload: { id: number }): Promise<void>
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreType<S, G, M, ActionsType> = {
      dispatch(
        key: 'put',
        payload?: { id: number, value: string },
        options?: vuex.DispatchOptions
      ): Promise<void>
    } | {
      dispatch(
        key: 'delete',
        payload?: { id: number },
        options?: vuex.DispatchOptions
      ): Promise<void>
    }
    ```

  Users can use the store with Type prediction in Typescript when you cast the return value of Vuex.useStore() as StoreModuleype, like this:
    ```
    const store = vuex.useStore() as MakeStoreType<...>;
    const value: string = store.getters.get
    store.dispatch('put', { id: 0, value: 'foo' })
    ```
*/
export type MakeStoreType<S, G, M, A> = {
  getters: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [K in keyof G]: G[K] extends FuncType ? ReturnType<G[K]> : void
  }
} & {
  commit<K extends keyof M>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${K}`,
    payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never,
    options?: CommitOptions
  ): M[K] extends FuncType ? ReturnType<M[K]> : void
} & {
  dispatch<K extends keyof A>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${K}`,
    payload?: A[K] extends FuncType ? Parameters<A[K]>[1] : never,
    options?: DispatchOptions
  ): A[K] extends FuncType ? ReturnType<A[K]> : void
} & Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>

/*
  Create an alternative Store type for Vuex that supports module name.

  Generics types:
  * T: Module name
  * S: StateType
  * G: GettersType
  * M: MutationsType
  * A: ActionsType

  This type provides 'getters', 'commit', and 'dispatch' properties that support Vuex module.

  The 'getters' property will be...
  If you create GettersType as a input is:
    ```
    interface GettersType {
        get (state: StateType): string
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreModuleType<'boo', S, GettersType, M, A> = {
      getters: {
        ['boo/get']: number
      }
    }
    ```

  The 'commit' property will be...
  If you create MutationsType as a input is:
    ```
    interface MutationsType {
      put (state: StateType, payload: { id: number, value: string }): void
      delete (state: StateType, payload: { id: number }): void
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreModuleType<'boo', S, G, MutationsType, A> = {
      commit(
        key: 'boo/put',
        payload?: { id: number, value: string },
        options?: vuex.CommitOptions
      ): void
    } | {
      commit(
        key: 'boo/delete',
        payload?: { id: number },
        options?: vuex.CommitOptions
      ): void
    }
    ```

  The 'dispatch' property will be...
  If you create ActionsType as a input is:
    ```
    interface ActionsType {
      put (injectee: ActionsInjecteeTyp, payload: { id: number, value: string }): Promise<void>
      delete (injectee: ActionsInjecteeTyp, payload: { id: number }): Promise<void>
    }
    ```
  the output type is:
    ```
    type aStoreModuleType = MakeStoreModuleType<'boo', S, G, M, ActionsType> = {
      dispatch(
        key: 'boo/put',
        payload?: { id: number, value: string },
        options?: vuex.DispatchOptions
      ): Promise<void>
    } | {
      dispatch(
        key: 'boo/delete',
        payload?: { id: number },
        options?: vuex.DispatchOptions
      ): Promise<void>
    }
    ```

  Users can use the store with Type prediction in Typescript when you cast the return value of Vuex.useStore() as StoreModuleype, like this:
    ```
    const store = vuex.useStore() as MakeStoreModuleType<'boo', ...>;
    const value: string = store.getters['boo/get]
    store.dispatch('boo/put', { id: 0, value: 'foo' })
    ```
*/
export type MakeStoreModuleType<T extends string, S, G, M, A> = {
  getters: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [K in keyof G as `${T}/${K}`]: G[K] extends FuncType ? ReturnType<G[K]> : void
  }
} & {
  commit<K extends keyof M>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${T}/${K}`,
    payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never,
    options?: CommitOptions
  ): M[K] extends FuncType ? ReturnType<M[K]> : void
} & {
  dispatch<K extends keyof A>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    key: `${T}/${K}`,
    payload?: A[K] extends FuncType ? Parameters<A[K]>[1] : never,
    options?: DispatchOptions
  ): A[K] extends FuncType ? ReturnType<A[K]> : void
} & Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>

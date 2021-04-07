import type { Store as baseStore, CommitOptions, DispatchOptions, ActionContext } from 'vuex';
declare type FuncType = (...args: any) => any;
export declare type MakeStoreActionsInjecteeType<R, S, M> = {
    commit<K extends keyof M>(key: K, payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never): M[K] extends FuncType ? ReturnType<M[K]> : void;
} & Omit<ActionContext<S, R>, 'commit'>;
export declare type MakeStoreType<S, G, M, A> = {
    getters: {
        [K in keyof G]: G[K] extends FuncType ? ReturnType<G[K]> : void;
    };
} & {
    commit<K extends keyof M>(key: `${K}`, payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never, options?: CommitOptions): M[K] extends FuncType ? ReturnType<M[K]> : void;
} & {
    dispatch<K extends keyof A>(key: `${K}`, payload?: A[K] extends FuncType ? Parameters<A[K]>[1] : never, options?: DispatchOptions): A[K] extends FuncType ? ReturnType<A[K]> : void;
} & Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>;
export declare type MakeStoreModuleType<T extends string, S, G, M, A> = {
    getters: {
        [K in keyof G as `${T}/${K}`]: G[K] extends FuncType ? ReturnType<G[K]> : void;
    };
} & {
    commit<K extends keyof M>(key: `${T}/${K}`, payload?: M[K] extends FuncType ? Parameters<M[K]>[1] : never, options?: CommitOptions): M[K] extends FuncType ? ReturnType<M[K]> : void;
} & {
    dispatch<K extends keyof A>(key: `${T}/${K}`, payload?: A[K] extends FuncType ? Parameters<A[K]>[1] : never, options?: DispatchOptions): A[K] extends FuncType ? ReturnType<A[K]> : void;
} & Omit<baseStore<S>, 'getters' | 'commit' | 'dispatch'>;
export {};
//# sourceMappingURL=types.d.ts.map
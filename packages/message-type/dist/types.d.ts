declare type FuncType = (...args: any) => any;
declare type ArgumentTypes<T> = T extends (...args: infer U) => any ? U : never;
declare type ReturnExcludePromiseType<T extends FuncType> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;
declare type messageFromFunctionInterfaceType<F> = {
    [P in {
        [K in keyof F]: F[K] extends FuncType ? K : never;
    }[keyof F]]: {
        type: P;
        params: ArgumentTypes<F[P]>[0];
        response: ReturnExcludePromiseType<F[P]>;
    };
};
declare type messageUnionType<F> = messageFromFunctionInterfaceType<F>[keyof messageFromFunctionInterfaceType<F>];
export declare type MakeMessageType<F> = messageUnionType<F>;
declare type containerTypeType<T extends string> = {
    type: `${T}`;
};
declare type containerDataType<T, D> = {
    [P in T]: D;
};
export declare type MakeContainerType<T extends string, D> = containerTypeType<T> & containerDataType<T, D>;
export {};
//# sourceMappingURL=types.d.ts.map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncType = (...args: any) => any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgumentTypes<T> = T extends (...args: infer U) => any ? U : never
type ReturnExcludePromiseType<T extends FuncType> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>

type messageTypeType<T extends string> = {
  type: `${T}`
}

type messageDataObjectType<R> = {
  [P in {[K in keyof R]: R[K] extends FuncType ? K : never}[keyof R]]: {
    type: P,
    params: ArgumentTypes<R[P]>[0],
    response: ReturnExcludePromiseType<R[P]>
  }
}

type messageDataUnionType<R> = messageDataObjectType<R>[keyof messageDataObjectType<R>]

// R: RepositoryType
export type messageDataType<R> = messageDataUnionType<R>

type messageDataWrapperType<O, R> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [P in O]: messageDataType<R>
}

// T: Module type
// R: RepositoryType
export type messageType<T extends string, R> = messageTypeType<T> & messageDataWrapperType<T, R>

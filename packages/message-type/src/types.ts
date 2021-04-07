// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncType = (...args: any) => any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgumentTypes<T> = T extends (...args: infer U) => any ? U : never
type ReturnExcludePromiseType<T extends FuncType> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>

/*
  Create a message type to choose a function from an interface.

  Generics types:
  * F: A function interface

  If there is a following interface:
    ```
    interface IFunctoin {
      put (payload: { id: number, value: string }): Promise<{ id: number }>
      delete (payload: { id: number }): Promise<void>
    }
    ```

  the output type is:
  type aMessageType = MakeMessageType<IFunctoin>
  // Same as
  //   type aMessageType = {
  //     type: "put";
  //     params: {
  //       id: number;
  //       value: string;
  //     };
  //     response: {
  //       id: number
  //     };
  //   } | {
  //     type: "delete";
  //     params: {
  //       id: number;
  //     };
  //     response: void;
  //   }
*/
type messageFromFunctionInterfaceType<F> = {
  [P in { [K in keyof F]: F[K] extends FuncType ? K : never }[keyof F]]: {
    type: P
    params: ArgumentTypes<F[P]>[0]
    response: ReturnExcludePromiseType<F[P]>
  }
}

type messageUnionType<F> = messageFromFunctionInterfaceType<F>[keyof messageFromFunctionInterfaceType<F>]

export type MakeMessageType<F> = messageUnionType<F>

/*
  Create message container type.

  Generics types:
  * T: Message type (string)
  * D: Message data type (Any types are ok)

  type aContainerType = MakeContainerType<'foo', { name: string, age: number }>
  // Same as
  //   type aContainerType = {
  //     type: 'foo',
  //     foo: {
  //       name: string,
  //       age: number
  //     }
  //   }
*/
type containerTypeType<T extends string> = {
  type: `${T}`
}

type containerDataType<T, D> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [P in T]: D
}

export type MakeContainerType<T extends string, D> = containerTypeType<T> & containerDataType<T, D>

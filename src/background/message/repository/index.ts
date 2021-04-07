import type { Runtime } from 'webextension-polyfill-ts'
import type { repositoryMessageDataType } from './types'
import CounterDespatcher from './counter'
import MemosDespatcher from './memos'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (repository: repositoryMessageDataType, sender: Runtime.MessageSender): Promise<any> {
  switch (repository.type) {
    case 'counter': {
      return CounterDespatcher(repository.counter, sender)
    }
    case 'memos': {
      return MemosDespatcher(repository.memos, sender)
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS6133: 'req' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = repository
      throw new Error('Invalid store.')
    }
  }
}

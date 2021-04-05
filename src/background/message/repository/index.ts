import { repositoryMessageDataType } from './types'
import CounterDespatcher from './counter'
import MemosDespatcher from './memos'

export default function (
  repository: repositoryMessageDataType,
  sender: chrome.runtime.MessageSender,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse: (response?: any) => void
): void {
  switch (repository.type) {
    case 'counter': {
      void CounterDespatcher(repository.counter, sender, sendResponse)
      break
    }
    case 'memos': {
      void MemosDespatcher(repository.memos, sender, sendResponse)
      break
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

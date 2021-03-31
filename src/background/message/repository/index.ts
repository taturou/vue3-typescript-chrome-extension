import { repositoryMessageDataType } from './types'
import CounterDespatcher from './counter'
import MemosDespatcher from './memos'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (repository: repositoryMessageDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(repository.type) {
  case 'counter': {
    CounterDespatcher(repository.counter, sender, sendResponse)
    break
  }
  case 'memos': {
    MemosDespatcher(repository.memos, sender, sendResponse)
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = repository
    throw new Error('Invalid store.')
  }}
}

import { messageLocalStorageDataType } from './types'
import CounterDespatcher from './Counter'
import MemosDespatcher from './Memos'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (localStorage: messageLocalStorageDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(localStorage.type) {
  case 'counter': {
    CounterDespatcher(localStorage.counter, sender, sendResponse)
    break
  }
  case 'memos': {
    MemosDespatcher(localStorage.memos, sender, sendResponse)
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = localStorage
    throw new Error('Invalid store.')
  }}
}

import { messageLocalStorageDataType } from '@/lib/message/LocalStorage/types'
import counterDespatcher from './Counter'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (localStorage: messageLocalStorageDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(localStorage.type) {
  case 'counter': {
    counterDespatcher(localStorage.counter, sender, sendResponse)
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = localStorage.type
    throw new Error('Invalid store.')
  }}
}

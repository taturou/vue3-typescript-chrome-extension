import { backgroundMessageType } from './types'
import repositoryDespatcher from './repository'

export function addListener(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chrome.runtime.onMessage.addListener((message: backgroundMessageType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): boolean => {
    switch(message.type) {
    case 'repository': {
      repositoryDespatcher(message.repository, sender, sendResponse)
      break
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS6133: 'req' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = message.type
      throw new Error('Invalid message.')
    }}
    return true
  })
}

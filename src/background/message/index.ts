import { backgroundMessageType } from './types'
import localStorageDespatcher from './LocalStorage'

export function addListener(): void {
  chrome.runtime.onInstalled.addListener(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chrome.runtime.onMessage.addListener((message: backgroundMessageType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void => {
      switch(message.type) {
      case 'localStorage': {
        localStorageDespatcher(message.localStorage, sender, sendResponse)
        break
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dummy: never = message.type
        throw new Error('Invalid message.')
      }}
    })
  })
}

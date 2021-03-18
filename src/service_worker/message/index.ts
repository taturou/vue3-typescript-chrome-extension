import { messageType } from '@/lib/message/types'
import localStorageDespatcher from './LocalStorage'

export function addListener(): void {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.onMessage.addListener((message: messageType, sender, sendResponse): void => {
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
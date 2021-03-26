import * as message from './message'

chrome.runtime.onInstalled.addListener(() => {
  message.addListener()
})

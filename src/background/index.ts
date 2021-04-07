import { browser } from 'webextension-polyfill-ts'
import * as message from './message'

browser.runtime.onInstalled.addListener(() => {
  message.addListener()
})

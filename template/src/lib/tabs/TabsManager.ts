import { browser } from 'webextension-polyfill-ts'
import type { Tabs } from 'webextension-polyfill-ts'

export class TabsManager {
  private tabIds: Set<number>

  constructor() {
    this.tabIds = new Set()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    browser.tabs.onRemoved.addListener((tabId: number, _removeInfo: Tabs.OnRemovedRemoveInfoType): void => {
      this.deleteTabId(tabId)
    })
  }

  addTabId(tabId: number): void {
    this.tabIds.add(tabId)
  }

  deleteTabId(tabId: number): void {
    this.tabIds.delete(tabId)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  broadcastMessage(message: any, responseCallback?: (response: any) => void): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function sendMessage(tabId: number, message: any, callback?: (response: any) => void): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await browser.tabs.sendMessage(tabId, message)
      if (callback) {
        callback(response)
      }
    }

    this.tabIds.forEach((tabId) => {
      void sendMessage(tabId, message, responseCallback)
    })
  }
}

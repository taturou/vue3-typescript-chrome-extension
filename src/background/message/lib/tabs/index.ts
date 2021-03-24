import { tabsType } from '@/background/message/lib/tabs/types'

export class Tabs {
  private tabIds: Set<number>

  constructor() {
    this.tabIds = new Set()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chrome.tabs.onRemoved.addListener((tabId: number, _removeInfo) => {
      this.deleteTabId(tabId)
    })
  }

  addTabId (tabId: number): void {
    this.tabIds.add(tabId)
  }

  deleteTabId (tabId: number): void {
    this.tabIds.delete(tabId)
  }

  broadcastMessageToAllTabs (message: tabsType): void {
    this.tabIds.forEach((tabId) => {
      chrome.tabs.sendMessage(
        tabId,
        message,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
    })
  }
}

export class TabsManager {
  private tabIds: Set<number>

  constructor() {
    this.tabIds = new Set()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    chrome.tabs.onRemoved.addListener((tabId: number, _removeInfo) => {
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
    this.tabIds.forEach((tabId) => {
      chrome.tabs.sendMessage(tabId, message, responseCallback)
    })
  }
}

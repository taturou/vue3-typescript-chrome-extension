export function getCurrent(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.getCurrent((tab) => {
      resolve(tab as chrome.tabs.Tab)
    })
  })
}

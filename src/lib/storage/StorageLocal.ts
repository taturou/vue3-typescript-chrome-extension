import { StorageType } from './types'

type onChangedCallback = (
  changes: { [key: string]: chrome.storage.StorageChange },
  areaName: 'sync' | 'local' | 'managed'
) => void

class Storage implements StorageType {
  // Required
  get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chrome.storage.local.get(key, (items: { [key: string]: any }): void => {
        if (key in items) {
          resolve(items[key] as T)
        } else {
          resolve(null)
        }
      })
    })
  }

  set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve()
      })
    })
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, (): void => {
        resolve()
      })
    })
  }

  clear(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.clear((): void => {
        resolve()
      })
    })
  }

  // Optional
  onChanged_addListener(callback: onChangedCallback): void {
    chrome.storage.onChanged.addListener(callback)
  }

  onChanged_removeListener(callback: onChangedCallback): void {
    chrome.storage.onChanged.removeListener(callback)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): Promise<any> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chrome.storage.local.get((items: { [key: string]: any }): void => {
        resolve(items)
      })
    })
  }

  getBytesInUse(keys: string | string[] | null = null): Promise<number> {
    return new Promise((resolve) => {
      chrome.storage.local.getBytesInUse(keys, (bytesInUse: number): void => {
        resolve(bytesInUse)
      })
    })
  }
}

export default Storage

import type { StorageType } from './types'
import { browser } from 'webextension-polyfill-ts'

export default class Storage implements StorageType {
  async get<T>(key: string): Promise<T | null> {
    const item = await browser.storage.local.get(key)
    return item[key] ? (item[key] as T) : null
  }

  async set<T>(key: string, value: T): Promise<void> {
    await browser.storage.local.set({ [key]: value })
  }

  async remove(key: string): Promise<void> {
    await browser.storage.local.remove(key)
  }

  async clear(): Promise<void> {
    await browser.storage.local.clear()
  }
}

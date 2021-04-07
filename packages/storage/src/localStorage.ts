import type { StorageType } from './types'

export default class Storage implements StorageType {
  get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      const json = localStorage.getItem(key)
      if (json) {
        resolve(JSON.parse(json))
      } else {
        resolve(null)
      }
    })
  }

  set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value))
      resolve()
    })
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(key)
      resolve()
    })
  }

  clear(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.clear()
      resolve()
    })
  }
}

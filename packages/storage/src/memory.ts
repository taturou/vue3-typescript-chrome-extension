import type { StorageType } from './types'

class Storage implements StorageType {
  private data: Record<string, unknown>

  constructor() {
    this.data = {}
  }

  get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      if (key in this.data) {
        resolve(this.data[key] as T)
      } else {
        resolve(null)
      }
    })
  }

  set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      this.data[key] = value
      resolve()
    })
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      delete this.data[key]
      resolve()
    })
  }

  clear(): Promise<void> {
    return new Promise((resolve) => {
      this.data = {}
      resolve()
    })
  }
}

export default Storage

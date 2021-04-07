export interface StorageType {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any
}

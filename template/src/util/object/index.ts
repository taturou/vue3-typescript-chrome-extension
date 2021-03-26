// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function migrate<T>(oldValue: any, newValue: T): T {
  for (const key in newValue) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (typeof oldValue[key] === 'undefined') {
      const val = newValue[key]
      if (Array.isArray(val)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        oldValue[key] = Array.from(val)
      } else if (typeof val === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        oldValue[key] = Object.create(val as any)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        oldValue[key] = val
      }
    }
  }
  return oldValue as T
}
// eslint-enable no-unsafe-member-access

import { messageCounterType } from './Counter/types'

export type messageLocalStorageDataType = messageCounterType

export type messageLocalStorageType = {
  type: 'localStorage',
  localStorage: messageLocalStorageDataType
}

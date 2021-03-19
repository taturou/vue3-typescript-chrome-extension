import { messageCounterType } from './Counter/types'
import { messageMemosType } from './Memos/types'

export type messageLocalStorageDataType = messageCounterType | messageMemosType

export type messageLocalStorageType = {
  type: 'localStorage',
  localStorage: messageLocalStorageDataType
}

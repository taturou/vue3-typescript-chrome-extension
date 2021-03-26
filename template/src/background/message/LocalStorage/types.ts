import { messageType } from '@/background/message/_types'
import { counterMessageType } from './Counter/types'
import { memosMessageType } from './Memos/types'

export type localStorageMessageDataType = counterMessageType | memosMessageType
export type localStorageMessageType = messageType<'localStorage', localStorageMessageDataType>

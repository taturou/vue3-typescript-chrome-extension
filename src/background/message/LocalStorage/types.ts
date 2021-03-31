import { messageType } from '@/background/message/_types'
import { counterMessageType } from './counter/types'
import { memosMessageType } from './memos/types'

export type localStorageMessageDataType = counterMessageType | memosMessageType
export type localStorageMessageType = messageType<'localStorage', localStorageMessageDataType>

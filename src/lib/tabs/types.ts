import { messageType } from '@/background/message/_types'
import { counterMessageType } from '@/background/message/LocalStorage/Counter/types'
import { memosMessageType } from '@/background/message/LocalStorage/Memos/types'

export type tabsMessageDataType = counterMessageType | memosMessageType
export type tabsMessageType = messageType<'tabs', tabsMessageDataType>

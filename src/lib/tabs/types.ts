import { messageType } from '@/background/message/_types'
import { counterMessageType } from '@/background/message/LocalStorage/counter/types'
import { memosMessageType } from '@/background/message/LocalStorage/memos/types'

export type tabsMessageDataType = counterMessageType | memosMessageType
export type tabsMessageType = messageType<'tabs', tabsMessageDataType>

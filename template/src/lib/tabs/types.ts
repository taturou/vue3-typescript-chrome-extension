import { messageType } from '@/background/message/_types'
import { counterMessageType } from '@/background/message/repository/counter/types'
import { memosMessageType } from '@/background/message/repository/memos/types'

export type tabsMessageDataType = counterMessageType | memosMessageType
export type tabsMessageType = messageType<'tabs', tabsMessageDataType>

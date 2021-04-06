import type { messageType } from '@/background/message/_types'
import type { counterMessageType } from '@/background/message/repository/counter/types'
import type { memosMessageType } from '@/background/message/repository/memos/types'

export type tabsMessageDataType = counterMessageType | memosMessageType
export type tabsMessageType = messageType<'tabs', tabsMessageDataType>

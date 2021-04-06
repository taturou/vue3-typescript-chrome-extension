import type { messageType, messageDataType } from '@/background/message/_types'
import type { RepositoryType } from '@/lib/repository/counter/types'

export type counterMessageDataType = messageDataType<RepositoryType>
export type counterMessageType = messageType<'counter', counterMessageDataType>

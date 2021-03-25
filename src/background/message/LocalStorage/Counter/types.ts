import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/Counter/types'

export type counterMessageDataType = messageDataType<RepositoryType>
export type counterMessageType = messageType<'counter', counterMessageDataType>

import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/Counter/types'

export type counterDataType = messageDataType<RepositoryType>
export type counterType = messageType<'counter', counterDataType>

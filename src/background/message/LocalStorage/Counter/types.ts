import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/Counter/types'

export type messageCounterDataType = messageDataType<RepositoryType>
export type messageCounterType = messageType<'counter', RepositoryType>

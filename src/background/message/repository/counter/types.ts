import type { MakeContainerType, MakeMessageType } from 'message-type'
import type { RepositoryType } from '@/lib/repository/counter/types'

export type counterMessageDataType = MakeMessageType<RepositoryType>
export type counterMessageType = MakeContainerType<'counter', counterMessageDataType>

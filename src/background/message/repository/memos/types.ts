import type { MakeContainerType, MakeMessageType } from 'message-type'
import type { RepositoryType } from '@/lib/repository/memos/types'

export type memosMessageDataType = MakeMessageType<RepositoryType>
export type memosMessageType = MakeContainerType<'memos', memosMessageDataType>

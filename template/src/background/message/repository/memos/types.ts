import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/memos/types'

export type memosMessageDataType = messageDataType<RepositoryType>
export type memosMessageType = messageType<'memos', memosMessageDataType>

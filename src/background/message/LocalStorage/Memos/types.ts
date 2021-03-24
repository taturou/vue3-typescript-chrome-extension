import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/Memos/types'

export type memosDataType = messageDataType<RepositoryType>
export type memosType = messageType<'memos', memosDataType>

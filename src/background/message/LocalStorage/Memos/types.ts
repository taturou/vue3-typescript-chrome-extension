import { messageType, messageDataType } from '@/background/message/_types'
import { RepositoryType } from '@/lib/repository/Memos/types'

export type messageMemosDataType = messageDataType<RepositoryType>
export type messageMemosType = messageType<'memos', RepositoryType>

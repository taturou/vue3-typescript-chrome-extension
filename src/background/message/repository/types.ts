import { messageType } from '@/background/message/_types'
import { counterMessageType } from './counter/types'
import { memosMessageType } from './memos/types'

export type repositoryMessageDataType = counterMessageType | memosMessageType
export type repositoryMessageType = messageType<'repository', repositoryMessageDataType>

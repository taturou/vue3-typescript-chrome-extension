import type { messageType } from '@/background/message/_types'
import type { counterMessageType } from './counter/types'
import type { memosMessageType } from './memos/types'

export type repositoryMessageDataType = counterMessageType | memosMessageType
export type repositoryMessageType = messageType<'repository', repositoryMessageDataType>

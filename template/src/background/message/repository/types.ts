import type { MakeContainerType } from 'message-type'
import type { counterMessageType } from './counter/types'
import type { memosMessageType } from './memos/types'

export type repositoryMessageDataType = counterMessageType | memosMessageType
export type repositoryMessageType = MakeContainerType<'repository', repositoryMessageDataType>

import { messageType } from '@/background/message/_types'
import { counterType } from './Counter/types'
import { memosType } from './Memos/types'

export type localStorageDataType = counterType | memosType
export type localStorageType = messageType<'localStorage', localStorageDataType>

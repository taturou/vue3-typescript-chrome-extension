import { messageType } from '@/background/message/_types'
import { counterType } from '../../LocalStorage/Counter/types'
import { memosType } from '../../LocalStorage/Memos/types'

export type tabsDataType = counterType | memosType
export type tabsType = messageType<'tabs', tabsDataType>

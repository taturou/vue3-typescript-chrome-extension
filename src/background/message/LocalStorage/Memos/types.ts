import { StateType } from '@/lib/store/Memos/types'

export type messageMemosFetchType = {
  type: 'fetch'
  response: {
    state: StateType
  }
}

export type messageMemosAddType = {
  type: 'add'
  params: {
    content: string
  },
  response: {
    state: StateType
  }
}

export type messageMemosDeleteByIdType = {
  type: 'deleteById'
  params: {
    id: number
  },
  response: {
    state: StateType
  }
}

export type messageMemosDataType = messageMemosFetchType | messageMemosAddType | messageMemosDeleteByIdType

export type messageMemosType = {
  type: 'memos',
  counter: messageMemosDataType
}

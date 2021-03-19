import { StateType } from '@/lib/store/Counter/types'

export type messageCounterFetchType = {
  type: 'fetch'
  response: {
    state: StateType
  }
}

export type messageCounterCountType = {
  type: 'count'
  response: {
    count: number
  }
}

export type messageCounterSetCountType = {
  type: 'setCount'
  params: {
    value: number
  },
  response: {
    count: number
  }
}

export type messageCounterDataType = messageCounterFetchType | messageCounterCountType | messageCounterSetCountType

export type messageCounterType = {
  type: 'counter',
  counter: messageCounterDataType
}

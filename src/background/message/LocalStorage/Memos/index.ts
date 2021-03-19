import { messageMemosDataType } from './types'
import { MemoType, StateType } from '@/lib/store/Memos/types'
import { migrate as objectMigrate } from '@/lib/object'

const KEY = 'memos'

const defaultState: StateType = {
  maxId: 0,
  memos: []
}

function fetch (): StateType {
  let state = {}
  const json = localStorage.getItem(KEY)
  if (json) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-explicit-any
    state = objectMigrate(JSON.parse(json) as any, defaultState)
  } else {
    Object.assign(state, defaultState)
    localStorage.setItem(KEY, JSON.stringify(state))
  }
  return state as StateType
}

function add (content: string): StateType {
  const state = fetch()
  state.maxId += 1
  const memo: MemoType = {
    id: state.maxId,
    content: content,
    createdAt: new Date().toISOString()
  }
  state.memos.push(memo)
  localStorage.setItem(KEY, JSON.stringify(state))
  return state
}

function deleteById (id: number): StateType {
  const state = fetch()
  state.memos = state.memos.filter((memo) => {
    return memo.id !== id
  })
  localStorage.setItem(KEY, JSON.stringify(state))
  return state
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (memos: messageMemosDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(memos.type) {
  case 'fetch': {
    memos.response.state = fetch()
    sendResponse(memos.response.state)
    break
  }
  case 'add': {
    memos.response.state = add(memos.params.content)
    sendResponse(memos.response.state)
    break
  }
  case 'deleteById': {
    memos.response.state = deleteById(memos.params.id)
    sendResponse(memos.response.state)
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = memos
    throw new Error('Invalid counter.')
  }}
}

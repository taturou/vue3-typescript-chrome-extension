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

// 2nd return value is the index of the MemoType.memo[] that was added.
function add (payload: { content: string }): [StateType, number] {
  const state = fetch()
  state.maxId += 1
  const memo: MemoType = {
    id: state.maxId,
    content: payload.content,
    createdAt: new Date().toISOString()
  }
  state.memos.push(memo)
  localStorage.setItem(KEY, JSON.stringify(state))
  return [state, state.memos.length - 1]
}

function deleteById (payload: { id: number }): StateType {
  const state = fetch()
  state.memos = state.memos.filter((memo) => {
    return memo.id !== payload.id
  })
  localStorage.setItem(KEY, JSON.stringify(state))
  return state
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (memos: messageMemosDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(memos.type) {
  case 'fetch': {
    memos.response = fetch()
    sendResponse(memos.response)
    break
  }
  case 'add': {
    memos.response = add(memos.params)
    sendResponse({ state: memos.response[0], index: memos.response[1] })
    break
  }
  case 'deleteById': {
    memos.response = deleteById(memos.params)
    sendResponse(memos.response)
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = memos
    throw new Error('Invalid counter.')
  }}
}

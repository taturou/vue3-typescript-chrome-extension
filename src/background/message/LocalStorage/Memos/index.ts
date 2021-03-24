import { memosDataType } from './types'
import { tabsType } from '@/background/message/lib/tabs/types'
import { Tabs } from '@/background/message/lib/tabs'
import { MemoType, StateType } from '@/lib/store/Memos/types'
import { migrate as objectMigrate } from '@/util/object'

const KEY = 'memos'

const defaultState: StateType = {
  maxId: 0,
  memos: []
}

const tabs = new Tabs()

function broadcastFetchToAllTabs() {
  tabs.broadcastMessageToAllTabs(
    {
      type: 'tabs',
      tabs: {
        type: 'memos',
        memos: {
          type: 'fetch'
        }
      }
    } as tabsType
  )
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
  const now = new Date().toISOString()
  const memo: MemoType = {
    id: state.maxId,
    content: payload.content,
    createdAt: now,
    modifiedAt: now
  }
  state.memos.push(memo)
  localStorage.setItem(KEY, JSON.stringify(state))
  return [state, state.memos.length - 1]
}

function updateById (payload: { id: number, content: string }): StateType {
  const state = fetch()
  state.memos
    .filter((memo) => { return memo.id === payload.id })
    .map((memo) => {
      memo.content = payload.content
      memo.modifiedAt = new Date().toISOString()
    })
  localStorage.setItem(KEY, JSON.stringify(state))
  return state
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
export default function (memos: memosDataType, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(memos.type) {
  case 'fetch': {
    if (memos.tab) { tabs.addTabId(memos.tab.id) }
    memos.response = fetch()
    sendResponse(memos.response)
    break
  }
  case 'add': {
    memos.response = add(memos.params)
    sendResponse({ state: memos.response[0], index: memos.response[1] })
    broadcastFetchToAllTabs()
    break
  }
  case 'updateById': {
    memos.response = updateById(memos.params)
    sendResponse(memos.response)
    broadcastFetchToAllTabs()
    break
  }
  case 'deleteById': {
    memos.response = deleteById(memos.params)
    sendResponse(memos.response)
    broadcastFetchToAllTabs()
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = memos
    throw new Error('Invalid counter.')
  }}
}

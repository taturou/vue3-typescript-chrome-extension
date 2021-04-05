import { memosMessageDataType } from './types'
import { MemoType, StateType } from '@/lib/store/memos/types'
import { tabsMessageType } from '@/lib/tabs/types'
import { Storage } from '@/lib/storage'
import { TabsManager } from '@/lib/tabs'
import { migrate as objectMigrate } from '@/util/object'

const KEY = 'memos'

const defaultState: StateType = {
  maxId: 0,
  memos: []
}

const storage = Storage()
const tabs = new TabsManager()

function broadcastFetchToAllTabs() {
  tabs.broadcastMessage({
    type: 'tabs',
    tabs: {
      type: 'memos',
      memos: {
        type: 'fetch'
      }
    }
  } as tabsMessageType)
}

async function fetch(): Promise<StateType> {
  let state = await storage.get<StateType>(KEY)
  if (state) {
    state = objectMigrate(state, defaultState)
    return state
  } else {
    const state = JSON.parse(JSON.stringify(defaultState)) as StateType
    await storage.set(KEY, state)
    return state
  }
}

// 2nd return value is the index of the MemoType.memo[] that was added.
async function add(payload: { content: string }): Promise<{ state: StateType; addedIndex: number | null }> {
  const state = await fetch()
  state.maxId += 1
  const now = new Date().toISOString()
  const memo: MemoType = {
    id: state.maxId,
    content: payload.content,
    createdAt: now,
    modifiedAt: now
  }
  state.memos.push(memo)
  await storage.set(KEY, state)
  return { state: state, addedIndex: state.memos.length - 1 }
}

async function updateById(payload: {
  id: number
  content: string
}): Promise<{ state: StateType; updatedIndex: number | null }> {
  const state = await fetch()
  const index = state.memos.findIndex((memo) => {
    return memo.id === payload.id
  })
  const memo = state.memos[index]
  if (memo) {
    memo.content = payload.content
    memo.modifiedAt = new Date().toISOString()
    await storage.set(KEY, state)
    return { state: state, updatedIndex: index }
  } else {
    return { state: state, updatedIndex: null }
  }
}

async function deleteById(payload: { id: number }): Promise<{ state: StateType; success: boolean }> {
  const state = await fetch()
  const index = state.memos.findIndex((memo) => {
    return memo.id === payload.id
  })
  if (index >= 0) {
    state.memos = state.memos.filter((memo) => {
      return memo.id !== payload.id
    })
    await storage.set(KEY, state)
    return { state: state, success: true }
  } else {
    return { state: state, success: false }
  }
}

export default async function (
  memos: memosMessageDataType,
  sender: chrome.runtime.MessageSender,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse: (response?: any) => void
): Promise<void> {
  switch (memos.type) {
    case 'fetch': {
      if (sender.tab?.id) {
        tabs.addTabId(sender.tab.id)
      }
      memos.response = await fetch()
      sendResponse(memos.response)
      break
    }
    case 'add': {
      memos.response = await add(memos.params)
      sendResponse(memos.response)
      broadcastFetchToAllTabs()
      break
    }
    case 'updateById': {
      memos.response = await updateById(memos.params)
      sendResponse(memos.response)
      broadcastFetchToAllTabs()
      break
    }
    case 'deleteById': {
      memos.response = await deleteById(memos.params)
      sendResponse(memos.response)
      broadcastFetchToAllTabs()
      break
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS6133: 'req' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = memos
      throw new Error('Invalid counter.')
    }
  }
}

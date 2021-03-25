import { counterMessageDataType } from './types'
import { StateType } from '@/lib/store/Counter/types'
import { tabsMessageType } from '@/lib/tabs/types'
import { TabsManager } from '@/lib/tabs'
import { migrate as objectMigrate } from '@/util/object'

const KEY = 'counter'

const defaultState: StateType = {
  count: 0
}

const tabs = new TabsManager()

function broadcastFetchToAllTabs() {
  tabs.broadcastMessage(
    {
      type: 'tabs',
      tabs: {
        type: 'counter',
        counter: {
          type: 'fetch'
        }
      }
    } as tabsMessageType
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

function setCount (payload: { count: number }): number {
  const state = fetch()
  state.count = payload.count
  localStorage.setItem(KEY, JSON.stringify(state))
  return state.count
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (counter: counterMessageDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
  switch(counter.type) {
  case 'fetch': {
    if (sender.tab?.id) { tabs.addTabId(sender.tab.id) }
    counter.response = fetch()
    sendResponse(counter.response)
    break
  }
  case 'setCount': {
    counter.response = setCount(counter.params)
    sendResponse(counter.response)
    broadcastFetchToAllTabs()
    break
  }
  default: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy: never = counter
    throw new Error('Invalid counter.')
  }}
}

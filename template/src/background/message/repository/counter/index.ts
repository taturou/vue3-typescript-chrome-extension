import { counterMessageDataType } from './types'
import { StateType } from '@/lib/store/counter/types'
import { tabsMessageType } from '@/lib/tabs/types'
import { Storage } from '@/lib/storage'
import { TabsManager } from '@/lib/tabs'
import { migrate as objectMigrate } from '@/util/object'

const KEY = 'counter'

const defaultState: StateType = {
  count: 0,
  max: 100,
  min: 0
}

const storage = Storage()
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

async function fetch (): Promise<StateType> {
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

async function setCount (payload: { count: number }): Promise<number> {
  const state = await fetch()
  state.count = payload.count
  await storage.set(KEY, state)
  return state.count
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (counter: counterMessageDataType, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): Promise<void> {
  switch(counter.type) {
  case 'fetch': {
    if (sender.tab?.id) { tabs.addTabId(sender.tab.id) }
    counter.response = await fetch()
    sendResponse(counter.response)
    break
  }
  case 'setCount': {
    counter.response = await setCount(counter.params)
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

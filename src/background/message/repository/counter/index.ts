import type { Runtime } from 'webextension-polyfill-ts'
import type { counterMessageDataType } from './types'
import type { StateType } from '@/lib/store/counter/types'
import type { tabsMessageType } from '@/lib/tabs/types'
import { StorageFactory } from 'storage'
import { TabsManager } from '@/lib/tabs'
import { migrate as objectMigrate } from '@/util/object'

const KEY = 'counter'

const defaultState: StateType = {
  count: 0,
  max: 100,
  min: 0
}

const storage = (() => {
  if (process.env.REPO_ENV === 'mock') {
    return StorageFactory('memory')
  } else {
    return StorageFactory('localStorage')
  }
})()
const tabs = new TabsManager()

function broadcastFetchToAllTabs() {
  tabs.broadcastMessage({
    type: 'tabs',
    tabs: {
      type: 'counter',
      counter: {
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

async function setCount(payload: { count: number }): Promise<number> {
  const state = await fetch()
  state.count = payload.count
  await storage.set(KEY, state)
  return state.count
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (counter: counterMessageDataType, sender: Runtime.MessageSender): Promise<any> {
  switch (counter.type) {
    case 'fetch': {
      if (sender.tab?.id) {
        tabs.addTabId(sender.tab.id)
      }
      counter.response = await fetch()
      return counter.response
    }
    case 'setCount': {
      counter.response = await setCount(counter.params)
      broadcastFetchToAllTabs()
      return counter.response
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS6133: 'req' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = counter
      throw new Error('Invalid counter.')
    }
  }
}

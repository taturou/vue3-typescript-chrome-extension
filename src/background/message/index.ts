import { browser } from 'webextension-polyfill-ts'
import type { Runtime } from 'webextension-polyfill-ts'
import type { backgroundMessageType } from './types'
import repositoryDespatcher from './repository'

export function addListener(): void {
  browser.runtime.onMessage.addListener(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (message: backgroundMessageType, sender: Runtime.MessageSender): Promise<any> => {
      switch (message.type) {
        case 'repository': {
          return repositoryDespatcher(message.repository, sender)
        }
        default: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TS6133: 'req' is declared but its value is never read.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _: never = message.type
          throw new Error('Invalid message.')
        }
      }
    }
  )
}

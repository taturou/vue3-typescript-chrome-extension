<template lang="pug">
#counter
  p Count: {{ counter }}
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { browser } from 'webextension-polyfill-ts'
import type { Runtime } from 'webextension-polyfill-ts'
import { useStore } from '@/lib/store'
import type { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup() {
    const store = useStore()
    const counter = computed(() => {
      return store.getters['counter/count']
    })

    const fetchByEventFromBackground = (message: tabsMessageType, _sender: Runtime.MessageSender): void => {
      if (message.type === 'tabs') {
        if (message.tabs.type === 'counter') {
          if (message.tabs.counter.type === 'fetch') {
            store.dispatch('counter/fetch')
          }
        }
      }
    }

    onBeforeMount(() => {
      store.dispatch('counter/fetch')
      browser.runtime.onMessage.addListener(fetchByEventFromBackground)
    })

    onBeforeUnmount(() => {
      browser.runtime.onMessage.removeListener(fetchByEventFromBackground)
    })

    return {
      counter
    }
  }
})
</script>

<style lang="scss" scoped>
#counter {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>

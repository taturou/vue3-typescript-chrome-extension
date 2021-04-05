<template lang="pug">
#counter
  el-progress(:text-inside='true', :stroke-width='30', :percentage='counter')
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup() {
    const store = useStore()
    const counter = computed(() => {
      return store.getters['counter/count']
    })

    const fetchByEventFromBackground = (
      message: tabsMessageType,
      _sender: any,
      sendResponse: (response?: any) => void
    ): boolean => {
      if (message.type === 'tabs') {
        if (message.tabs.type === 'counter') {
          if (message.tabs.counter.type === 'fetch') {
            store.dispatch('counter/fetch')
          }
        }
      }
      sendResponse()
      return true
    }

    onBeforeMount(() => {
      store.dispatch('counter/fetch')
      chrome.runtime.onMessage.addListener(fetchByEventFromBackground)
    })

    onBeforeUnmount(() => {
      chrome.runtime.onMessage.removeListener(fetchByEventFromBackground)
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

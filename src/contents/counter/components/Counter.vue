<template lang="pug">
.counter
  Collapse(:expand='collapseExpand')
    .contents
      span Count: {{ counter }}
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { tabsMessageType } from '@/lib/tabs/types'
import Collapse from '@/lib/components/Collapse/index.vue'
import { CollapseExpandType } from '@/lib/components/Collapse/types'

export default defineComponent({
  setup() {
    // Collapse
    const collapseExpand: CollapseExpandType = 'right2left'

    // Counter
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

    // Lifecycle event
    onBeforeMount(() => {
      store.dispatch('counter/fetch')
      chrome.runtime.onMessage.addListener(fetchByEventFromBackground)
    })

    onBeforeUnmount(() => {
      chrome.runtime.onMessage.removeListener(fetchByEventFromBackground)
    })

    return {
      collapseExpand,
      counter
    }
  },
  components: {
    Collapse
  }
})
</script>

<style lang="scss" scoped>
div.counter {
  margin: 0;
  padding: 0;

  div.contents {
    margin: 0;
    padding: 10px 20px;
  }
}
</style>

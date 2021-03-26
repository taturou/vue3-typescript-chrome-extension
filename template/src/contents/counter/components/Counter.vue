<template lang="pug">
div.counter
  Collapse(
    :expand="collapseExpand"
  )
    div.contents
      span Count: {{ counter }}
</template>

<script lang='ts'>
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { tabsMessageType } from '@/lib/tabs/types'
import Collapse, { CollapseExpandType } from '@/lib/components/Collapse.vue'

export default defineComponent({
  setup() {
    // Collapse
    const collapseExpand: CollapseExpandType = 'right2left'

    // Counter
    const store = useStore()
    const counter = computed(() => {
      return store.getters['counter/count']
    })

    const fetchByEventFromBackground = (message: tabsMessageType, _sender: any, sendResponse: (response?: any) => void) => {
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

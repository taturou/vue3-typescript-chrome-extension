<template lang="pug">
div#counter
  p-button(
    icon="pi pi-arrow-right"
    :class="{ invisible: visibleSidebar }"
    @click="onOpenSidebar"
  )

  p-sidebar#vue3-typescript-chrome-extension-sidebar(
    v-model:visible="visibleSidebar"
    :baseZIndex="1000000006"
    :showCloseIcon="true"
    position="left"
  )
    h1 {{ title }}
    p-progress-bar(
      :value="counter"
    ) {{ counter }}
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup() {
    const store = useStore()

    // Sidebar
    const visibleSidebar = ref(false)
    const title = process.env.APP_NAME

    const counter = computed(() => {
      return store.getters['counter/count']
    })

    // opener
    const onOpenSidebar = () => {
      visibleSidebar.value = true
    }

    // store
    const fetchByEventFromBackground = (message: tabsMessageType, _sender: any, sendResponse: (response?: any) => void): boolean => {
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
      visibleSidebar,
      title,
      counter,
      onOpenSidebar
    }
  }
})
</script>

<style lang="scss" scoped>
div.counter {
  margin: 0;
  padding: 0;

  .el-button {
    display: block;

    &.invisible {
      display: none;
    }
  }
}

::v-global(#vue3-typescript-chrome-extension-sidebar) {
  width: 50%;
}
</style>

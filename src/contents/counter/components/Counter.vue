<template lang="pug">
div#counter
  el-button(
    icon="el-icon-caret-right"
    size="mini"
    :class="{ invisible: visibleDrawer }"
    @click="onOpenDrawer"
  )

el-drawer(
  :title="title"
  v-model="visibleDrawer"
  :append-to-body="true"
  :destroy-on-close="true"
  direction="ltr"
  size="50%"
)
  el-progress(
    :text-inside="true"
    :stroke-width="30"
    :percentage="counter"
  )
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup() {
    const store = useStore()

    // drawer
    const visibleDrawer = ref(false)
    const title = process.env.APP_NAME

    const counter = computed(() => {
      return store.getters['counter/count']
    })

    // opner
    const onOpenDrawer = () => {
      visibleDrawer.value = true
    }

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
      visibleDrawer,
      title,
      counter,
      onOpenDrawer
    }
  }
})
</script>

<style lang="scss" scoped>
#counter {
  margin: 0;
  padding: 0;

  .el-button {
    display: block;

    &.invisible {
      display: none;
    }
  }
}
</style>

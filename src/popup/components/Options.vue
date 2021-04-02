<template lang="pug">
div#options
  el-button(
    @click="onOpenOptions"
  ) Options page
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const onOpenOptions = (e: MouseEvent) => {
      chrome.tabs.create({
        // This is for chrome-extension tab
        // url: 'chrome://extensions/?options=' + chrome.runtime.id
        // This is for new tab
        url: `chrome-extension://${chrome.runtime.id}/options/index.html`
      })
    }

    return {
      onOpenOptions
    }
  }
})
</script>

<style lang="scss" scoped>
div#options {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 10px;

  .el-button {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>

<template lang="pug">
div.container
  div.title Options
  button(
    @click="onOpenOptions"
  ) Open
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
div.container {
  display: flex;
  flex-direction: column;

  div.title {
    font-size: 1em;
    font-weight: lighter;
    padding: 5px 20px;
    margin: 0px;
  }

  button {
    margin: 5px;
  }
}
</style>

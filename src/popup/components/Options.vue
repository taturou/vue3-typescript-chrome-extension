<template lang="pug">
#options
  .contents
    p-button.p-button-text.p-button-raised(label='Options page', @click='onOpenOptions')
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const onOpenOptions = (_event: MouseEvent) => {
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
#options {
  margin: 0;
  padding: 10px;

  .contents {
    background: white;

    .p-button {
      width: 100%;
    }
  }
}
</style>

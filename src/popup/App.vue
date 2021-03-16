<template lang="pug">
div.container
  h1 {{ title }}
  div.button(
    @click="onOpenOptions"
  ) Options
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const title = process.env.APP_NAME

    const onOpenOptions = (e: MouseEvent) => {
      chrome.tabs.create({
        url: 'chrome://extensions/?options=' + chrome.runtime.id
      })
    }

    return {
      title,
      onOpenOptions
    }
  }
})
</script>

<style lang="scss" scoped>
div.container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0px;
    padding: 5px 20px;
    font-size: 1.5em;
    font-weight: lighter;
    white-space: nowrap;
    border-bottom: 1px solid gray;
  }

  div.button {
    white-space: nowrap;
    font-size: 1em;
    padding: 5px 20px;
    font-weight: lighter;
    margin: 0px;
    cursor: pointer;

    &:hover {
      background: lightgray;
    }
  }
}
</style>

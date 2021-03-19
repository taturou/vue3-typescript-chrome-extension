<template lang="pug">
div.container
  h1 {{ title }}

  hr

  div.button(
    @click="onOpenOptions"
  ) Options

  hr

  Counter

  hr

  Memos
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Counter from './components/Counter.vue'
import Memos from './components/Memos.vue'

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
  },
  components: {
    Counter,
    Memos
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
  }

  hr {
    size: 1px;
    width: 100%;
    color: gray;
    margin: 0px;
  }

  div.button {
    white-space: nowrap;
    font-size: 1em;
    font-weight: lighter;
    padding: 5px 20px;
    margin: 0px;
    cursor: pointer;

    &:hover {
      background: lightgray;
    }
  }
}
</style>

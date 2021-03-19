<template lang="pug">
div.container
  Counter

  hr

  Memos
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Counter from './components/Counter.vue'
import Memos from './components/Memos.vue'

export default defineComponent({
  setup() {
    return {
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
  padding: 0px 20px;
  display: flex;
  flex-direction: column;

  hr {
    size: 1px;
    width: 100%;
    color: gray;
    margin: 0px;
  }
}
</style>

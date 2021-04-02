<template lang="pug">
div#app
  h1 {{ title }}
  Options
  Counter
  Memos
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Options from './components/Options.vue'
import Counter from './components/Counter.vue'
import Memos from './components/Memos.vue'

export default defineComponent({
  setup () {
    const title = process.env.APP_NAME

    return {
      title
    }
  },
  components: {
    Options,
    Counter,
    Memos
  }
})
</script>

<style lang="scss" scoped>
#app {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 280px;

  h1 {
    margin: 0px;
    padding: 20px 20px 10px 20px;
    font-size: 14px;
    font-weight: lighter;
    text-align: center;
    white-space: nowrap;
  }
}
</style>

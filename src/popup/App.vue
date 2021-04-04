<template lang="pug">
div#app.p-d-flex.p-flex-column
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
  width: 250px;
  background: #fafafa;

  h1 {
    text-align: center;
  }
}
</style>

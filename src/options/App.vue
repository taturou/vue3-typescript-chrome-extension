<template lang="pug">
div.container
  Counter
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Counter from './components/Counter.vue'

export default defineComponent({
  setup() {
    return {
    }
  },
  components: {
    Counter
  }
})
</script>

<style lang="scss" scoped>
div.container {
  margin: 0;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
}
</style>

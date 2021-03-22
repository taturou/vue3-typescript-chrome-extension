<template lang="pug">
div.container
  router-link(
    :to="{name: 'Counter'}"
  ) Counter
  router-link(
    :to="{name: 'Memos'}"
  ) Memos
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
</style>


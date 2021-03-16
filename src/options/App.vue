<template lang="pug">
h1 {{ title }}
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const title = 'Options'
    return {
      title
    }
  }
})
</script>

<style scoped>
</style>

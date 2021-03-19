<template lang="pug">
div.container
  h1 Counter
  p Count: {{ counter }}
</template>

<script lang='ts'>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup () {
    const store = useStore()
    const counter = computed(() => {
      return store.getters['counter/count']
    })

    onBeforeMount(() => {
      store.dispatch('counter/fetch')
    })

    return {
      counter
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
}
</style>

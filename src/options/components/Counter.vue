<template lang="pug">
div.container
  h1 Counter
  p Count: {{ counter }}
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup () {
    const store = useStore()
    const counter = computed(() => {
      return store.getters.counterCountValue
    })

    onMounted(() => {
      store.dispatch('counterFetch')
    })

    return {
      store,
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

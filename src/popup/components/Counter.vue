<template lang="pug">
.container
  .title Counter
  .count {{ counter }}
  .buttons
    button(@click='onIncrement') +
    button(@click='onDecrement') -
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const counter = computed(() => {
      return store.getters['counter/count']
    })
    const onIncrement = () => {
      store.dispatch('counter/increment')
    }
    const onDecrement = () => {
      store.dispatch('counter/decrement')
    }

    onBeforeMount(() => {
      store.dispatch('counter/fetch')
    })

    return {
      counter,
      onIncrement,
      onDecrement
    }
  }
})
</script>

<style lang="scss" scoped>
div.container {
  display: flex;
  flex-direction: column;

  div.title {
    font-size: 1em;
    font-weight: lighter;
    padding: 5px 20px;
    margin: 0px;
  }

  div.count {
    font-size: large;
    text-align: center;
    font-weight: lighter;
    padding-bottom: 5px;
  }

  div.buttons {
    display: flex;
    flex-direction: row;

    button {
      flex-grow: 1;
      margin: 5px;
    }
  }
}
</style>

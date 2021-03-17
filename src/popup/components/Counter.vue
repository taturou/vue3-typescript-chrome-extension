<template lang="pug">
div.container
  div.title Counter
  div.count {{ counter }}
  div.buttons
    div.button(
      @click="onIncrement"
    ) +
    div.button(
      @click="onDecrement"
    ) -
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup () {
    const store = useStore()
    const counter = computed(() => {
      return store.getters.counterCountValue
    })
    const onIncrement = () => {
      store.dispatch('counterIncrement')
    }
    const onDecrement = () => {
      store.dispatch('counterDecrement')
    }

    return {
      store,
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

    div.button {
      flex-grow: 1;
      margin: 5px;
      border: 1px solid gray;
      font-size: large;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: lightgray;
      }
    }
  }
}
</style>

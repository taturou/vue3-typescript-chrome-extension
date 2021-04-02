<template lang="pug">
div#counter
  el-card
    template(#header)
      span Counter
    div
      div.counter {{ counter }}
      el-button-group
        el-button(
          @click="onIncrement"
        ) +
        el-button(
          @click="onDecrement"
        ) -
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
#counter {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 10px;

  .counter {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: lighter;
    margin-bottom: 10px;
  }

  .el-button-group {
    width: 100%;

    .el-button {
      width: 50%;
    }
  }
}
</style>

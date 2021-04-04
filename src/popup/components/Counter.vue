<template lang="pug">
div#counter
  p-card
    template(#title) Counter
    template(#content)
      div.content.p-d-flex.p-flex-column
        label.count.p-mb-2 {{ counter }}
        div.p-d-flex.p-flex-row
          p-button.p-button-text.p-button-raised(
            icon="pi pi-plus"
            @click="onIncrement"
          )
          p-button.p-button-text.p-button-raised(
            icon="pi pi-minus"
            @click="onDecrement"
          )
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
  margin: 0;
  padding: 10px;

  .content {
    .count {
      text-align: center;
      font-weight: lighter;
      font-size: 2rem;
    }

    .p-button {
      width: 50%;
    }
  }
}
</style>

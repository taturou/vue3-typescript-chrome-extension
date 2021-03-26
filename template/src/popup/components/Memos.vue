<template lang="pug">
div.container
  div.title Memo
  textarea.content(
    rows="3"
    v-model="content"
  )
  div.buttons
    button(
      @click="onAdd"
    ) Add
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup () {
    const content = ref<string>('')
    const store = useStore()

    const onAdd = () => {
      store.dispatch('memos/add', { content: content.value })
      content.value = ''
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
    })

    return {
      content,
      onAdd
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

  textarea.content {
    margin-right: 5px;
    margin-left: 5px;
    padding: 5px;
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      margin: 5px;
    }
  }
}
</style>


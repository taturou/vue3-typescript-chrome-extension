<template lang="pug">
div.container
  div.title Memo
  textarea.content(
    rows="3"
    v-model="memo.content"
  )
  div.buttons
    button(
      @click="onAdd"
    ) Add
</template>

<script lang='ts'>
import { defineComponent, reactive, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'
import { ActionAddParams } from '@/lib/store/Memos/types'

export default defineComponent({
  setup () {
    const memo = reactive<ActionAddParams>({
      content: ''
    })
    const store = useStore()

    const onAdd = () => {
      store.dispatch('memos/add', { content: memo.content })
      memo.content = ''
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
    })

    return {
      memo,
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
    flex-direction: row-reverse;

    button {
      margin: 5px;
    }
  }
}
</style>


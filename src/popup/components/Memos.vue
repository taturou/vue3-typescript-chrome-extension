<template lang="pug">
div#memos
  el-card
    template(#header)
      span Memo
    div
      el-input(
        type="textarea"
        :autosize="{ minRows: 2 }"
        placeholder="Please input a memo"
        v-model="content"
      )
      el-button-group
        el-button(
          size="small"
          @click="onClear"
        ) Clear
        el-button(
          type="primary"
          size="small"
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

    const onClear = () => {
      content.value = ''
    }
    const onAdd = () => {
      store.dispatch('memos/add', { content: content.value })
      content.value = ''
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
    })

    return {
      content,
      onClear,
      onAdd
    }
  }
})
</script>

<style lang="scss" scoped>
#memos {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 10px;

  .el-textarea {
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


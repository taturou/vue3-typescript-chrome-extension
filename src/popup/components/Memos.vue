<template lang="pug">
div#memos
  p-card
    template(#title) Memo
    template(#content)
      div.p-d-flex.p-flex-column
        p-textarea.p-mb-2(
          :autoResize="true"
          rows="2"
          v-model="content"
        )
        div.p-d-flex.p-flex-row.p-jc-end
          p-button.p-button-secondary.p-button-sm.p-mr-2(
            label="Clear"
            @click="onClear"
          )
          p-button.p-button-sm(
            label="Add"
            @click="onAdd"
          )
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
  margin: 0;
  padding: 10px;
}
</style>


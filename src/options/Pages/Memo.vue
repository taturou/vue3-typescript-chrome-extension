
<template lang="pug">
div#memo
  p-card
    template(#title) Memo editor
    template(#content)
      div.p-grid.p-mb-2
        label.p-col-2.p-text-right.p-text-bold Id
        span.p-col {{ memo.id }}
      div.p-grid.p-mb-2
        label.p-col-2.p-text-right.p-text-bold Content
        p-textarea.p-col(
          :autoResize="true"
          rows="2"
          v-model="memo.content"
        )
      div.p-grid.p-mb-2
        label.p-col-2.p-text-right.p-text-bold Created at
        span.p-col {{ printDate(memo.createdAt) }}
      div.p-grid.p-mb-2
        label.p-col-2.p-text-right.p-text-bold Modified at
        span.p-col {{ printDate(memo.modifiedAt) }}
      div.p-grid.p-mb-2
        label.p-col-2.p-text-right
        div.p-col.p-d-flex.p-flex-row.p-jc-end
          p-button.p-button-secondary.p-mr-2(
            label="Cancel"
            @click="onCancel"
          )
          p-button.p-mr-2(
            label="Update"
            @click="onUpdate"
          )
          p-button.p-button-danger(
            label="Delete"
            @click="onDelete($event)"
          )

p-confirm-popup
</template>

<script lang='ts'>
import { defineComponent, reactive, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'
import { useRoute, useRouter } from 'vue-router'
import { MemoType } from '@/lib/store/memos/types'
import * as dateUtil from '@/util/Date'
import { useConfirm } from 'primevue/useconfirm'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const confirm = useConfirm()

    const memo = reactive<MemoType>({
      id: 0,
      content: '',
      createdAt: '',
      modifiedAt: ''
    })

    function fetchMemo () {
      const memos = store.getters['memos/memos']
      const id = route.params.id
      const _memo = memos.filter((memo) => {
        return memo.id === Number(id)
      })[0]
      memo.id = _memo.id
      memo.content = _memo.content
      memo.createdAt = _memo.createdAt
      memo.modifiedAt = _memo.modifiedAt
    }

    const onCancel = () => {
      router.push({ name: 'Memos' })
    }

    const onUpdate = () => {
      store.dispatch('memos/updateById', { id: memo.id, content: memo.content })
      router.push({ name: 'Memos' })
    }

    const onDelete = (event: MouseEvent) => {
      confirm.require({
        target: event.currentTarget as EventTarget,
        message: 'Are you sure to delete this?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          store.dispatch('memos/deleteById', { id: memo.id })
          router.push({ name: 'Memos' })
        },
        acceptClass: "p-button-danger"
      })
    }

    const printDate = (dateStr: string): string => {
      const date = new Date(dateStr)
      return dateUtil.printDate(date) + ' ' + dateUtil.printTime(date)
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
      fetchMemo()
    })

    return {
      memo,
      onCancel,
      onUpdate,
      onDelete,
      printDate
    }
  }
})
</script>

<style lang="scss" scoped>
#memo {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>

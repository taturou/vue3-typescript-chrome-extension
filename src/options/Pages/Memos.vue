<template lang="pug">
#memos
  el-table(:data='memos', :default-sort='{ prop: "id", order: "ascending" }', style='wwidth: 100%')
    el-table-column(prop='id', label='ID', sortable, width='60', header-align='center', align='center')
    el-table-column(prop='content', label='Content', header-align='center', align='left')
      template(#default='scope')
        div(v-html='crlf2br(scope.row.content)')
    el-table-column(prop='createdAt', label='Created at', sortable, width='150', header-align='center', align='center')
      template(#default='scope') {{ printDate(scope.row.createdAt) }}
    el-table-column(
      prop='modifiedAt',
      label='Modified at',
      sortable,
      width='150',
      header-align='center',
      align='center'
    )
      template(#default='scope') {{ printDate(scope.row.modifiedAt) }}
    el-table-column(label='Operations', width='200', header-align='center', align='center')
      template(#default='scope')
        el-button(type='primary', size='mini', @click='onEdit(scope.row.id)') Edit
        el-popconfirm(
          title='Are you sure to delete this?',
          confirmButtonType='danger',
          @confirm='onDelete(scope.row.id)'
        )
          template(#reference)
            el-button(type='danger', size='mini') Delete
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { useRouter } from 'vue-router'
import * as dateUtil from '@/util/Date'
import { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const total = computed(() => {
      return store.getters['memos/total']
    })
    const memos = computed(() => {
      return store.getters['memos/memos']
    })

    const onEdit = (id: number) => {
      router.push({ name: 'Memo', params: { id: id } })
    }
    const onDelete = async (id: number) => {
      await store.dispatch('memos/deleteById', { id: id })
    }

    const crlf2br = (text: string): string => {
      return text.replace(/\n|\r|\r\n/g, '<br>')
    }
    const printDate = (dateStr: string): string => {
      const date = new Date(dateStr)
      return dateUtil.printDate(date) + ' ' + dateUtil.printTime(date)
    }

    const fetchByEventFromBackground = (
      message: tabsMessageType,
      _sender: any,
      sendResponse: (response?: any) => void
    ): boolean => {
      if (message.type === 'tabs') {
        if (message.tabs.type === 'memos') {
          if (message.tabs.memos.type === 'fetch') {
            store.dispatch('memos/fetch')
          }
        }
      }
      sendResponse()
      return true
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
      chrome.runtime.onMessage.addListener(fetchByEventFromBackground)
    })

    onBeforeUnmount(() => {
      chrome.runtime.onMessage.removeListener(fetchByEventFromBackground)
    })

    return {
      total,
      memos,
      crlf2br,
      printDate,
      onEdit,
      onDelete
    }
  }
})
</script>

<style lang="scss" scoped>
#memos {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>

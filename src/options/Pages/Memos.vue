<template lang="pug">
#memos
  p-data-table(:value='memos', :autoLayout='true')
    p-column(field='id', header='ID', :sortable='true')
    p-column(field='content', header='Content')
      template(#body='memo')
        div(v-html='crlf2br(memo.data.content)')
    p-column(field='createdAt', header='Created At', :sortable='true')
      template(#body='memo') {{ printDate(memo.data.createdAt) }}
    p-column(field='modifiedAt', header='Modified At', :sortable='true')
      template(#body='memo') {{ printDate(memo.data.modifiedAt) }}
    p-column(header='Operations')
      template(#body='memo')
        .p-d-flex.p-flex-row
          p-button.p-button-sm.p-mr-2(label='Edit', @click='onEdit(memo.data.id)')
          p-button.p-button-danger.p-button-sm(label='Delete', @click='onDelete($event, memo.data.id)')

p-confirm-popup
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { useRouter } from 'vue-router'
import * as dateUtil from '@/util/Date'
import { tabsMessageType } from '@/lib/tabs/types'
import { useConfirm } from 'primevue/useconfirm'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const confirm = useConfirm()

    const total = computed(() => {
      return store.getters['memos/total']
    })
    const memos = computed(() => {
      return store.getters['memos/memos']
    })

    const onEdit = (id: number) => {
      router.push({ name: 'Memo', params: { id: id } })
    }
    const onDelete = (event: MouseEvent, id: number) => {
      confirm.require({
        target: event.currentTarget as EventTarget,
        message: 'Are you sure to delete this?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          store.dispatch('memos/deleteById', { id: id })
        },
        acceptClass: 'p-button-danger'
      })
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

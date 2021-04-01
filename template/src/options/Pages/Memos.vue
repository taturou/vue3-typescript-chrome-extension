<template lang="pug">
div(
  id="memos"
)
  p Total: {{ total }}

  table.memos(
    v-if="total > 0"
  )
    thead
      tr
        th ID
        th Content
        th Created at
        th Modified at
        th Command
    tbody
      tr(
        v-for="memo in memos"
        :key="memo.id"
      )
        td.id {{ memo.id }}
        td.content(v-html="crlf2br(memo.content)")
        td.createdAt {{ printDate(memo.createdAt) }}
        td.modifiedAt {{ printDate(memo.modifiedAt) }}
        td.command
          button(
            @click="onEdit(memo.id)"
          ) Edit
</template>

<script lang='ts'>
import { defineComponent, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/lib/store'
import { useRouter } from 'vue-router'
import * as dateUtil from '@/util/Date'
import { tabsMessageType } from '@/lib/tabs/types'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()

    const total = computed(() => {
      return store.getters['memos/total']
    })
    const memos = computed(() => {
      return store.getters['memos/memos']
    })

    const onEdit = (id: number) => {
      router.push({ name: 'Memo', params: { id: id }})
    }

    const crlf2br = (text: string): string => {
      return text.replace(/\n|\r|\r\n/g, '<br>')
    }

    const printDate = (dateStr: string): string => {
      const date = new Date(dateStr)
      return dateUtil.printDate(date) + ' ' + dateUtil.printTime(date)
    }

    const fetchByEventFromBackground = (message: tabsMessageType, _sender: any, sendResponse: (response?: any) => void): boolean => {
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
      onEdit
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

  table.memos {
    border-collapse: collapse;
    border: 1px solid gray;
    width: fit-content;

    thead {
      tr {
        border-bottom: 1px solid lightgray;

        th {
          padding: 5px 10px;
          border-left: 1px dashed lightgray;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px dashed lightgray;

        td {
          border-left: 1px dashed lightgray;
          padding: 5px 10px;

          &.id {
            text-align: center;
          }
        }
      }
    }
  }

  button {
    margin: 5px;
  }
}
</style>

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
        th Command
    tbody
      tr(
        v-for="memo in memos"
        :key="memo.id"
      )
        td.id {{ memo.id }}
        td.content(v-html="crlf2br(memo.content)")
        td.createdAt {{ printDate(memo.createdAt) }}
        td.command
          button(
            @click="onDelete(memo.id)"
          ) Delete
</template>

<script lang='ts'>
import { defineComponent, computed, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'

export default defineComponent({
  setup () {
    const store = useStore()

    const total = computed(() => {
      return store.getters['memos/total']
    })
    const memos = computed(() => {
      return store.getters['memos/memos']
    })

    const onDelete = (id: number) => {
      store.dispatch('memos/deleteById', { id: id })
    }

    const crlf2br = (text: string): string => {
      return text.replace(/\n|\r|\r\n/g, '<br>')
    }

    const printDate = (dateStr: string): string => {
      const date = new Date(dateStr)
      return date.getFullYear()
        + '/'
        + ('00' + (date.getMonth() + 1)).slice(-2)
        + '/'
        + ('00' + date.getDate()).slice(-2)
        + ' '
        + ('00' + date.getHours()).slice(-2)
        + ':'
        + ('00' + date.getMinutes()).slice(-2)
    }

    onBeforeMount(() => {
      store.dispatch('memos/fetch')
    })

    return {
      total,
      memos,
      crlf2br,
      printDate,
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

<template lang="pug">
#memo
  h1 Memo editor
  template(v-if='available')
    p Id: {{ memo.id }}
    p Created at: {{ printDate(memo.createdAt) }}
    p Modified at: {{ printDate(memo.modifiedAt) }}
    p Content:
    textarea(rows='10', wrap='off', v-model='memo.content')
    .buttons
      button(@click='onCancel') Cancel
      button(@click='onUpdate') Update
      button(@click='onDelete') Delete
  template(v-else)
    p Id: {{ route.params.id }} is not available.
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useStore } from '@/lib/store'
import { useRoute, useRouter } from 'vue-router'
import { MemoType } from '@/lib/store/memos/types'
import * as dateUtil from '@/util/Date'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const available = ref<boolean>(false)
    const memo = reactive<MemoType>({
      id: 0,
      content: '',
      createdAt: '',
      modifiedAt: ''
    })

    function fetchMemo() {
      const memos = store.getters['memos/memos']
      const id = route.params.id
      const index = memos.findIndex((memo) => {
        return memo.id === Number(id)
      })
      const _memo = memos[index]
      if (_memo) {
        memo.id = _memo.id
        memo.content = _memo.content
        memo.createdAt = _memo.createdAt
        memo.modifiedAt = _memo.modifiedAt
        available.value = true
      } else {
        available.value = false
      }
    }

    const onCancel = () => {
      router.push({ name: 'Memos' })
    }

    const onUpdate = () => {
      store.dispatch('memos/updateById', { id: memo.id, content: memo.content })
      router.push({ name: 'Memos' })
    }

    const onDelete = () => {
      store.dispatch('memos/deleteById', { id: memo.id })
      router.push({ name: 'Memos' })
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
      route,
      available,
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

  textarea {
    width: 100%;
    margin-bottom: 12px;
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      margin-left: 5px;
    }
  }
}
</style>

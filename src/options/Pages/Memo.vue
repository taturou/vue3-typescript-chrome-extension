<template lang="pug">
#memo
  template(v-if='available')
    el-card
      el-form(:model='memo', label-width='100px', label-position='left')
        el-form-item(label='ID')
          div {{ memo.id }}
        el-form-item(label='Content')
          el-input(type='textarea', autosize, v-model='memo.content')
        el-form-item(label='Created at')
          div {{ printDate(memo.createdAt) }}
        el-form-item(label='Modified at')
          div {{ printDate(memo.modifiedAt) }}
        el-form-item
          .justify-end
            el-button(@click='onCancel') Cancel
            el-button(type='primary', @click='onUpdate') Update
            el-popconfirm(title='Are you sure to delete this?', confirmButtonType='danger', @confirm='onDelete')
              template(#reference)
                el-button(type='danger') Delete
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

    const onUpdate = async () => {
      await store.dispatch('memos/updateById', { id: memo.id, content: memo.content })
      router.push({ name: 'Memos' })
    }

    const onDelete = async () => {
      await store.dispatch('memos/deleteById', { id: memo.id })
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

  div.justify-end {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>

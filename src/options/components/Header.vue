<template lang="pug">
#header
  h1 {{ title }}

  p-tab-view(v-model:activeIndex='activeTabIndex')
    template(v-for='name in TabIndexForRouterName')
      p-tab-panel(:header='name')
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const title = `"${process.env.APP_NAME}"'s Options`

    const router = useRouter()

    const TabIndexForRouterName = ['Counter', 'Memos']

    const activeTabIndex = computed<number>({
      get: () => {
        const index = TabIndexForRouterName.indexOf(router.currentRoute.value.name as string)
        return index === -1 ? 0 : index
      },
      set: (index) => {
        router.push({ name: TabIndexForRouterName[index] })
      }
    })

    return {
      title,
      TabIndexForRouterName,
      activeTabIndex
    }
  }
})
</script>

<style lang="scss" scoped>
#header {
  margin: 0;
  padding: 0;
  width: 100%;

  h1 {
    text-align: center;
  }
}
</style>

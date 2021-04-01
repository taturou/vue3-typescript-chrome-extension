<template lang="pug">
div#header
  h1.title {{ title }}

  el-tabs(
    v-model="router.currentRoute.value.name"
    @tab-click="onClick"
  )
    el-tab-pane(
      label="Counter"
      name="Counter"
    )
    el-tab-pane(
      label="Memos"
      name="Memos"
    )
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const title = `"${process.env.APP_NAME}"'s Options`

    const router = useRouter()
    const onClick = (tab: any, event: MouseEvent): void => {
      router.push({ name: tab.paneName })
    }

    return {
      title,
      router,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
#header {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;

  h1.title {
    width:100%;
    text-align: center;
  }
}
</style>


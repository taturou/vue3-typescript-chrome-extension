<template lang="pug">
div(
  id="header"
)
  h1 {{ title }}

  div.tab
    router-link.item(
      :to="{name: 'Counter'}"
    ) Counter
    router-link.item(
      :to="{name: 'Memos'}"
    ) Memos
    span.item.grow
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const title = `"${process.env.APP_NAME}"'s Options`

    return {
      title
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
  min-width: 400px;
  width: 100%;

  .tab {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .item {
      flex-basis: 100px;
      border-top: 1px solid transparent;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      border-bottom: 1px solid lightgray;
      text-decoration: none;
      text-align: center;
      padding: 5px;

      &:hover {
        background: lightgray;
      }

      &:visited {
        color: black;
      }
    }

    .grow {
      flex-grow: 1;

      &:hover {
        background: transparent;
      }
    }

    .router-link-active {
      border-top: 1px solid lightgray;
      border-left: 1px solid lightgray;
      border-right: 1px solid lightgray;
      border-bottom: 1px solid transparent;
      cursor: default;

      &:hover {
        background: transparent;
      }
    }
  }
}
</style>


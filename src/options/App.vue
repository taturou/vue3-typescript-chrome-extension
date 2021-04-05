<template lang="pug">
#app
  Header
  router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: {
    Header
  }
})
</script>

<style lang="scss" scoped>
#app {
  margin: 0;
  padding: 0px 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
}
</style>

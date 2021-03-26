<template lang="pug">
div.collapse(
  :class="$props.expand"
)
  div.operation(
    :class="$props.expand"
    @click="onOperation"
  )
    icon(v-show="visibleIcon.up" :icon="['fas', 'angle-up']")
    icon(v-show="visibleIcon.down" :icon="['fas', 'angle-down']")
    icon(v-show="visibleIcon.left" :icon="['fas', 'angle-left']")
    icon(v-show="visibleIcon.right" :icon="['fas', 'angle-right']")
  div.contents(
    :class="[$props.expand, { visible: visibleContents }]"
  )
    slot
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'

export type CollapseExpandType = 'top2bottom' | 'bottom2top' | 'left2right' | 'right2left'

export default defineComponent({
  props: {
    expand: {
      type: String, // as CollapseExpandType
      default: 'top2bottom'
    }
  },
  setup(props) {
    const visibleContents = ref<boolean>(false)
    const visibleIcon = computed(() => {
      let visible = { up: false, down: false, left: false, right: false }
      if (visibleContents.value) {
        switch(props.expand) {
        case 'top2bottom': visible.up = true; break
        case 'bottom2top': visible.down = true; break
        case 'left2right': visible.left = true; break
        case 'right2left': visible.right = true; break
        }
      } else {
        switch(props.expand) {
        case 'top2bottom': visible.down = true; break
        case 'bottom2top': visible.up = true; break
        case 'left2right': visible.right = true; break
        case 'right2left': visible.left = true; break
        }
      }
      return visible
    })

    const onOperation = () => {
      visibleContents.value = !visibleContents.value
    }

    return {
      visibleContents,
      visibleIcon,
      onOperation
    }
  }
})
</script>

<style lang="scss" scoped>
div.collapse {
  display: flex;
  margin: 0;
  padding: 0;
  background: white;
  border: 1px solid gray;

  &.top2bottom {
    flex-direction: column;
  }

  &.bottom2top {
    flex-direction: column-reverse;
  }

  &.left2right {
    flex-direction: row;
  }

  &.right2left {
    flex-direction: row-reverse;
  }

  div.operation {
    margin: 0;
    padding: 0px 5px;
    cursor: pointer;

    &.top2bottom {
      text-align: right;
      vertical-align: middle;
    }

    &.bottom2top {
      text-align: right;
      vertical-align: middle;
    }

    &.left2right {
      text-align: center;
      vertical-align: top;
    }

    &.right2left {
      text-align: center;
      vertical-align: top;
    }

    span {
      color: rgb(38, 50, 56);
      background: transparent;

      &::selection {
        color: rgb(38, 50, 56);
        background: transparent;
      }
    }
  }

  div.contents {
    margin: 0;
    padding: 0;
    display: none;

    &.visible {
      display: block;
    }

    &.top2bottom {
      border-top: 1px solid gray;
    }

    &.bottom2top {
      border-bottom: 1px solid gray;
    }

    &.left2right {
      border-left: 1px solid gray;
    }

    &.right2left {
      border-right: 1px solid gray;
    }
  }
}
</style>

<template lang="pug">
div.collapse(
  :class="[$props.expand, { visible: visibleContents }]"
)
  div.operation(
    @click="onOperation"
  )
    div.character &gt;
  div.contents
    slot
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export type CollapseExpandType = 'top2bottom' | 'bottom2top' | 'left2right' | 'right2left'

export default defineComponent({
  props: {
    expand: {
      type: String as () => CollapseExpandType,
      default: 'top2bottom'
    }
  },
  setup() {
    const visibleContents = ref<boolean>(false)

    const onOperation = () => {
      visibleContents.value = !visibleContents.value
    }

    return {
      visibleContents,
      onOperation
    }
  }
})
</script>

<style lang="scss" scoped>
// common
div.collapse {
  display: flex;
  margin: 0;
  padding: 0;
  background: white;
  border: 1px solid gray;

  div.operation {
    margin: 0;
    padding: 0;
    cursor: pointer;

    div.character {
      font-family: monospace;
      font-size: 10px;
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
  }
}

// top2bottom
div.collapse.top2bottom {
  flex-direction: column;

  div.operation {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    vertical-align: middle;

    div.character {
      padding: 3px 10px 3px 10px;
      transform: rotate(90deg)
    }
  }
}

// bottom2top
div.collapse.bottom2top {
  flex-direction: column-reverse;

  div.operation {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    vertical-align: middle;

    div.character {
      padding: 3px 10px 3px 10px;
      transform: rotate(-90deg)
    }
  }
}

// left2right
div.collapse.left2right {
  flex-direction: row;

  div.operation {
    text-align: center;
    vertical-align: top;

    div.character {
      padding: 5px 5px 5px 8px;
      transform: rotate(0deg)
    }
  }
}

// right2left
div.collapse.right2left {
  flex-direction: row-reverse;

  div.operation {
    text-align: center;
    vertical-align: top;

    div.character {
      padding: 5px 5px 5px 8px;
      transform: rotate(180deg)
    }
  }
}

// top2bottom.visible
div.collapse.top2bottom.visible {
  div.operation {
    div.character {
      transform: rotate(-90deg)
    }
  }
  div.contents {
    border-top: 1px solid lightgray;
    display: block;
  }
}

// bottom2top.visible
div.collapse.bottom2top.visible {
  div.operation {
    div.character {
      transform: rotate(90deg)
    }
  }
  div.contents {
    border-bottom: 1px solid lightgray;
    display: block;
  }
}

// left2right.visible
div.collapse.left2right.visible {
  div.operation {
    div.character {
      transform: rotate(180deg)
    }
  }
  div.contents {
    border-left: 1px solid lightgray;
    display: block;
  }
}

// right2left.visible
div.collapse.right2left.visible {
  div.operation {
    div.character {
      transform: rotate(0deg)
    }
  }
  div.contents {
    border-right: 1px solid lightgray;
    display: block;
  }
}
</style>

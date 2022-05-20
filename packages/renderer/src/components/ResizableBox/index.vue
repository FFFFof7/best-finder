<script setup lang="ts">
import type { resizeEvent } from './ResizableBox'
const width = ref(100)
const height = ref(100)
const boxSizeStyle = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`,
  }
})
const resizableBox = $ref<HTMLDivElement>()
function rightResizeChange({ x: mouseX }: resizeEvent) {
  const boxLeft = resizableBox.getBoundingClientRect().left
  width.value = mouseX - boxLeft
}
function bottomResizeChange({ y: mouseY }: resizeEvent) {
  const boxTop = resizableBox.getBoundingClientRect().top
  height.value = mouseY - boxTop
}

</script>

<template>
  <div>
    <div
      ref="resizableBox"
      w-5 h-5
      relative
      border border-green-500
      :style="boxSizeStyle"
    >
      <Resizer absolute position="right" @resize="rightResizeChange" />
      <Resizer absolute position="bottom" @resize="bottomResizeChange" />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

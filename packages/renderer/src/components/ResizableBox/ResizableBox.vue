<script setup lang="ts">
import type { resizeEvent } from './ResizableBox'

interface Props {
  width?: number
  height?: number
}
interface Emits{
  (e: 'update:width', size: Props['width']): void
  (e: 'update:height', size: Props['height']): void
}
const { width = 10, height = 10 } = defineProps<Props>()
const emit = defineEmits<Emits>()
const boxSizeStyle = computed(() => {
  return {
    width: `${width}px`,
    height: `${height}px`,
  }
})
const resizableBox = $ref<HTMLDivElement>()
function rightResizeChange({ x: mouseX }: resizeEvent) {
  const boxLeft = resizableBox.getBoundingClientRect().left
  emit('update:width', mouseX - boxLeft)
}
function bottomResizeChange({ y: mouseY }: resizeEvent) {
  const boxTop = resizableBox.getBoundingClientRect().top
  emit('update:height', mouseY - boxTop)
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

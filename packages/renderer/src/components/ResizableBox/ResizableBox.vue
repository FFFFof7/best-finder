<script setup lang="ts">
import type { resizeEvent } from './ResizableBox'
type ShowResizer = [
  ('top' | 'right' | 'bottom' | 'left')?,
  ('top' | 'right' | 'bottom' | 'left')?,
  ('top' | 'right' | 'bottom' | 'left')?,
  ('top' | 'right' | 'bottom' | 'left')?,
]
interface Props {
  width?: number
  height?: number
  showResizer?: ShowResizer
}
interface Emits{
  (e: 'update:width', size: Props['width']): void
  (e: 'update:height', size: Props['height']): void
}

const { width = 10, height = 10, showResizer = ['top', 'right', 'bottom', 'left'] } = defineProps<Props>()
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
const resizerEventMap: Record<string, (e: resizeEvent) => void> = {
  top: bottomResizeChange,
  right: rightResizeChange,
  bottom: bottomResizeChange,
  left: bottomResizeChange,
}
const resizers = computed(() => {
  return showResizer!.map((item) => {
    return {
      postion: item,
      resizerEvent: resizerEventMap[item!],
    }
  })
})
</script>

<template>
  <div>
    <div
      ref="resizableBox"
      w-5 h-5
      relative
      :style="boxSizeStyle"
    >
      <div class="resizers">
        <Resizer
          v-for="item, index in resizers"
          :key="index" absolute
          :position="item.postion"
          @resize="item.resizerEvent"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

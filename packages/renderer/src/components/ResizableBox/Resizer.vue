<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { resizeEvent } from './ResizableBox'
interface Props{
  position?: 'top' | 'right' | 'bottom' | 'left'
  resizerWidth?: number
  color?: string
}
interface Emits{
  (e: 'resize', { x, y }: resizeEvent): void
}
const { position = 'right', resizerWidth = 2, color = 'rgba(0, 0, 0, .7)' } = defineProps<Props>()
const emits = defineEmits<Emits>()

const computedStyle = computed(() => {
  const style: StyleValue = {
    position: 'absolute',
    top: 'unset',
    right: 'unset',
    bottom: 'unset',
    left: 'unset',
    [position]: 0,
    backgroundColor: color,
  }
  if (position === 'top' || position === 'bottom') {
    style.width = '100%'
    style.height = `${resizerWidth}px`
    style.cursor = 'ns-resize'
  }

  if (position === 'left' || position === 'right') {
    style.width = `${resizerWidth}px`
    style.height = '100%'
    style.cursor = 'ew-resize'
  }
  return style
})

let isMousedown = false
const resizer = ref<HTMLElement>()
onMounted(() => {
  useEventListener(window, 'mouseup', () => {
    isMousedown = false
  }, { passive: true })
  useEventListener(window, 'mouseleave', () => {
    isMousedown = false
  }, { passive: true })

  useEventListener(resizer, 'mousedown', () => {
    isMousedown = true
  })
})

const { x, y } = $(useMouse())
watch(
  () => {
    return { x, y }
  },
  () => {
    if (!isMousedown)
      return
    emits('resize', { x, y })
  },
)
</script>

<template>
  <i ref="resizer" bg-red z-2 :style="computedStyle" />
</template>

<style scoped lang="less">

</style>

<script setup lang="ts">
import { SplitViewKey } from './SplitVIew'
import type { SplitViewContext, SplitViewMode } from './SplitVIew'
interface Props {
  mode?: SplitViewMode
  minWidth?: number
  minHeight?: number
}
const { mode = 'horizontal', minWidth = 50, minHeight = 50 } = defineProps<Props>()
const sizeUnit = mode === 'horizontal' ? 'width' : 'height'
const maxSize = mode === 'horizontal' ? minWidth : minHeight

const views = reactive<SplitViewContext['views']>([])
const splitViewEl = $ref<HTMLDivElement>()
let containerWidth = 0
let containerHeight = 0
let isMounted = $ref(false)
onMounted(() => {
  const { clientWidth, clientHeight } = splitViewEl
  containerWidth = clientWidth
  containerHeight = clientHeight
  isMounted = true
})
const addView: SplitViewContext['addView'] = (view) => {
  views.push(view)
  views.forEach((item) => {
    if (mode === 'horizontal') {
      item.width = containerWidth / views.length
      item.height = containerHeight
    }
    else {
      item.width = containerWidth
      item.height = containerHeight / views.length
    }
  })
}
const onResize: SplitViewContext['onResize'] = (view, w, viewIndex) => {
  const resizeNum = view[sizeUnit]! - w
  const isRight = resizeNum <= 0
  let nextView
  if (isRight)
    nextView = views.slice(viewIndex + 1).find(item => item[sizeUnit]! + resizeNum >= maxSize)
  else
    nextView = views.slice(0, viewIndex + 1).reverse().find(item => item[sizeUnit]! - resizeNum >= maxSize)

  if (!nextView)
    return

  if (isRight) {
    if (w < maxSize)
      return
    nextView[sizeUnit] = nextView[sizeUnit]! + resizeNum
    view[sizeUnit] = w
  }
  else {
    const currentView = views[viewIndex + 1]!
    if (nextView[sizeUnit]! - resizeNum < maxSize)
      return
    nextView[sizeUnit] = nextView[sizeUnit]! - resizeNum
    currentView[sizeUnit] = currentView[sizeUnit]! + resizeNum
  }
}

provide(SplitViewKey, {
  mode,
  views,
  addView,
  onResize,
})
</script>

<template>
  <div ref="splitViewEl" flex class="w-100% h-100%" :style="{flexDirection: mode === 'horizontal' ? 'row' : 'column'}">
    <slot v-if="isMounted" />
  </div>
</template>

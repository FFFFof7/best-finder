<script setup lang="ts">
import { SplitViewKey } from './SplitVIew'
import type { SplitViewContext, SplitViewMode } from './SplitVIew'
interface Props {
  mode?: SplitViewMode
  minWidth?: number
}
const { mode = 'horizontal', minWidth = 50 } = defineProps<Props>()
const views = reactive<SplitViewContext['views']>([])
const clientWidth = document.body.clientWidth
const addView: SplitViewContext['addView'] = (view) => {
  views.push(view)
  views.forEach(item => item.width = clientWidth / views.length)
}
const onResize: SplitViewContext['onResize'] = (view, viewIndex, w) => {
  const resizeNum = view.width! - w
  const isRight = resizeNum <= 0
  let nextView
  if (isRight)
    nextView = views.slice(viewIndex + 1).find(item => item.width! + resizeNum >= minWidth)
  else
    nextView = views.slice(0, viewIndex + 1).reverse().find(item => item.width! - resizeNum >= minWidth)

  if (!nextView)
    return

  if (isRight) {
    if (w < minWidth)
      return
    nextView.width = nextView.width! + resizeNum
    view.width = w
  }
  else {
    const currentView = views[viewIndex + 1]!
    if (nextView.width! - resizeNum < minWidth)
      return
    nextView.width = nextView.width! - resizeNum
    currentView.width = currentView.width! + resizeNum
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
  <div flex class="split-view-container">
    <slot />
  </div>
</template>

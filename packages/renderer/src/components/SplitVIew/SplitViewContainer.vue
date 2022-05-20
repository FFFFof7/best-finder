<script setup lang="ts">
import { SplitViewKey } from './SplitVIew'
import type { SplitViewContext, SplitViewMode } from './SplitVIew'
interface Props {
  mode?: SplitViewMode
}
const { mode = 'horizontal' } = defineProps<Props>()
const views = reactive<SplitViewContext['views']>([])
const clientWidth = document.body.clientWidth
const addView: SplitViewContext['addView'] = (view) => {
  views.push(view)
  views.forEach(item => item.width = clientWidth / views.length)
}
const onResize: SplitViewContext['onResize'] = (view, viewIndex, w) => {
  const nextView = views[viewIndex + 1]
  const resizeNum = view.width! - w
  nextView.width = nextView.width! + resizeNum
  view.width = w
}

provide(SplitViewKey, {
  mode,
  views,
  addView,
  onResize,
})
</script>

<template>
  <div flex>
    <slot />
  </div>
</template>

<style scoped lang="less">

</style>

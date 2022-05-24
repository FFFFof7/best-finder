<script setup lang="ts">
import { SplitViewKey } from './SplitVIew'
import useId from '~/composables/useId'
const SplitViewContext = inject(SplitViewKey)!

const viewId = useId()
const view = computed(() => SplitViewContext.views.find(item => item.id === viewId)!)
const viewIndex = computed(() => SplitViewContext.views.findIndex(item => item.id === viewId))
const isLastView = computed(() => {
  const views = SplitViewContext.views
  return views[views.length - 1].id === viewId
})

SplitViewContext?.addView({
  id: viewId,
})

const showResizer = computed(() => {
  if (isLastView.value)
    return [] as []
  if (SplitViewContext.mode === 'horizontal')
    return ['right'] as ['right']
  return ['bottom'] as ['bottom']
})
</script>

<template>
  <div>
    <ResizableBox
      :width="view.width"
      :height="view.height"
      :show-resizer="showResizer"
      @update:width="SplitViewContext.onResize(view, $event!, viewIndex)"
      @update:height="SplitViewContext.onResize(view, $event!, viewIndex)"
    >
      <slot />
    </ResizableBox>
  </div>
</template>

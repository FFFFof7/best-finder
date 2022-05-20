<script setup lang="ts">
import { SplitViewKey } from './SplitVIew'
import useId from '~/composables/useId'
const height = ref(100)
const SplitViewContext = inject(SplitViewKey)!

const viewId = useId()
const view = computed(() => SplitViewContext.views.find(item => item.id === viewId)!)
const viewIndex = computed(() => SplitViewContext.views.findIndex(item => item.id === viewId))

SplitViewContext?.addView({
  id: viewId,
})

const showResizer = computed(() => {
  if (SplitViewContext.mode === 'horizontal')
    return ['right'] as ['right']
  return ['bottom']as ['bottom']
})
</script>

<template>
  <div>
    <ResizableBox
      v-model:height="height"
      :width="view.width"
      :show-resizer="showResizer"
      @update:width="SplitViewContext.onResize(view,viewIndex, $event!)"
    />
  </div>
</template>

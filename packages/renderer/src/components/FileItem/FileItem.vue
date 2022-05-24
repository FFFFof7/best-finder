<script setup lang="ts">
interface Props {
  isChecked?: boolean
}
const { isChecked = false } = defineProps<Props>()

const fileItemEl = ref()
const isHovered = useElementHover(fileItemEl)
</script>

<template>
  <div
    ref="fileItemEl"
    p-1
    flex items-center
    border-blue-500
    select-none cursor-default
    :class="{
      'border': isChecked,
      'bg-blue-500': isChecked,
      'color-gray-50': isChecked,
      'bg-blue-50': isHovered && !isChecked,
    }"
  >
    <slot name="icon">
      <i w-5 h-5 i-carbon:file-storage />
    </slot>
    <span ml-2>
      <slot>
        <span>defaultName</span>
      </slot>
    </span>
  </div>
</template>

<template>
  <div class="relative w-full">
    <div class="relative">
      <ion-icon class="absolute top-1/2 left-3 -translate-y-1/2 text-gray-800/50" name="search-outline"></ion-icon>
      <input v-model="internalValue" :disabled="props.disabled" type="text" placeholder="ejemplo 'casa'"
        class="w-full border-2 border-gray-400/40 bg-transparent pl-9 p-2 rounded-lg focus:border-green-focus focus:outline-none sm:text-md text-sm transition-colors duration-200" />
    </div>
    <div v-if="isGeminiSuggestionLoading" class="flex flex-wrap justify-evenly gap-2 mt-3">
      <div v-for="n in 3" :key="n"
        class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-200 border border-purple-300/30 py-1.5 px-4 rounded-2xl text-xs cursor-default transition-all duration-300 skeleton-pulse">
        <div class="w-3 h-3 bg-purple-300/60 rounded-full shimmer"></div>
        <div class="h-3 bg-purple-300/60 rounded-full shimmer" :class="getSkeletonWidth(n)"></div>
      </div>
    </div>
    <div v-else class="flex flex-wrap justify-evenly gap-2 mt-3">
      <span v-for="suggestion in geminiSuggestion" :key="suggestion" @click="$emit('searchGemini', suggestion)"
        class="inline-flex items-center gap-1 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/60 py-1.5 px-4 rounded-2xl text-xs font-medium text-purple-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:from-purple-100 hover:to-blue-100 hover:border-purple-300 hover:shadow-md hover:shadow-purple-200/40 group">
        <ion-icon name="sparkles"
          class="text-purple-400 group-hover:text-purple-500 transition-colors duration-300"></ion-icon>
        {{ suggestion }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  disabled?: boolean
  isGeminiSuggestionLoading: boolean
  geminiSuggestion: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'searchGemini', value: string): void
}>()

const internalValue = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => emit('update:modelValue', val),
})

const getSkeletonWidth = (index: number) => {
  const widths = ['w-16', 'w-20', 'w-14']
  return widths[(index - 1) % widths.length]
}
</script>
<style scoped>
.suggestion-enter-active,
.suggestion-leave-active {
  transition: all 0.3s ease;
}

.suggestion-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.suggestion-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.skeleton-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}
</style>

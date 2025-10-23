<template>
  <div id="card-counter"
    class="fixed right-5 z-10 bg-white py-3 px-4 rounded-lg flex flex-col gap-2 shadow-md transition-all duration-300 ease-in-out"
    :class="{
      'bottom-5': isMobile,
      'top-5': !isMobile,
      'w-52': isExpanded || !isMobile,
      'w-14': !isExpanded
    }">
    <div class="flex flex-row items-center justify-between gap-2"
      :class="{ 'justify-between': (isExpanded && isMobile) || !isMobile, 'justify-end': !isExpanded && isMobile }">
      <p v-if="!isMobile || (isExpanded && isMobile)" class="font-bold text-lg">Puntuación</p>
      <button v-if="isMobile" @click="toggleExpand"
        class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200" :class="{ 'rotate-180': isExpanded }">
        <ion-icon :name="isMobile && isExpanded ? 'chevron-forward' : 'chevron-back'"
          class="text-xl text-gray-600"></ion-icon>
      </button>
    </div>
    <hr class="text-gray-600/20">
    <div class="transition-all duration-300 ease-in-out flex flex-col gap-2">
      <template v-if="counter.length">
        <MeterSeller v-for="c in counter" :key="c.seller?.id" :item="c" :is-expanded="isExpanded" />
      </template>
      <template v-else>
        <div class="w-full flex flex-col gap-3 animate-pulse flex-1">
          <div class="h-3 bg-gray-200 rounded w-full"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue';
import MeterSeller from './MeterSeller.vue';
import { useIsMobile } from '@/composable/useIsMobile';

const counterStore = useCounterStore()
const { counter, winner } = storeToRefs(counterStore)
const { isMobile } = useIsMobile()

const isExpanded = ref(true)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

watch(winner, () => {
  if (winner.value) {
    isExpanded.value = true
  }
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.transition-all {
  transition-property: all;
}
</style>

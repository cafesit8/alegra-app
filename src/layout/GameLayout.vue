<template>
  <div class="aurora-container relative w-full min-h-dvh bg-background-light grid place-items-center p-5">
    <AuroraAnimate :color-stops="['#cffcea', '#a3f7d9', '#cffcea']" :amplitude="0.9" :blend="1" :speed="1"
      :intensity="0.3" class="w-full h-full" />
    <CardCounter />
    <slot />
    <ModalWinner />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import AuroraAnimate from '@/components/animation/AuroraAnimate.vue';
import CardCounterSkeleton from '@/skeleton/CardCounterSkeleton.vue';

const CardCounter = defineAsyncComponent({
  loader: () => import('@/components/counter/CardCounter.vue'),
  loadingComponent: CardCounterSkeleton,
});
const ModalWinner = defineAsyncComponent(() => import('@/components/ModalWinner.vue'));
</script>
<style scoped>
.aurora-container {
  width: 100%;
  height: 500px;
  position: sticky;
  overflow: auto;
}
</style>

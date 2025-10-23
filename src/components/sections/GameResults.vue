<template>
  <div v-if="isLoading && !data.length" class="w-full max-w-[1200px] mx-auto sm:mt-12 mt-5" :class="gridClasses">
    <SkeletonImageCard v-for="i in 3" :key="i" />
  </div>

  <section v-else-if="data.length && !isLoading" class="w-full max-w-[1200px] mx-auto sm:mt-12 mt-5"
    :class="gridClasses">
    <ImageCard v-for="item in data" :key="item.image" :image="item.image" :seller="item.seller" :alt="item.alt"
      :height="item.height" :width="item.width" :is-selected="selectedSeller === item.seller?.name"
      :has-selected="!!selectedSeller" @select="$emit('select', $event)" />
  </section>
</template>

<script setup lang="ts">
import SkeletonImageCard from '@/skeleton/SkeletonImageCard.vue';
import ImageCard from '../ImageCard.vue';
import type { ImageData } from '@/types/images';

const gridClasses = "grid grid-cols-2 grid-rows-[repeat(2,minmax(120px,1fr))] sm:grid-rows-[minmax(200px,1fr)] sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 justify-center";

defineProps<{
  data: ImageData[]
  isLoading: boolean
  selectedSeller: string | null
  hasResults: boolean
}>()

defineEmits<{
  select: [seller: string]
}>()
</script>

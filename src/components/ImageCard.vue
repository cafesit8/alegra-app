<template>
  <article @click="handleClickSelectImage" class="text-center transition-transform duration-200 flex flex-col" :class="[
    !hasSelected || isSelected ? 'hover:scale-105 cursor-pointer saturate-200' : 'cursor-not-allowed',
    isSelected ? 'scale-105' : '',
  ]">
    <figure class="flex-1 rounded-xl overflow-hidden transition-all duration-300 aspect-[4/3]" :class="{
      'grayscale pointer-events-none': hasSelected && !isSelected,
    }">
      <Image :src="image" layout="constrained" :width="width" :height="height" :alt="alt"
        class="w-full h-full object-cover" />
    </figure>

    <p class="mt-2 text-[10px] sm:text-xs text-start">
      <span class="text-green-dark/80">Vendido por</span>:
      <span class="text-green-dark font-medium">{{ seller?.name }}</span>
    </p>
  </article>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { Image } from '@unpic/vue'
import type { Seller } from '@/types/sellers';

const props = defineProps<{
  image: string
  height: number
  width: number
  seller?: Seller | null
  alt: string
  isSelected: boolean
  hasSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', solder: string): void
}>()

const { increment } = useCounterStore()

function handleClickSelectImage () {
  if (props.hasSelected) return
  if (!props.seller) return
  emit('select', props.seller.name)
  increment(props.seller.id)
}
</script>

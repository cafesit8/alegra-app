<template>
  <GameLayout>
    <main class="w-full h-full flex flex-col sm:justify-center items-center">
      <GameHeader />
      <GameSearch :word="searchState.word" :is-loading="searchState.isLoading"
        :gemini-suggestion="geminiState.suggestions" :is-gemini-suggestion-loading="geminiState.isLoading"
        @search-gemini="getImages" @search="getImages" @update:word="searchState.word = $event" />
      <GameResults :data="searchState.data" :is-loading="searchState.isLoading"
        :selected-seller="searchState.selectedSeller" :has-results="searchState.data.length > 0"
        @select="handleSellerSelect" />
      <GameNoResults v-if="searchState.isError" />
    </main>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent } from 'vue'
import GameHeaderSkeleton from '@/skeleton/GameHeaderSkeleton.vue';
import GameSearchSkeleton from '@/skeleton/GameSearchSkeleton.vue';

const GameHeader = defineAsyncComponent({
  loader: () => import('@/components/sections/GameHeader.vue'),
  loadingComponent: GameHeaderSkeleton,
});
const GameLayout = defineAsyncComponent(() => import('@/layout/GameLayout.vue'));
const GameSearch = defineAsyncComponent({
  loader: () => import('@/components/sections/GameSearch.vue'),
  loadingComponent: GameSearchSkeleton,
});
const GameNoResults = defineAsyncComponent(() => import('@/components/sections/GameNoResults.vue'));
const GameResults = defineAsyncComponent(() => import('@/components/sections/GameResults.vue'));

import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { getSellers } from '@/services/sellers/sellers.service';
import { SellersError } from '@/services/sellers/handle.erros';
import { getimageFromUnsplash } from '@/services/unsplash/unspash.service';
import { UnsplashError } from '@/services/unsplash/handle-erros';
import { getGeminiSuggestions } from '@/services/gemini/gemini.service';
import { GeminiError } from '@/services/gemini/handle-errors';
import type { ImageData } from '@/types/images';
import type { Image } from '@/types/unsplash';

const store = useCounterStore()

const searchState = ref({
  word: '',
  data: [] as ImageData[],
  isLoading: false,
  isError: false,
  selectedSeller: null as string | null
})
const geminiState = ref({
  suggestions: [] as string[],
  isLoading: false
})
const { sellers, winner } = storeToRefs(store)

function handleSellerSelect (seller: string) {
  if (searchState.value.selectedSeller) return;
  searchState.value.selectedSeller = seller;
}

async function getImages (geminiWord?: string) {
  const searchWord = geminiWord || searchState.value.word.trim()

  if (!searchWord) return;

  resetSearchState()
  searchState.value.word = geminiWord || searchState.value.word
  searchState.value.isLoading = true

  try {
    await getSuggestion()
    const images = await getimageFromUnsplash(searchWord)
    processImages(images)
  } catch (error) {
    handleUnsplashError(error)
  } finally {
    searchState.value.isLoading = false
  }
}

async function getSuggestion () {
  const word = searchState.value.word.trim()
  if (!word) return

  geminiState.value.isLoading = true
  try {
    const suggestions = await getGeminiSuggestions(word)
    geminiState.value.suggestions = suggestions
  } catch (error) {
    handleGeminiError(error)
  } finally {
    geminiState.value.isLoading = false
  }
}

function resetSearchState () {
  searchState.value.isError = false
  searchState.value.selectedSeller = null
}

function processImages (images: Image[]) {
  const processedData = images.map((image, index) => ({
    image: image.urls.small,
    height: 400,
    width: 600,
    alt: image.alt_description,
    seller: sellers.value[index] ?? null
  }))

  searchState.value.data = processedData
}

function handleUnsplashError (error: unknown) {
  if (error instanceof UnsplashError) {
    console.error('Unsplash Error:', error.message)
    searchState.value.isError = true
  } else {
    console.error('Unexpected Unsplash error:', error)
  }
}

function handleGeminiError (error: unknown) {
  if (error instanceof GeminiError) {
    console.error('Gemini Error:', error.message)
  } else {
    console.error('Unexpected Gemini error:', error)
  }
}

function resetGame () {
  searchState.value.word = ''
  searchState.value.data = []
  geminiState.value.suggestions = []
}

watch(winner, () => {
  if (winner.value) return
  resetGame()
})

onMounted(async () => {
  try {
    const sellers = await getSellers();
    store.addSellers(sellers);
  } catch (error) {
    if (error instanceof SellersError) {
      console.error(error.message)
    }
    console.error('error inesperado', error)
  }
})
</script>

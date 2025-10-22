<template>
  <form @submit.prevent="$emit('search')" class="w-full max-w-[500px] sm:mt-10 mt-5">
    <InputVue :model-value="word.trim()" @update:model-value="$emit('update:word', $event)"
      @search-gemini="$emit('searchGemini', $event)" :disabled="isLoading"
      :is-gemini-suggestion-loading="isGeminiSuggestionLoading" :gemini-suggestion="geminiSuggestion" class="flex-1" />
  </form>
</template>

<script setup lang="ts">
import InputVue from '../InputVue.vue';

defineProps<{
  word: string
  isLoading: boolean
  isGeminiSuggestionLoading: boolean
  geminiSuggestion: string[]
}>()

defineEmits<{
  search: []
  'update:word': [value: string]
  'searchGemini': [value: string]
}>()
</script>

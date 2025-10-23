<template>
  <form id="form" @submit.prevent="$emit('search')" class="w-full max-w-[500px] sm:mt-7 mt-5">
    <InputVue :model-value="word.trim()" @update:model-value="$emit('update:word', $event)"
      @search-gemini="$emit('searchGemini', $event)" :disabled="isLoading"
      :is-gemini-suggestion-loading="isGeminiSuggestionLoading" :gemini-suggestion="geminiSuggestion" class="flex-1" />
  </form>
</template>

<script setup lang="ts">
import { driver } from 'driver.js'
import "driver.js/dist/driver.css";

import InputVue from '../InputVue.vue';
import { onMounted } from 'vue';

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

function startDrive () {
  const driverObj = driver({
    showProgress: false,
    popoverClass: 'driverjs-theme',
    allowClose: false,
    steps: [{
      element: '#form',
      popover: {
        title: 'Formulario de búsqueda',
        description: 'Aquí debe escribir la palabra que desea buscar y elija entre las tres opciones que más te guste.',
        side: 'top',
        align: 'end',
        showButtons: ['next'],
        nextBtnText: 'Siguiente'
      }
    }, {
      element: '#card-counter',
      popover: {
        title: 'Puntuación',
        description: 'Se muestra una lista de los vendedores, cada que selecciona una imagen, le da 3 puntos al vendedor de esta.',
        side: 'top',
        align: 'end',
        showButtons: ['next'],
        doneBtnText: 'Empezar a jugar'
      }
    }]
  });

  driverObj.drive();
}

onMounted(() => {
  startDrive();
});
</script>

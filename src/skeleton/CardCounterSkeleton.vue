<template>
  <div
    class="fixed right-5 z-10 bg-gray-100 py-3 px-4 rounded-lg flex flex-col gap-2 shadow-md transition-all duration-300 ease-in-out animate-pulse"
    :class="{
      'bottom-5': isMobile,
      'top-5': !isMobile,
      'w-52': !isMobile,
      'w-14': isMobile,
      'h-44': !isMobile
    }">
  </div>
</template>
<script lang="ts" setup>
import { useIsMobile } from '@/composable/useIsMobile';

const { isMobile } = useIsMobile()
</script>

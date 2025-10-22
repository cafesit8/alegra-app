import { ref, onMounted, onUnmounted } from 'vue'

export function useIsMobile() {
  const isMobile = ref(false)
  let mediaQuery: MediaQueryList

  const update = (e?: MediaQueryListEvent) => {
    isMobile.value = e ? e.matches : mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 640px)')
    update()
    mediaQuery.addEventListener('change', update)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', update)
  })

  return { isMobile }
}

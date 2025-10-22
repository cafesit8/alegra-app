import { ref, watch } from 'vue'

export function useValueIncrease(getter: () => number, duration: number = 1000) {
  const shouldHighlight = ref(false)
  const previousValue = ref(getter())

  watch(
    getter,
    (newValue, oldValue) => {
      if (newValue > oldValue!) {
        shouldHighlight.value = true

        setTimeout(() => {
          shouldHighlight.value = false
        }, duration)
      }

      previousValue.value = newValue
    },
    { immediate: true },
  )

  return { shouldHighlight }
}

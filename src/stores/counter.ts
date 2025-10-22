import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Seller } from '@/types/sellers'
import { WINNER_POINTS } from '@/const'

export const useCounterStore = defineStore('counter', () => {
  const sellers = ref<Seller[]>([])
  const counter = ref<Array<{ points: number; seller?: Seller }>>([])

  const winner = computed(() => counter.value.find((c) => c.points >= WINNER_POINTS))

  const totalPoints = computed(() =>
    counter.value.reduce((acc, curr) => acc + (curr.points || 0), 0),
  )

  const reset = () => {
    const reset = counter.value.map((c) => ({ points: 0, seller: c.seller }))
    counter.value = reset
  }

  function addSellers(sellersArr: Seller[]) {
    sellers.value = sellersArr
    counter.value = sellersArr.map((s) => ({ points: 0, seller: s }))
  }

  function increment(id: string) {
    const slot = counter.value.find((c) => c.seller?.id === id)
    if (!slot) return
    slot.points = (slot.points ?? 0) + 3
  }
  return { counter, increment, winner, addSellers, sellers, totalPoints, reset }
})

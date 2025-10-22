import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Search', () => {
  let store: ReturnType<typeof useCounterStore>
  beforeEach(async () => {
    setActivePinia(createPinia())
    store = useCounterStore()
  })

  it('should complete full search and selection flow', async () => {
    const mockSellers = [
      { id: '1', name: 'Seller 1', identification: null, observations: null, status: 'active' },
      { id: '2', name: 'Seller 2', identification: null, observations: null, status: 'active' },
      { id: '3', name: 'Seller 3', identification: null, observations: null, status: 'active' },
    ]

    store.addSellers(mockSellers)

    expect(store.sellers).toHaveLength(3)
    expect(store.counter).toHaveLength(3)
    expect(store.counter[0].points).toBe(0)
    expect(store.counter[1].points).toBe(0)
    expect(store.counter[2].points).toBe(0)

    const sellerName = 'Seller 1'
    const sellerFound = store.sellers.find((s) => s.name === sellerName)

    expect(sellerFound).toBeTruthy()
    expect(sellerFound?.name).toBe(sellerName)

    const sellerId = sellerFound?.id
    expect(sellerId).toBeDefined()
    store.increment(sellerId!)

    expect(store.counter[0].points).toBe(3)
    expect(store.totalPoints).toBe(3)

    expect(store.counter[1].points).toBe(0)
    expect(store.counter[2].points).toBe(0)
  })
})

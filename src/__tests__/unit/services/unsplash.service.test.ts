import { getimageFromUnsplash } from '@/services/unsplash/unspash.service'
import { useCounterStore } from '@/stores/counter'
import { it, describe, expect } from 'vitest'

describe('Unsplash service', () => {
  const store = useCounterStore()
  const numberOfSellers = store.sellers.length

  it('should return an array of photos', async () => {
    const response = await getimageFromUnsplash('mountain', numberOfSellers)
    expect(Array.isArray(response)).toBe(true)
    expect(response).toHaveLength(3)
  })
})

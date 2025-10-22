import { getimageFromUnsplash } from '@/services/unsplash/unspash.service'
import { it, describe, expect } from 'vitest'

describe('Unsplash service', () => {
  it('should return an array of photos', async () => {
    const response = await getimageFromUnsplash('mountain')
    expect(Array.isArray(response)).toBe(true)
    expect(response).toHaveLength(3)
  })
})

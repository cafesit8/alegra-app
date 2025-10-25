import { describe, it, expect } from 'vitest'
import { getGeminiSuggestions } from '@/services/gemini/gemini.service'
import { getimageFromUnsplash } from '@/services/unsplash/unspash.service'
import { useCounterStore } from '@/stores/counter'

describe('Gemini and Unsplash integration', () => {
  const store = useCounterStore()
  const numberOfSellers = store.sellers.length

  it('should use gemini suggestions to search unsplash images', async () => {
    const suggestions = await getGeminiSuggestions('mountain')
    expect(suggestions).toHaveLength(3)

    const images = await getimageFromUnsplash(suggestions[0], numberOfSellers)
    expect(images).toHaveLength(3)

    expect(images[0].urls.raw).toBeDefined()
  }, 30000)

  it('should handle the complete search flow', async () => {
    const searchTerm = 'mountain'

    const suggestions = await getGeminiSuggestions(searchTerm)
    const firstSuggestion = suggestions[0]

    const images = await getimageFromUnsplash(firstSuggestion, numberOfSellers)

    expect(suggestions).toBeDefined()
    expect(images).toBeDefined()
    expect(images.length).toBeGreaterThan(0)
  }, 30000)
})

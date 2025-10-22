import { getGeminiSuggestions } from '@/services/gemini/gemini.service'
import { it, expect, describe } from 'vitest'

describe('Gemini service', () => {
  it('should return an array of strings', async () => {
    const suggestions = await getGeminiSuggestions('casa')
    expect(Array.isArray(suggestions)).toBe(true)
    expect(suggestions).toHaveLength(3)
  })
})

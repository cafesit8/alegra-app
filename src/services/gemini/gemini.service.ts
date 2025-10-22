import { GEMINI_MODEL } from './const'
import { GeminiError } from './handle-errors'
import { GEMINI_API_KEY } from '@/enviroment'

export async function getGeminiSuggestions(word: string): Promise<string[]> {
  const { GoogleGenAI } = await import('@google/genai')
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  })

  try {
    if (!word) throw new GeminiError('Word is required')
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Para la búsqueda "${word}", genera 3 sugerencias relacionadas para imágenes.
      Responde SOLO con las 3 sugerencias separadas por "|".
      Ejemplo: "sugerencia1|sugerencia2|sugerencia3"`,
    })
    const text = response.text?.trim() || ''
    if (!text) throw new GeminiError('No hay sugerencias')

    return text
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
  } catch (error) {
    if (error instanceof GeminiError) {
      console.error(error.message)
    }
    throw new GeminiError('Error inesperado', undefined, error)
  }
}

import { URL_UNSPLASH } from '@/const'
import { UnsplashError, validateUnsplashErros } from './handle-erros'
import { Image, RootUnsplash } from '@/types/unsplash'
import { KEY_UNSPLASH } from '@/enviroment'

export async function getimageFromUnsplash(
  word: string,
  numberOfSellers: number,
): Promise<Image[]> {
  try {
    const URL = `${URL_UNSPLASH}?page=1&per_page=${numberOfSellers}&orientation=landscape&query=${word}`

    validateUnsplashErros(word)

    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: `Client-ID ${KEY_UNSPLASH}`,
      },
    })

    if (!response.ok) {
      let errorDetails: unknown
      try {
        errorDetails = await response.json()
      } catch {
        errorDetails = await response.text()
      }

      throw new UnsplashError(
        'Unsplash API request failed with status ' + response.status,
        response.status,
        errorDetails,
      )
    }

    const data: RootUnsplash = await response.json()

    if (!data.results.length) throw new UnsplashError('Unsplash API no results', response.status)
    if (data.results.length < numberOfSellers)
      throw new UnsplashError('Unsplash API no enough results', response.status)

    return data.results
  } catch (error) {
    if (error instanceof UnsplashError) {
      throw error
    }

    throw new UnsplashError(
      'Network error occurred while getting images from Unsplash',
      undefined,
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

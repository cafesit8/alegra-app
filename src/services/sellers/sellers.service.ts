import { MAIN_URL_API_ALEGRA } from '@/const'
import type { Seller } from '@/types/sellers'
import { SellersError } from './handle.erros'
import { AUTHORIZATION_ALEGRA } from '@/enviroment'

const END_POINT = '/sellers'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: AUTHORIZATION_ALEGRA,
  },
}

export async function getSellers(): Promise<Seller[]> {
  const url = `${MAIN_URL_API_ALEGRA}${END_POINT}`
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorDetails: unknown
      try {
        errorDetails = await response.json()
      } catch {
        errorDetails = await response.text()
      }

      throw new SellersError(
        `Sellers API request failed with status ${response.status}`,
        response.status,
        errorDetails,
      )
    }

    const sellers = await response.json()
    return sellers
  } catch (error) {
    if (error instanceof SellersError) {
      throw error
    }

    throw new SellersError(
      'Network error occurred while getting sellers',
      undefined,
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

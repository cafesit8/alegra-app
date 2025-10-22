import { getSellers } from '@/services/sellers/sellers.service'
import { it, describe, expect } from 'vitest'

describe('Sellers service', () => {
  it('should return an array of sellers', async () => {
    const response = await getSellers()
    expect(Array.isArray(response)).toBe(true)
    expect(response).toHaveLength(3)
  })
})

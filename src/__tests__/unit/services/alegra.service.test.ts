import { createInvoice } from '@/services/alegra/alegra.service'
import { it, expect, describe } from 'vitest'

describe('Alegra service', () => {
  it('should return an invoice', async () => {
    const invoice = await createInvoice({
      quantity: 21,
      date: new Date().toISOString().split('T')[0]!.toString(),
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        .toISOString()
        .split('T')[0]!
        .toString(),
    })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBeDefined()
    expect(invoice.date).toBeDefined()
    expect(invoice.dueDate).toBeDefined()
    expect(invoice.status).toBeDefined()
    expect(invoice.total).toBeDefined()
    expect(invoice.client).toBeDefined()
    expect(invoice.items).toBeDefined()
  })
})

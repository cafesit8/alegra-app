import type { CreateInvoiceParams } from '../../types/invoice'

export class InvoiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'InvoiceError'
  }
}

export const validateInvoiceParams = (params: CreateInvoiceParams): void => {
  const { quantity, date, dueDate } = params

  if (quantity <= 20) {
    throw new InvoiceError('Quantity must be 20 or more')
  }

  if (!date || !dueDate) {
    throw new InvoiceError('Date and due date are required')
  }

  const invoiceDate = new Date(date)
  const invoiceDueDate = new Date(dueDate)

  if (invoiceDueDate < invoiceDate) {
    throw new InvoiceError('Due date cannot be earlier than invoice date')
  }

  if (invoiceDate > new Date()) {
    throw new InvoiceError('Invoice date cannot be in the future')
  }
}

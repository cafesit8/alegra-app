interface InvoiceItem {
  id: string
  name: string
  price: number
  quantity: number
  description: string
}

interface InvoiceRequest {
  operationType: string
  client: { id: string }
  items: InvoiceItem[]
  date: string
  dueDate: string
}

export interface CreateInvoiceParams {
  quantity: number
  date: string
  dueDate: string
  clientId?: string
  itemId?: string
  itemName?: string
}

interface InvoiceResponse {
  id: string
  number: string
  status: string
  total: number
  [key: string]: unknown
}

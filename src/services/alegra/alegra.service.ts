import { MAIN_URL_API_ALEGRA, UNIT_PRICE_DEFAULT } from '@/const'
import {
  DEFAULT_CLIENT_ID,
  DEFAULT_ITEM_ID,
  DEFAULT_ITEM_NAME,
  INVOICE_ENDPOINT,
  OPERATION_TYPE,
} from './cosnt'
import { InvoiceError, validateInvoiceParams } from './handle-errors'
import type { CreateInvoiceParams, InvoiceRequest, InvoiceResponse } from '../../types/invoice'
import { AUTHORIZATION_ALEGRA } from '@/enviroment'

export async function createInvoice({
  quantity,
  date,
  dueDate,
  clientId = DEFAULT_CLIENT_ID,
  itemId = DEFAULT_ITEM_ID,
  itemName = DEFAULT_ITEM_NAME,
}: CreateInvoiceParams): Promise<InvoiceResponse> {
  validateInvoiceParams({ quantity, date, dueDate, clientId, itemId, itemName })

  const url = `${MAIN_URL_API_ALEGRA}${INVOICE_ENDPOINT}`

  const body: InvoiceRequest = {
    operationType: OPERATION_TYPE,
    client: { id: clientId },
    items: [
      {
        id: itemId,
        name: itemName,
        price: UNIT_PRICE_DEFAULT,
        quantity,
        description: 'Factura generada automáticamente por la app del reto técnico',
      },
    ],
    date,
    dueDate,
  }

  const options: RequestInit = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: AUTHORIZATION_ALEGRA,
    },
    body: JSON.stringify(body),
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorDetails: unknown
      try {
        errorDetails = await response.json()
      } catch {
        errorDetails = await response.text()
      }

      throw new InvoiceError(
        `Invoice API request failed with status ${response.status}`,
        response.status,
        errorDetails,
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof InvoiceError) {
      throw error
    }

    throw new InvoiceError(
      'Network error occurred while creating invoice',
      undefined,
      error instanceof Error ? error.message : 'Unknown error',
    )
  }
}

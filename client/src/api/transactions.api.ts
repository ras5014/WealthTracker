import api from "@/lib/axios"

import { transactionsResponseSchema, type TransactionsResponse } from "shared"

export const getTransactions = async (): Promise<TransactionsResponse> => {
  const response = await api.get("/transactions")
  return transactionsResponseSchema.parse(response.data)
}

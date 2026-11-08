import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getTransactions } from "@/api/transactions.api"

export const useTransactions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
    select: (response) => response.data,
  })

  return { data, isLoading, isError, error }
}

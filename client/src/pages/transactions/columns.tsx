import { createColumnHelper } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/components/custom/data-table/DataTableFeatures"
import type { Transaction } from "shared"
import { cn } from "@/lib/utils"

const columnHelper = createColumnHelper<DataTableFeatures, Transaction>()

export const columns = columnHelper.columns([
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount
      const type = row.original.transactionType
      return (
        <div
          className={cn(
            "font-medium",
            type === "Expense" ? "text-red-500" : "text-green-500"
          )}
        >
          ₹{Number(amount).toLocaleString("en-IN")}
        </div>
      )
    },
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("subCategory", {
    header: "Subcategory",
  }),
  columnHelper.accessor("note", {
    header: "Note",
  }),
])

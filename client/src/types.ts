import type { LucideIcon } from "lucide-react"
import { z } from "zod"

export type NavItem = {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

// Form Schemas
// Expense Form Schema
export const expenseFormSchema = z.object({
  amount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  paymentMethod: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  date: z.date(),
  description: z.string().trim().min(1, "Description is required"),
  note: z.string().optional(),
  savingsAccount: z.string().optional(),
  creditCardList: z.string().optional(),
})

// Income Form Schema
export const incomeFormSchema = z.object({
  amount: z.coerce.number().min(0, "Amount must be greater than or equal to 0"),
  date: z.date(),
  description: z.string().trim().min(1, "Description is required"),
  note: z.string().optional(),
  creditedTo: z.enum(["savingsAccount", "creditCard"]),
  savingsAccount: z.string().optional(),
  creditCardList: z.string().optional(),
})

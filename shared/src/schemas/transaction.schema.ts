import { z } from "zod";

// Transaction schema
export const transactionSchema = z.object({
  id: z.uuid(),
  description: z.string(),
  amount: z.number().positive(),
  date: z.date(),
  category: z.string(),
  subCategory: z.string(),
  paymentMethod: z.enum(["Credit Card", "Bank Account", "Other"]),
  creditedTo: z.string().optional(), // Incase of income
  savingsAccount: z.string().optional(),
  creditCard: z.string().optional(),
  note: z.string().optional(),
});

// Transaction type
export type Transaction = z.infer<typeof transactionSchema>;

// Expense schema
export const expenseSchema = transactionSchema.omit({
  creditedTo: true,
});

// Expense type
export type Expense = z.infer<typeof expenseSchema>;

// Income schema
export const incomeSchema = transactionSchema.omit({
  category: true,
  subCategory: true,
  paymentMethod: true,
});

// Income type
export type Income = z.infer<typeof incomeSchema>;

// Transaction Response Schema
export const transactionsResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.array(transactionSchema),
});

// Transaction Response type
export type TransactionsResponse = z.infer<typeof transactionsResponseSchema>;

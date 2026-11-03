import { Transaction, CreateTransaction } from "shared";
import { db } from "../db/connection";
import { transaction } from "../db/schema";

export const getAllTransactions = async () => {
  return await db.select().from(transaction);
};

export const createTransaction = async (
  transactionData: CreateTransaction,
): Promise<Transaction> => {
  const [res] = await db
    .insert(transaction)
    .values(transactionData)
    .returning();

  return {
    ...res,
    category: res.category ?? "",
    subCategory: res.subCategory ?? "",
    paymentMethod: res.paymentMethod as Transaction["paymentMethod"],
    creditedTo: res.creditedTo ?? undefined,
    savingsAccount: res.savingsAccount ?? undefined,
    creditCard: res.creditCard ?? undefined,
    note: res.note ?? undefined,
  };
};

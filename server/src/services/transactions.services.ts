import { Transaction, CreateTransaction } from "shared";
import { db } from "../db/connection";
import { transaction } from "../db/schema";

export const getAllTransactions = async () => {
  return await db.select().from(transaction);
};

export const createTransaction = async (
  transactionData: CreateTransaction,
): Promise<Transaction> => {
  const [createdTransaction] = await db
    .insert(transaction)
    .values(transactionData)
    .returning();
  return createdTransaction;
};

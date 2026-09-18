import { db } from "../db/connection";
import { transaction } from "../db/schema";
import { eq } from "drizzle-orm";
import { transactionInsertSchema, transactionSelectSchema } from "../db/schema";
import { z } from "zod";

export const getAllTransactions = async () => {
  return await db.select().from(transaction);
};

export const createTransaction = async (
  transactionData: z.infer<typeof transactionInsertSchema>,
): Promise<z.infer<typeof transactionSelectSchema>> => {
  const [createdTransaction] = await db
    .insert(transaction)
    .values(transactionData)
    .returning();
  return createdTransaction;
};

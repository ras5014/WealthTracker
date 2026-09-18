import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

// Users table - core authentication and profile
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Transactions
export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "credit_card",
  "debit_card",
  "upi",
  "net_banking",
  "self_transfer",
  "bank_transfer",
  "other",
]);
export const creditedToEnum = pgEnum("credited_to", [
  "savings_account",
  "credit_card",
]);
export const transaction = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  amount: integer("amount").notNull(),
  category: varchar("category", { length: 100 }),
  subCategory: varchar("sub_category", { length: 100 }),
  paymentMethod: paymentMethodEnum("payment_method"),
  creditedTo: creditedToEnum("credited_to"),
  creditCard: varchar("credit_card", { length: 50 }),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transactionSelectSchema = createSelectSchema(transaction);
export const transactionInsertSchema = createInsertSchema(transaction);

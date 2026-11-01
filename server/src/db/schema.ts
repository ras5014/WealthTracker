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
const transactionTypeEnum = pgEnum("transaction_type", ["Income", "Expense"]);

export const transaction = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  date: date("date", { mode: "date" }).notNull(),
  category: varchar("category", { length: 100 }),
  subCategory: varchar("sub_category", { length: 100 }),
  paymentMethod: varchar("payment_method", { length: 50 }),
  creditedTo: varchar("credited_to", { length: 50 }),
  savingsAccount: varchar("savings_account", { length: 50 }),
  creditCard: varchar("credit_card", { length: 50 }),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

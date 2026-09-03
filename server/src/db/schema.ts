import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  date,
  pgEnum,
  index,
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

export const userRelations = relations(users, ({ many }) => ({
  transactions: many(transaction),
}));

// Transactions
export const transactionTypeEnum = pgEnum("transaction_type", [
  "debit",
  "credit",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "credit_card",
  "debit_card",
  "upi",
  "other",
]);
export const creditedToEnum = pgEnum("credited_to", [
  "savings_account",
  "credit_card",
]);
export const transaction = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    description: text("description").notNull(),
    transactionType: transactionTypeEnum("transaction_type")
      .default("debit")
      .notNull(),
    amount: integer("amount").notNull(),
    category: varchar("category", { length: 100 }),
    subCategory: varchar("sub_category", { length: 100 }),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    creditedTo: creditedToEnum("credited_to").notNull(),
    creditCard: varchar("credit_card", { length: 50 }),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userDateIndex: index("transactions_user_date_idx").on(
      table.userId,
      table.date,
    ),
    userTypeIndex: index("transactions_user_type_idx").on(
      table.userId,
      table.transactionType,
    ),
  }),
);

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(users, {
    fields: [transaction.userId],
    references: [users.id],
  }),
}));

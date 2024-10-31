import {
	mysqlTable,
	serial,
	text,
	int,
	varchar,
	datetime,
	decimal,
	mysqlEnum
} from 'drizzle-orm/mysql-core';
import { relations, sql } from 'drizzle-orm';

// Enums
export const transactionTypeEnum = mysqlEnum('transaction_type', ['INCOME', 'EXPENSE']);
export const categoryTypeEnum = mysqlEnum('category_type', ['INCOME', 'EXPENSE']);

// User Table
export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

// Session Table
export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

// Category Table
export const categories = mysqlTable('categories', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	type: categoryTypeEnum('type').default('EXPENSE')
});

// Transaction Table
export const transactions = mysqlTable('transactions', {
	id: serial('id').primaryKey(),
	createdAt: datetime('created_at').default(sql`now()`),
	updatedAt: datetime('updated_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
	type: transactionTypeEnum('type').default('EXPENSE'),
	amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
	description: text('description'),
	categoryId: int('category_id').references(() => categories.id, { onDelete: 'cascade' }),
	userId: varchar('user_id', { length: 255 }).references(() => user.id, { onDelete: 'cascade' })
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
	transactions: many(transactions),
	sessions: many(session)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	transactions: many(transactions)
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
	category: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	}),
	user: one(user, {
		fields: [transactions.userId],
		references: [user.id]
	})
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

// Type Exports
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;

import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core/primary-keys';
import { AdapterAccountType, ShippingAddress, userRoleEnum } from '../../types/index.js';

// Import related schemas for relations
import { orders } from './orders.schema.js';
import { reviews } from './reviews.schema.js';
import { wishlists } from './wishlists.schema.js';
import { carts } from './carts.schema.js'; // Needed for cartsRelations

// USERS & AUTH
export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull().default('NO_NAME'),
    email: text('email').notNull(),
    role: userRoleEnum('role').notNull().default('user'),
    password: text('password'),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    phoneNumber: varchar('phone_number', { length: 20 }),
    bio: text('bio'),
    preferences: jsonb('preferences').default({}),
    lastLoginAt: timestamp('last_login_at'),
    addresses: jsonb('addresses').$type<ShippingAddress[]>().default([]),
    defaultPaymentMethod: text('default_payment_method'),
    marketingOptIn: boolean('marketing_opt_in').default(false),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userEmailIdx: uniqueIndex('user_email_idx').on(table.email),
    }
  }
);

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (account) => ({
    providerPk: uniqueIndex('provider_pk').on(account.provider, account.providerAccountId),
    userIdx: index('accounts_user_id_idx').on(account.userId),
  })
);

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  data: jsonb('data'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (session) => ({
  userIdx: index('sessions_user_id_idx').on(session.userId),
  expiresIdx: index('sessions_expires_idx').on(session.expires),
}));

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    expiresIdx: index('verification_tokens_expires_idx').on(vt.expires),
  })
);

// RELATIONSHIPS
export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  orders: many(orders),
  reviews: many(reviews),
  wishlists: many(wishlists),
  // carts: many(carts) // Assuming one user might have multiple carts over time, though typically one active cart. Adjust if needed.
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// Note: orderHistoryRelations depends on users, defined in orders.schema.ts
// Note: reviewsRelations depends on users, defined in reviews.schema.ts
// Note: wishlistsRelations depends on users, defined in wishlists.schema.ts
// Note: cartsRelations depends on users, defined in carts.schema.ts

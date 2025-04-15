import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  index,
} from 'drizzle-orm/pg-core';

// COUPONS
export const coupons = pgTable(
  'coupons',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    code: text('code').notNull(),
    description: text('description'),
    discountType: text('discount_type').notNull().default('percentage'), // percentage, fixed_amount, free_shipping
    discountValue: decimal('discount_value', { precision: 12, scale: 2 }).notNull(),
    minimumSpend: decimal('minimum_spend', { precision: 12, scale: 2 }),
    maximumSpend: decimal('maximum_spend', { precision: 12, scale: 2 }),
    individualUseOnly: boolean('individual_use_only').default(false),
    excludeSaleItems: boolean('exclude_sale_items').default(false),
    usageLimit: integer('usage_limit'),
    usageLimitPerUser: integer('usage_limit_per_user'),
    usageCount: integer('usage_count').default(0),
    startDate: timestamp('start_date', { withTimezone: true }),
    endDate: timestamp('end_date', { withTimezone: true }),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => {
    return {
      couponCodeIdx: uniqueIndex('coupon_code_idx').on(table.code),
      isActiveIdx: index('coupons_is_active_idx').on(table.isActive),
      endDateIdx: index('coupons_end_date_idx').on(table.endDate),
    }
  }
);

// RELATIONSHIPS
// No explicit relations defined for coupons in the original schema.
// Potential relations could be added later if needed (e.g., linking coupons to specific products/categories or tracking usage per user).

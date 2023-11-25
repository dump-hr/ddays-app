import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const achievement = pgTable('achievement', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  points: integer('points').notNull(),
  fulfillmentCodeCount: integer('fulfillment_code_count').notNull(),
  isHidden: boolean('is_hidden').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const achievementRelations = relations(achievement, ({ many }) => ({
  codes: many(code),
}));

export const code = pgTable('code', {
  id: serial('id').primaryKey().notNull(),
  value: varchar('value', { length: 10 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  points: integer('points').notNull(),
  isActive: boolean('is_active').default(true),
  isSingleUse: boolean('is_single_use').default(false),
  hasPage: boolean('has_page').default(false),
  expirationDate: timestamp('expiration_date', { mode: 'string' }).defaultNow(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const codeRelations = relations(code, ({ many }) => ({
  achievement: many(achievement),
}));

export const achievementToCode = pgTable(
  'achievementToCode',
  {
    achievementId: integer('achievement_id')
      .notNull()
      .references(() => achievement.id),
    codeId: integer('code_id')
      .notNull()
      .references(() => code.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.achievementId, t.codeId] }),
  }),
);

export const achievementToCodeRelations = relations(
  achievementToCode,
  ({ one }) => ({
    achievement: one(achievement, {
      fields: [achievementToCode.achievementId],
      references: [achievement.id],
    }),
    code: one(code, {
      fields: [achievementToCode.codeId],
      references: [code.id],
    }),
  }),
);

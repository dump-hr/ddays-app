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
  fulfillmentCodeCount: integer('fulfillmentCodeCount').notNull(),
  isHidden: boolean('isHidden').default(false),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
});

export const achievementRelations = relations(achievement, ({ many }) => ({
  codes: many(code),
}));

export const code = pgTable('code', {
  id: serial('id').primaryKey().notNull(),
  value: varchar('value', { length: 10 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  points: integer('points').notNull(),
  isActive: boolean('isActive').default(true),
  isSingleUse: boolean('isSingleUse').default(false),
  hasPage: boolean('hasPage').default(false),
  expirationDate: timestamp('expirationDate', { mode: 'string' }).defaultNow(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
});

export const codeRelations = relations(code, ({ many }) => ({
  achievement: many(achievement),
}));

export const achievementToCode = pgTable(
  'achievementToCode',
  {
    achievementId: integer('achievementId')
      .notNull()
      .references(() => achievement.id),
    codeId: integer('codeId')
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

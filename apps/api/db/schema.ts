import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
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

export const sponsorCategory = pgEnum('sponsor_category', [
  'general',
  'gold',
  'silver',
  'bronze',
  'workshop',
  'foodAndBeverage',
  'generalMedia',
  'media',
  'organizational',
  'prizeGame',
  'friend',
]);

export const company = pgTable('company', {
  id: serial('id').primaryKey().notNull(),
  sponsorCategory: sponsorCategory('sponsor_category'),
  name: text('name'),
  description: text('description'),
  websiteUrl: text('website_url'),
  boothLocation: text('booth_location'),
  //TODO: add logoImage, landingImage ids to schema
  codeId: integer('code_id')
    .notNull()
    .references(() => code.id),
});

export const companyRelations = relations(company, ({ one }) => ({
  codes: one(code, {
    fields: [company.codeId],
    references: [code.id],
  }),
}));

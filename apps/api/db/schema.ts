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

export const eventTheme = pgEnum('event_theme', [
  'dev',
  'design',
  'tech',
  'marketing',
]);

export const eventType = pgEnum('event_type', [
  'lecture',
  'workshop',
  'flyTalk',
  'campfireTalk',
  'other',
]);
export const eventPlace = pgEnum('event_place', ['online', 'inPerson']);
export const event = pgTable('event', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  eventType: eventType('event_type').notNull(),
  eventTheme: eventTheme('event_theme').notNull(),
  eventPlace: eventPlace('event_place').notNull(),
  startsAt: timestamp('starts_at', { mode: 'string' }).notNull(),
  endsAt: timestamp('ends_at', { mode: 'string' }).notNull(),
  requirements: text('requirements').notNull(),
  footageLink: text('footage_link').notNull(),
  maxParticipants: integer('max_participants').notNull(),
  codeId: integer('code_id')
    .notNull()
    .references(() => code.id),
  //eventUsers, eventCompanies and eventInterests to be added after thoe entities are made
});

export const eventRelations = relations(event, ({ one }) => ({
  codes: one(code, {
    fields: [event.codeId],
    references: [code.id],
  }),
}));

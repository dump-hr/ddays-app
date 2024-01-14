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
  password: text('password').notNull(),
  sponsorCategory: sponsorCategory('sponsor_category'),
  name: text('name'),
  username: text('username').unique().notNull(),
  description: text('description'),
  websiteUrl: text('website_url'),
  boothLocation: text('booth_location'),
  logoImage: text('logo_image'),
  landingImage: text('landing_image'),
  companyVideo: text('company_video'),
  codeId: integer('code_id')
    .notNull()
    .references(() => code.id),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  codes: one(code, {
    fields: [company.codeId],
    references: [code.id],
  }),
  interest: many(interest),
  jobs: many(job),
}));

export const job = pgTable('job', {
  id: serial('id').primaryKey().notNull(),
  position: text('position').notNull(),
  location: text('location').notNull(),
  details: text('details').notNull(),
  //todo: requirements, benefits, link
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  companyId: integer('company_id')
    .notNull()
    .references(() => company.id),
});

export const jobRelations = relations(job, ({ one }) => ({
  company: one(company, {
    fields: [job.companyId],
    references: [company.id],
  }),
}));

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

export const event = pgTable('event', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  eventType: eventType('event_type'),
  eventTheme: eventTheme('event_theme'),
  startsAt: timestamp('starts_at', { mode: 'string' }).notNull(),
  endsAt: timestamp('ends_at', { mode: 'string' }),
  requirements: text('requirements'),
  footageLink: text('footage_link'),
  maxParticipants: integer('max_participants'),
  codeId: integer('code_id').references(() => code.id),
  //eventUsers, eventCompanies and eventInterests to be added after thoe entities are made
});

export const eventRelations = relations(event, ({ one, many }) => ({
  codes: one(code, {
    fields: [event.codeId],
    references: [code.id],
  }),
  interest: many(interest),
}));

export const frequentlyAskedQuestion = pgTable('frequentlyAskedQuestion', {
  id: serial('id').primaryKey().notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
});

export const interest = pgTable('interests', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  theme: eventTheme('theme').notNull(),
});

export const companyInterests = pgTable(
  'companyInterests',
  {
    companyId: integer('companyId')
      .notNull()
      .references(() => company.id, { onDelete: 'cascade' }),
    interestId: integer('interestId')
      .notNull()
      .references(() => interest.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.companyId, t.interestId] }),
  }),
);

export const eventInterests = pgTable(
  'eventInterests',
  {
    eventId: integer('eventId')
      .notNull()
      .references(() => event.id),
    interestId: integer('interestId')
      .notNull()
      .references(() => interest.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.interestId] }),
  }),
);

export const companyInterestsRelations = relations(
  companyInterests,
  ({ one }) => ({
    company: one(company, {
      fields: [companyInterests.companyId],
      references: [company.id],
    }),
    interest: one(interest, {
      fields: [companyInterests.interestId],
      references: [interest.id],
    }),
  }),
);

export const eventInterestsRelations = relations(eventInterests, ({ one }) => ({
  company: one(company, {
    fields: [eventInterests.eventId],
    references: [company.id],
  }),
  interest: one(interest, {
    fields: [eventInterests.interestId],
    references: [interest.id],
  }),
}));

export const surveyQuestionInputType = pgEnum('surveyQuestionInputType', [
  'input',
  'textarea',
  'rating',
]);

export const surveyQuestionType = pgEnum('surveyQuestionType', [
  'workshop',
  'lecture',
  'company',
]);

export const surveyQuestion = pgTable('surveyQuestion', {
  id: serial('id').primaryKey(),
  question: text('question'),
  description: text('description'),
  inputLabel: text('inputLabel'),
  surveyQuestionInputType: surveyQuestionInputType('inputType').notNull(),
  surveyQuestionType: surveyQuestionType('type').notNull(),
});

export const notification = pgTable('notification', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),
  content: text('description').notNull(),
  isActive: boolean('is_active').default(false),
  activatedAt: timestamp('activated_at', { mode: 'string' }),
});

// trigger

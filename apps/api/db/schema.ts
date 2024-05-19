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
} from 'drizzle-orm/pg-core';

export const achievement = pgTable('achievement', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  points: integer('points').default(0),
  fulfillmentCodeCount: integer('fulfillment_code_count'), // TODO: ???
  isHidden: boolean('is_hidden').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const achievementRelations = relations(achievement, ({ many }) => ({
  achievementToCode: many(achievementToCode),
}));

export const code = pgTable('code', {
  id: serial('id').primaryKey(),
  value: text('value').notNull(),
  description: text('description'),
  points: integer('points').default(0),
  isActive: boolean('is_active').default(true),
  isSingleUse: boolean('is_single_use').default(false),
  hasPage: boolean('has_page').default(false),
  expirationDate: timestamp('expiration_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const codeRelations = relations(code, ({ many }) => ({
  achievementToCode: many(achievementToCode),
}));

export const achievementToCode = pgTable(
  'achievement_to_code',
  {
    achievementId: integer('achievement_id')
      .notNull()
      .references(() => achievement.id, { onDelete: 'cascade' }),
    codeId: integer('code_id')
      .notNull()
      .references(() => code.id, { onDelete: 'cascade' }),
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

export const companyCategory = pgEnum('company_category', [
  'gold',
  'silver',
  'bronze',
  'media',
  'friend',
]);

export const company = pgTable('company', {
  id: serial('id').primaryKey(),
  password: text('password'),
  category: companyCategory('category'),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  description: text('description'),
  opportunitiesDescription: text('opportunities_description'),
  website: text('website_url'),
  logoImage: text('logo_image'),
  landingImage: text('landing_image'),
  landingImageCompanyCulture: text('landing_image_company_culture'),
  bookOfStandards: text('book_of_standards'),
  video: text('video'),
  codeId: integer('code_id').references(() => code.id),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  code: one(code, {
    fields: [company.codeId],
    references: [code.id],
  }),
  jobs: many(job),
  companyToInterest: many(companyToInterest),
  speaker: many(speaker),
  booth: one(booth),
}));

export const job = pgTable('job', {
  id: serial('id').primaryKey(),
  position: text('position').notNull(),
  location: text('location'),
  details: text('details').notNull(),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow(),
  companyId: integer('company_id')
    .notNull()
    .references(() => company.id, { onDelete: 'cascade' }),
});

export const jobRelations = relations(job, ({ one }) => ({
  company: one(company, {
    fields: [job.companyId],
    references: [company.id],
  }),
}));

export const theme = pgEnum('theme', ['dev', 'design', 'marketing', 'tech']);

export const eventType = pgEnum('event_type', [
  'lecture',
  'workshop',
  'flyTalk',
  'campfireTalk',
  'panel',
  'other',
]);

export const event = pgTable('event', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: eventType('type'),
  theme: theme('theme'),
  startsAt: text('starts_at').notNull(),
  endsAt: text('ends_at').notNull(),
  requirements: text('requirements'),
  footageLink: text('footage_link'),
  maxParticipants: integer('max_participants'),
  codeId: integer('code_id').references(() => code.id),
});

export const eventRelations = relations(event, ({ one, many }) => ({
  code: one(code, {
    fields: [event.codeId],
    references: [code.id],
  }),
  eventToInterest: many(eventToInterest),
  speakerToEvent: many(speakerToEvent),
}));

export const interest = pgTable('interest', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  theme: theme('theme').notNull(),
});

export const interestRelations = relations(interest, ({ many }) => ({
  companyToInterest: many(companyToInterest),
  eventToInterest: many(eventToInterest),
}));

export const companyToInterest = pgTable(
  'company_to_interest',
  {
    companyId: integer('company_id')
      .notNull()
      .references(() => company.id, { onDelete: 'cascade' }),
    interestId: integer('interest_id')
      .notNull()
      .references(() => interest.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.companyId, t.interestId] }),
  }),
);

export const companyToInterestRelations = relations(
  companyToInterest,
  ({ one }) => ({
    company: one(company, {
      fields: [companyToInterest.companyId],
      references: [company.id],
    }),
    interest: one(interest, {
      fields: [companyToInterest.interestId],
      references: [interest.id],
    }),
  }),
);

export const eventToInterest = pgTable(
  'event_to_interest',
  {
    eventId: integer('event_id')
      .notNull()
      .references(() => event.id, { onDelete: 'cascade' }),
    interestId: integer('interest_id')
      .notNull()
      .references(() => interest.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.interestId] }),
  }),
);

export const eventToInterestRelations = relations(
  eventToInterest,
  ({ one }) => ({
    event: one(event, {
      fields: [eventToInterest.eventId],
      references: [event.id],
    }),
    interest: one(interest, {
      fields: [eventToInterest.interestId],
      references: [interest.id],
    }),
  }),
);

export const frequentlyAskedQuestion = pgTable('frequently_asked_question', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
});

export const surveyQuestionInputType = pgEnum('survey_question_input_type', [
  'input',
  'textarea',
  'rating',
]);

export const surveyQuestionType = pgEnum('survey_question_type', [
  'workshop',
  'lecture',
  'company',
]);

export const surveyQuestion = pgTable('survey_question', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  description: text('description'),
  inputLabel: text('inputLabel'),
  inputType: surveyQuestionInputType('inputType').notNull(),
  type: surveyQuestionType('type').notNull(),
});

export const notification = pgTable('notification', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('description'),
  activatedAt: timestamp('activated_at'),
});

export const speaker = pgTable('speaker', {
  id: serial('id').primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  title: text('title').notNull(),
  companyId: integer('company_id').references(() => company.id),
  photo: text('photo'),
  instagram: text('instagram'),
  linkedin: text('linkedin'),
  description: text('description'),
});

export const speakerRelations = relations(speaker, ({ one, many }) => ({
  company: one(company, {
    fields: [speaker.companyId],
    references: [company.id],
  }),
  speakerToEvent: many(speakerToEvent),
}));

export const speakerToEvent = pgTable(
  'speaker_to_event',
  {
    speakerId: integer('speaker_id')
      .notNull()
      .references(() => speaker.id, { onDelete: 'cascade' }),
    eventId: integer('event_id')
      .notNull()
      .references(() => event.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.speakerId, t.eventId] }),
  }),
);

export const speakerToEventRelations = relations(speakerToEvent, ({ one }) => ({
  speaker: one(speaker, {
    fields: [speakerToEvent.speakerId],
    references: [speaker.id],
  }),
  event: one(event, {
    fields: [speakerToEvent.eventId],
    references: [event.id],
  }),
}));

export const booth = pgTable('booth', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  category: companyCategory('category'),
  companyId: integer('company_id')
    .references(() => company.id)
    .unique(),
});

export const boothRelations = relations(booth, ({ one }) => ({
  company: one(company, {
    fields: [booth.companyId],
    references: [company.id],
  }),
}));

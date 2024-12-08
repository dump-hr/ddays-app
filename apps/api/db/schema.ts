import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const companyCategory = pgEnum('company_category', [
  'gold',
  'silver',
  'bronze',
  'media',
  'friend',
]);

export const theme = pgEnum('theme', ['dev', 'design', 'marketing', 'tech']);

export const eventType = pgEnum('event_type', [
  'lecture',
  'workshop',
  'flyTalk',
  'campfireTalk',
  'panel',
  'other',
]);

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

export const shopItemType = pgEnum('shop_item_type', [
  'mug',
  'shirt',
  'hoodie',
  'sticker',
]);

export const shoppingCartItemStage = pgEnum('shopping_cart_item_stage', [
  'collected',
  'uncollected',
]);

export const colors = pgEnum('colors', [
  'yellow',
  'orange',
  'brown',
  'purple',
  'green',
  'white',
  'red',
  'gray',
]);

export const face = pgEnum('face', [
  'default',
  'eyelashes',
  'angry',
  'crying',
  'mustache',
  'nose_ring',
  'tattoo',
  'mole',
]);

export const accessory = pgEnum('accessory', [
  'default',
  'sunglasses',
  'crown',
  'angel',
  'beret',
  'ninja',
  'headphones',
  'flower',
]);

export const body = pgEnum('body', [
  'default',
  'scarf',
  'chain',
  'basketball',
  'macbook',
  'sunflower',
  'cats',
  'dumbell',
]);

export const notificationStatus = pgEnum('notification_status', [
  'pending',
  'delivered',
  'read',
]);

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

export const companyToFlyTalk = pgTable(
  'company_to_fly_talk',
  {
    companyId: integer('company_id').references(() => company.id),
    eventId: integer('event_id').references(() => event.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.companyId, t.eventId] }),
  }),
);

export const companyToFlyTalkRelations = relations(
  companyToFlyTalk,
  ({ one }) => ({
    company: one(company, {
      fields: [companyToFlyTalk.companyId],
      references: [company.id],
    }),
    event: one(event, {
      fields: [companyToFlyTalk.eventId],
      references: [event.id],
    }),
  }),
);

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
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  createdByUserId: integer('created_by_user_id').references(() => user.id),
  eventId: integer('event_id').references(() => event.id),
  isActive: boolean('is_active').default(true),
});

export const userNotification = pgTable(
  'user_notification',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => user.id),
    notificationId: integer('notification_id')
      .notNull()
      .references(() => notification.id),
    status: notificationStatus('status').notNull().default('pending'),
    deliveredAt: timestamp('delivered_at'),
    readAt: timestamp('read_at'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.notificationId] }),
  }),
);

export const userNotificationRelations = relations(
  userNotification,
  ({ one }) => ({
    user: one(user, {
      fields: [userNotification.userId],
      references: [user.id],
    }),
    notification: one(notification, {
      fields: [userNotification.notificationId],
      references: [notification.id],
    }),
  }),
);

export const notificationRelations = relations(
  notification,
  ({ one, many }) => ({
    createdByUser: one(user, {
      fields: [notification.createdByUserId],
      references: [user.id],
    }),
    event: one(event, {
      fields: [notification.eventId],
      references: [event.id],
    }),
    userNotifications: many(userNotification),
  }),
);

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

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull().unique(),
  yearOfBirth: integer('year_of_birth').notNull(),
  occupation: text('occupation'),
  password: text('password'),
  points: integer('points'),
  newsletterConsent: boolean('newsletter_consent'),
  companiesNewsletterConsent: boolean('companies_newsletter_consent'),
  isDeleted: boolean('is_deleted'),
  profilePhotoUrl: text('profile_photo_url'),
});

export const avatar = pgTable('avatar', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id),
  color: colors('color'),
  face: face('face'),
  accessory: accessory('accessory'),
  body: body('body'),
});

export const avatarRelations = relations(avatar, ({ one }) => ({
  user: one(user, {
    fields: [avatar.userId],
    references: [user.id],
  }),
}));

export const userToEvent = pgTable(
  'user_to_event',
  {
    userId: integer('user_id').references(() => user.id),
    eventId: integer('event_id').references(() => event.id),
    linkedinProfile: text('linkedin_profile'),
    githubProfile: text('github_profile'),
    portfolioProfile: text('portfolio_profile'),
    cv: text('cv'),
    description: text('description'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.eventId] }),
  }),
);

export const userToEventRelations = relations(userToEvent, ({ one }) => ({
  user: one(user, {
    fields: [userToEvent.userId],
    references: [user.id],
  }),
  event: one(event, {
    fields: [userToEvent.eventId],
    references: [event.id],
  }),
}));

export const userToInterest = pgTable(
  'user_to_interest',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => user.id),
    interestId: integer('interest_id')
      .notNull()
      .references(() => interest.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.interestId] }),
  }),
);

export const userToInterestRelations = relations(userToInterest, ({ one }) => ({
  user: one(user, {
    fields: [userToInterest.userId],
    references: [user.id],
  }),
  interest: one(interest, {
    fields: [userToInterest.interestId],
    references: [interest.id],
  }),
}));

export const userToAchievement = pgTable(
  'user_to_achievement',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => user.id),
    achievementId: integer('achievement_id')
      .notNull()
      .references(() => achievement.id),
    timeOfAchievement: timestamp('time_of_achievement'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.achievementId] }),
  }),
);

export const userToAchievementRelations = relations(
  userToAchievement,
  ({ one }) => ({
    user: one(user, {
      fields: [userToAchievement.userId],
      references: [user.id],
    }),
    achievement: one(achievement, {
      fields: [userToAchievement.achievementId],
      references: [achievement.id],
    }),
  }),
);

export const shopItem = pgTable('shop_item', {
  id: serial('id').primaryKey(),
  type: shopItemType('type'),
  itemName: text('item_name'),
  quantity: integer('quantity'),
  price: integer('price'),
});

export const shoppingCart = pgTable(
  'shopping_cart',
  {
    shopItemId: integer('shop_item_id').references(() => shopItem.id),
    userId: integer('user_id').references(() => user.id),
    quantity: integer('quantity'),
    stage: shoppingCartItemStage('stage'),
    orderedAt: timestamp('ordered_at'),
    takeByTime: timestamp('take_by_time'),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.shopItemId] }),
  }),
);

export const shoppingCartRelations = relations(shoppingCart, ({ one }) => ({
  shopItem: one(shopItem, {
    fields: [shoppingCart.shopItemId],
    references: [shopItem.id],
  }),
  user: one(user, {
    fields: [shoppingCart.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  userToEvent: many(userToEvent),
  userToInterest: many(userToInterest),
  userToAchievement: many(userToAchievement),
  avatar: many(avatar),
  userNotifications: many(userNotification),
  notifications: many(notification),
  shoppingCart: many(shoppingCart),
}));

export const notificationTemplate = pgTable('notification_template', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  titleTemplate: text('title_template').notNull(),
  contentTemplate: text('content_template').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const rating = pgTable('rating', {
  id: serial('id').primaryKey(),
  userId: integer('user_id'),
  boothId: integer('booth_id').references(() => booth.id),
  eventId: integer('event_id').references(() => event.id),
  grades: json('grades'),
  comment: text('comment'),
});

export const ratingRelations = relations(rating, ({ one }) => ({
  booth: one(booth, {
    fields: [rating.boothId],
    references: [booth.id],
  }),
  event: one(event, {
    fields: [rating.eventId],
    references: [event.id],
  }),
}));

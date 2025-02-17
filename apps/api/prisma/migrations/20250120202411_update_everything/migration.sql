/*
  Warnings:

  - You are about to drop the `achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `achievement_to_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_to_fly_talk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_to_interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_to_interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `frequently_asked_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shop_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shopping_cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `speaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `speaker_to_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `survey_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_interest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Accessory" AS ENUM ('DEFAULT', 'SUNGLASSES', 'CROWN', 'ANGEL', 'BERET', 'NINJA', 'HEADPHONES', 'FLOWER');

-- CreateEnum
CREATE TYPE "Body" AS ENUM ('DEFAULT', 'SCARF', 'CHAIN', 'BASKETBALL', 'MACBOOK', 'SUNFLOWER', 'CATS', 'DUMBELL');

-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('YELLOW', 'ORANGE', 'BROWN', 'PURPLE', 'GREEN', 'WHITE', 'RED', 'GRAY');

-- CreateEnum
CREATE TYPE "CompanyCategory" AS ENUM ('GOLD', 'SILVER', 'BRONZE', 'MEDIA', 'FRIEND');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LECTURE', 'WORKSHOP', 'FLY_TALK', 'CAMPFIRE_TALK', 'PANEL', 'OTHER');

-- CreateEnum
CREATE TYPE "Face" AS ENUM ('DEFAULT', 'EYELASHES', 'ANGRY', 'CRYING', 'MUSTACHE', 'NOSE_RING', 'TATTOO', 'MOLE');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'DELIVERED', 'READ');

-- CreateEnum
CREATE TYPE "ShopItemType" AS ENUM ('MUG', 'SHIRT', 'HOODIE', 'STICKER');

-- CreateEnum
CREATE TYPE "ShoppingCartItemStage" AS ENUM ('COLLECTED', 'UNCOLLECTED');

-- CreateEnum
CREATE TYPE "SurveyQuestionInputType" AS ENUM ('INPUT', 'TEXTAREA', 'RATING');

-- CreateEnum
CREATE TYPE "SurveyQuestionType" AS ENUM ('WORKSHOP', 'LECTURE', 'COMPANY');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DEV', 'DESIGN', 'MARKETING', 'TECH');

-- DropForeignKey
ALTER TABLE "achievement_to_code" DROP CONSTRAINT "achievement_to_code_achievement_id_achievement_id_fk";

-- DropForeignKey
ALTER TABLE "achievement_to_code" DROP CONSTRAINT "achievement_to_code_code_id_code_id_fk";

-- DropForeignKey
ALTER TABLE "avatar" DROP CONSTRAINT "avatar_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "booth" DROP CONSTRAINT "booth_company_id_company_id_fk";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_code_id_code_id_fk";

-- DropForeignKey
ALTER TABLE "company_to_fly_talk" DROP CONSTRAINT "company_to_fly_talk_company_id_company_id_fk";

-- DropForeignKey
ALTER TABLE "company_to_fly_talk" DROP CONSTRAINT "company_to_fly_talk_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "company_to_interest" DROP CONSTRAINT "company_to_interest_company_id_company_id_fk";

-- DropForeignKey
ALTER TABLE "company_to_interest" DROP CONSTRAINT "company_to_interest_interest_id_interest_id_fk";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_code_id_code_id_fk";

-- DropForeignKey
ALTER TABLE "event_to_interest" DROP CONSTRAINT "event_to_interest_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "event_to_interest" DROP CONSTRAINT "event_to_interest_interest_id_interest_id_fk";

-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_company_id_company_id_fk";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_created_by_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_booth_id_booth_id_fk";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_shop_item_id_shop_item_id_fk";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "speaker" DROP CONSTRAINT "speaker_company_id_company_id_fk";

-- DropForeignKey
ALTER TABLE "speaker_to_event" DROP CONSTRAINT "speaker_to_event_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "speaker_to_event" DROP CONSTRAINT "speaker_to_event_speaker_id_speaker_id_fk";

-- DropForeignKey
ALTER TABLE "user_notification" DROP CONSTRAINT "user_notification_notification_id_notification_id_fk";

-- DropForeignKey
ALTER TABLE "user_notification" DROP CONSTRAINT "user_notification_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_achievement" DROP CONSTRAINT "user_to_achievement_achievement_id_achievement_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_achievement" DROP CONSTRAINT "user_to_achievement_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_event" DROP CONSTRAINT "user_to_event_event_id_event_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_event" DROP CONSTRAINT "user_to_event_user_id_user_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_interest" DROP CONSTRAINT "user_to_interest_interest_id_interest_id_fk";

-- DropForeignKey
ALTER TABLE "user_to_interest" DROP CONSTRAINT "user_to_interest_user_id_user_id_fk";

-- DropTable
DROP TABLE "achievement";

-- DropTable
DROP TABLE "achievement_to_code";

-- DropTable
DROP TABLE "avatar";

-- DropTable
DROP TABLE "booth";

-- DropTable
DROP TABLE "code";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "company_to_fly_talk";

-- DropTable
DROP TABLE "company_to_interest";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_to_interest";

-- DropTable
DROP TABLE "frequently_asked_question";

-- DropTable
DROP TABLE "interest";

-- DropTable
DROP TABLE "job";

-- DropTable
DROP TABLE "notification";

-- DropTable
DROP TABLE "notification_template";

-- DropTable
DROP TABLE "rating";

-- DropTable
DROP TABLE "shop_item";

-- DropTable
DROP TABLE "shopping_cart";

-- DropTable
DROP TABLE "speaker";

-- DropTable
DROP TABLE "speaker_to_event";

-- DropTable
DROP TABLE "survey_question";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_notification";

-- DropTable
DROP TABLE "user_to_achievement";

-- DropTable
DROP TABLE "user_to_event";

-- DropTable
DROP TABLE "user_to_interest";

-- DropEnum
DROP TYPE "accessory";

-- DropEnum
DROP TYPE "body";

-- DropEnum
DROP TYPE "colors";

-- DropEnum
DROP TYPE "company_category";

-- DropEnum
DROP TYPE "event_type";

-- DropEnum
DROP TYPE "face";

-- DropEnum
DROP TYPE "notification_status";

-- DropEnum
DROP TYPE "shop_item_type";

-- DropEnum
DROP TYPE "shopping_cart_item_stage";

-- DropEnum
DROP TYPE "survey_question_input_type";

-- DropEnum
DROP TYPE "survey_question_type";

-- DropEnum
DROP TYPE "theme";

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER DEFAULT 0,
    "fulfillmentCodeCount" INTEGER,
    "isHidden" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementToCode" (
    "achievementId" INTEGER NOT NULL,
    "codeId" INTEGER NOT NULL,

    CONSTRAINT "AchievementToCode_pkey" PRIMARY KEY ("achievementId","codeId")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "color" "Colors",
    "face" "Face",
    "accessory" "Accessory",
    "body" "Body",

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CompanyCategory",
    "companyId" INTEGER,

    CONSTRAINT "Booth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "isSingleUse" BOOLEAN DEFAULT false,
    "hasPage" BOOLEAN DEFAULT false,
    "expirationDate" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "category" "CompanyCategory",
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT,
    "opportunitiesDescription" TEXT,
    "websiteUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "logoImage" TEXT,
    "landingImage" TEXT,
    "landingImageCompanyCulture" TEXT,
    "bookOfStandards" TEXT,
    "video" TEXT,
    "codeId" INTEGER,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyToFlyTalk" (
    "companyId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "CompanyToFlyTalk_pkey" PRIMARY KEY ("companyId","eventId")
);

-- CreateTable
CREATE TABLE "CompanyToInterest" (
    "companyId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "CompanyToInterest_pkey" PRIMARY KEY ("companyId","interestId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "EventType",
    "theme" "Theme",
    "startsAt" TEXT NOT NULL,
    "endsAt" TEXT NOT NULL,
    "requirements" TEXT,
    "footageLink" TEXT,
    "maxParticipants" INTEGER,
    "codeId" INTEGER,
    "isOnEnglish" BOOLEAN DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventToInterest" (
    "eventId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "EventToInterest_pkey" PRIMARY KEY ("eventId","interestId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "theme" "Theme" NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT,
    "details" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "activatedAt" TIMESTAMP(6),
    "expiresAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" INTEGER,
    "eventId" INTEGER,
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "titleTemplate" TEXT NOT NULL,
    "contentTemplate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "boothId" INTEGER,
    "eventId" INTEGER,
    "grades" JSON,
    "comment" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyId" INTEGER,
    "photo" JSONB,
    "instagram" TEXT,
    "linkedin" TEXT,
    "description" TEXT,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakerToEvent" (
    "speakerId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "SpeakerToEvent_pkey" PRIMARY KEY ("speakerId","eventId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "yearOfBirth" INTEGER NOT NULL,
    "occupation" TEXT,
    "password" TEXT,
    "points" INTEGER,
    "newsletterConsent" BOOLEAN,
    "companiesNewsletterConsent" BOOLEAN,
    "isDeleted" BOOLEAN,
    "profilePhotoUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "deliveredAt" TIMESTAMP(6),
    "readAt" TIMESTAMP(6),

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("userId","notificationId")
);

-- CreateTable
CREATE TABLE "UserToAchievement" (
    "userId" INTEGER NOT NULL,
    "achievementId" INTEGER NOT NULL,
    "timeOfAchievement" TIMESTAMP(6),

    CONSTRAINT "UserToAchievement_pkey" PRIMARY KEY ("userId","achievementId")
);

-- CreateTable
CREATE TABLE "UserToEvent" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "linkedinProfile" TEXT,
    "githubProfile" TEXT,
    "portfolioProfile" TEXT,
    "cv" TEXT,
    "description" TEXT,

    CONSTRAINT "UserToEvent_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "UserToInterest" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "UserToInterest_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "FrequentlyAskedQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FrequentlyAskedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopItem" (
    "id" SERIAL NOT NULL,
    "type" "ShopItemType",
    "itemName" TEXT,
    "quantity" INTEGER,
    "price" INTEGER,

    CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingCart" (
    "shopItemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER,
    "stage" "ShoppingCartItemStage",
    "orderedAt" TIMESTAMP(6),
    "takeByTime" TIMESTAMP(6),

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("userId","shopItemId")
);

-- CreateTable
CREATE TABLE "SurveyQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT,
    "inputLabel" TEXT,
    "inputType" "SurveyQuestionInputType" NOT NULL,
    "type" "SurveyQuestionType" NOT NULL,

    CONSTRAINT "SurveyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booth_name_key" ON "Booth"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Booth_companyId_key" ON "Booth"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_username_key" ON "Company"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "AchievementToCode" ADD CONSTRAINT "AchievementToCode_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AchievementToCode" ADD CONSTRAINT "AchievementToCode_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyToFlyTalk" ADD CONSTRAINT "CompanyToFlyTalk_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyToFlyTalk" ADD CONSTRAINT "CompanyToFlyTalk_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyToInterest" ADD CONSTRAINT "CompanyToInterest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CompanyToInterest" ADD CONSTRAINT "CompanyToInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EventToInterest" ADD CONSTRAINT "EventToInterest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EventToInterest" ADD CONSTRAINT "EventToInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpeakerToEvent" ADD CONSTRAINT "SpeakerToEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SpeakerToEvent" ADD CONSTRAINT "SpeakerToEvent_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToAchievement" ADD CONSTRAINT "UserToAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToAchievement" ADD CONSTRAINT "UserToAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToInterest" ADD CONSTRAINT "UserToInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserToInterest" ADD CONSTRAINT "UserToInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

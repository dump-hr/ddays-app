-- CreateEnum
CREATE TYPE "accessory" AS ENUM ('default', 'sunglasses', 'crown', 'angel', 'beret', 'ninja', 'headphones', 'flower');

-- CreateEnum
CREATE TYPE "body" AS ENUM ('default', 'scarf', 'chain', 'basketball', 'macbook', 'sunflower', 'cats', 'dumbell');

-- CreateEnum
CREATE TYPE "colors" AS ENUM ('yellow', 'orange', 'brown', 'purple', 'green', 'white', 'red', 'gray');

-- CreateEnum
CREATE TYPE "company_category" AS ENUM ('gold', 'silver', 'bronze', 'media', 'friend');

-- CreateEnum
CREATE TYPE "event_type" AS ENUM ('lecture', 'workshop', 'flyTalk', 'campfireTalk', 'panel', 'other');

-- CreateEnum
CREATE TYPE "face" AS ENUM ('default', 'eyelashes', 'angry', 'crying', 'mustache', 'nose_ring', 'tattoo', 'mole');

-- CreateEnum
CREATE TYPE "notification_status" AS ENUM ('pending', 'delivered', 'read');

-- CreateEnum
CREATE TYPE "shop_item_type" AS ENUM ('mug', 'shirt', 'hoodie', 'sticker');

-- CreateEnum
CREATE TYPE "shopping_cart_item_stage" AS ENUM ('collected', 'uncollected');

-- CreateEnum
CREATE TYPE "survey_question_input_type" AS ENUM ('input', 'textarea', 'rating');

-- CreateEnum
CREATE TYPE "survey_question_type" AS ENUM ('workshop', 'lecture', 'company');

-- CreateEnum
CREATE TYPE "theme" AS ENUM ('dev', 'design', 'marketing', 'tech');

-- CreateTable
CREATE TABLE "achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER DEFAULT 0,
    "fulfillment_code_count" INTEGER,
    "is_hidden" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement_to_code" (
    "achievement_id" INTEGER NOT NULL,
    "code_id" INTEGER NOT NULL,

    CONSTRAINT "achievement_to_code_achievement_id_code_id_pk" PRIMARY KEY ("achievement_id","code_id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "color" "colors",
    "face" "face",
    "accessory" "accessory",
    "body" "body",

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "company_category",
    "company_id" INTEGER,

    CONSTRAINT "booth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "is_single_use" BOOLEAN DEFAULT false,
    "has_page" BOOLEAN DEFAULT false,
    "expiration_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "category" "company_category",
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT,
    "opportunities_description" TEXT,
    "website_url" TEXT,
    "instagram_url" TEXT,
    "linkedin_url" TEXT,
    "logo_image" TEXT,
    "landing_image" TEXT,
    "landing_image_company_culture" TEXT,
    "book_of_standards" TEXT,
    "video" TEXT,
    "code_id" INTEGER,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_to_fly_talk" (
    "company_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "company_to_fly_talk_company_id_event_id_pk" PRIMARY KEY ("company_id","event_id")
);

-- CreateTable
CREATE TABLE "company_to_interest" (
    "company_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "company_to_interest_company_id_interest_id_pk" PRIMARY KEY ("company_id","interest_id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "event_type",
    "theme" "theme",
    "starts_at" TEXT NOT NULL,
    "ends_at" TEXT NOT NULL,
    "requirements" TEXT,
    "footage_link" TEXT,
    "max_participants" INTEGER,
    "code_id" INTEGER,
    "is_on_english" BOOLEAN DEFAULT false,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_to_interest" (
    "event_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "event_to_interest_event_id_interest_id_pk" PRIMARY KEY ("event_id","interest_id")
);

-- CreateTable
CREATE TABLE "frequently_asked_question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "frequently_asked_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "theme" "theme" NOT NULL,

    CONSTRAINT "interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT,
    "details" TEXT NOT NULL,
    "link" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "activated_at" TIMESTAMP(6),
    "expires_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_user_id" INTEGER,
    "event_id" INTEGER,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title_template" TEXT NOT NULL,
    "content_template" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "booth_id" INTEGER,
    "event_id" INTEGER,
    "grades" JSON,
    "comment" TEXT,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_item" (
    "id" SERIAL NOT NULL,
    "type" "shop_item_type",
    "item_name" TEXT,
    "quantity" INTEGER,
    "price" INTEGER,

    CONSTRAINT "shop_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_cart" (
    "shop_item_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER,
    "stage" "shopping_cart_item_stage",
    "ordered_at" TIMESTAMP(6),
    "take_by_time" TIMESTAMP(6),

    CONSTRAINT "shopping_cart_user_id_shop_item_id_pk" PRIMARY KEY ("user_id","shop_item_id")
);

-- CreateTable
CREATE TABLE "speaker" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company_id" INTEGER,
    "photo" JSONB,
    "instagram" TEXT,
    "linkedin" TEXT,
    "description" TEXT,

    CONSTRAINT "speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speaker_to_event" (
    "speaker_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "speaker_to_event_speaker_id_event_id_pk" PRIMARY KEY ("speaker_id","event_id")
);

-- CreateTable
CREATE TABLE "survey_question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT,
    "inputLabel" TEXT,
    "inputType" "survey_question_input_type" NOT NULL,
    "type" "survey_question_type" NOT NULL,

    CONSTRAINT "survey_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "year_of_birth" INTEGER NOT NULL,
    "occupation" TEXT,
    "password" TEXT,
    "points" INTEGER,
    "newsletter_consent" BOOLEAN,
    "companies_newsletter_consent" BOOLEAN,
    "is_deleted" BOOLEAN,
    "profile_photo_url" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notification" (
    "user_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "status" "notification_status" NOT NULL DEFAULT 'pending',
    "delivered_at" TIMESTAMP(6),
    "read_at" TIMESTAMP(6),

    CONSTRAINT "user_notification_user_id_notification_id_pk" PRIMARY KEY ("user_id","notification_id")
);

-- CreateTable
CREATE TABLE "user_to_achievement" (
    "user_id" INTEGER NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "time_of_achievement" TIMESTAMP(6),

    CONSTRAINT "user_to_achievement_user_id_achievement_id_pk" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateTable
CREATE TABLE "user_to_event" (
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "linkedin_profile" TEXT,
    "github_profile" TEXT,
    "portfolio_profile" TEXT,
    "cv" TEXT,
    "description" TEXT,

    CONSTRAINT "user_to_event_user_id_event_id_pk" PRIMARY KEY ("user_id","event_id")
);

-- CreateTable
CREATE TABLE "user_to_interest" (
    "user_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "user_to_interest_user_id_interest_id_pk" PRIMARY KEY ("user_id","interest_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "booth_name_unique" ON "booth"("name");

-- CreateIndex
CREATE UNIQUE INDEX "booth_company_id_unique" ON "booth"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_username_unique" ON "company"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_unique" ON "user"("phone_number");

-- AddForeignKey
ALTER TABLE "achievement_to_code" ADD CONSTRAINT "achievement_to_code_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "achievement_to_code" ADD CONSTRAINT "achievement_to_code_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booth" ADD CONSTRAINT "booth_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_to_fly_talk" ADD CONSTRAINT "company_to_fly_talk_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_to_fly_talk" ADD CONSTRAINT "company_to_fly_talk_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_to_interest" ADD CONSTRAINT "company_to_interest_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_to_interest" ADD CONSTRAINT "company_to_interest_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_to_interest" ADD CONSTRAINT "event_to_interest_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_to_interest" ADD CONSTRAINT "event_to_interest_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_booth_id_booth_id_fk" FOREIGN KEY ("booth_id") REFERENCES "booth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_shop_item_id_shop_item_id_fk" FOREIGN KEY ("shop_item_id") REFERENCES "shop_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "speaker" ADD CONSTRAINT "speaker_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "speaker_to_event" ADD CONSTRAINT "speaker_to_event_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "speaker_to_event" ADD CONSTRAINT "speaker_to_event_speaker_id_speaker_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "speaker"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_notification" ADD CONSTRAINT "user_notification_notification_id_notification_id_fk" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_notification" ADD CONSTRAINT "user_notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_achievement" ADD CONSTRAINT "user_to_achievement_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_achievement" ADD CONSTRAINT "user_to_achievement_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_event" ADD CONSTRAINT "user_to_event_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_event" ADD CONSTRAINT "user_to_event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_interest" ADD CONSTRAINT "user_to_interest_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_to_interest" ADD CONSTRAINT "user_to_interest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


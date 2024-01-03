DO $$ BEGIN
 CREATE TYPE "event_place" AS ENUM('online', 'inPerson');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "event_theme" AS ENUM('dev', 'design', 'tech', 'marketing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "event_type" AS ENUM('lecture', 'workshop', 'flyTalk', 'campfireTalk', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sponsor_category" AS ENUM('general', 'gold', 'silver', 'bronze', 'workshop', 'foodAndBeverage', 'generalMedia', 'media', 'organizational', 'prizeGame', 'friend');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "surveyQuestionInputType" AS ENUM('input', 'textarea', 'rating');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "surveyQuestionType" AS ENUM('workshop', 'lecture', 'company');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"fulfillment_code_count" integer NOT NULL,
	"is_hidden" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievementToCode" (
	"achievement_id" integer NOT NULL,
	"code_id" integer NOT NULL,
	CONSTRAINT "achievementToCode_achievement_id_code_id_pk" PRIMARY KEY("achievement_id","code_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(10) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"is_single_use" boolean DEFAULT false,
	"has_page" boolean DEFAULT false,
	"expiration_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"sponsor_category" "sponsor_category",
	"name" text,
	"description" text,
	"website_url" text,
	"booth_location" text,
	"logo_image" text,
	"landing_image" text,
	"company_video" text,
	"code_id" integer NOT NULL,
	CONSTRAINT "company_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companyInterests" (
	"companyId" integer NOT NULL,
	"interestId" integer NOT NULL,
	CONSTRAINT "companyInterests_companyId_interestId_pk" PRIMARY KEY("companyId","interestId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"event_type" "event_type" NOT NULL,
	"event_theme" "event_theme" NOT NULL,
	"event_place" "event_place" NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"requirements" text NOT NULL,
	"footage_link" text NOT NULL,
	"max_participants" integer NOT NULL,
	"code_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventInterests" (
	"eventId" integer NOT NULL,
	"interestId" integer NOT NULL,
	CONSTRAINT "eventInterests_eventId_interestId_pk" PRIMARY KEY("eventId","interestId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "frequentlyAskedQuestion" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"theme" "event_theme" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"activated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveyQuestion" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text,
	"description" text,
	"inputLabel" text,
	"inputType" "surveyQuestionInputType" NOT NULL,
	"type" "surveyQuestionType" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievementToCode" ADD CONSTRAINT "achievementToCode_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_interestId_interests_id_fk" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventInterests" ADD CONSTRAINT "eventInterests_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventInterests" ADD CONSTRAINT "eventInterests_interestId_interests_id_fk" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

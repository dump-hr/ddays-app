DO $$ BEGIN
 CREATE TYPE "company_category" AS ENUM('gold', 'silver', 'bronze', 'media', 'friend');
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
 CREATE TYPE "survey_question_input_type" AS ENUM('input', 'textarea', 'rating');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "survey_question_type" AS ENUM('workshop', 'lecture', 'company');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "theme" AS ENUM('dev', 'design', 'marketing', 'tech');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievement" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"points" integer DEFAULT 0,
	"fulfillment_code_count" integer,
	"is_hidden" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievement_to_code" (
	"achievement_id" integer NOT NULL,
	"code_id" integer NOT NULL,
	CONSTRAINT "achievement_to_code_achievement_id_code_id_pk" PRIMARY KEY("achievement_id","code_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"points" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"is_single_use" boolean DEFAULT false,
	"has_page" boolean DEFAULT false,
	"expiration_date" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text,
	"category" "company_category",
	"name" text NOT NULL,
	"username" text NOT NULL,
	"description" text,
	"website_url" text,
	"booth_location" text,
	"logo_image" text,
	"landing_image" text,
	"video" text,
	"code_id" integer,
	CONSTRAINT "company_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_to_interest" (
	"company_id" integer NOT NULL,
	"interest_id" integer NOT NULL,
	CONSTRAINT "company_to_interest_company_id_interest_id_pk" PRIMARY KEY("company_id","interest_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"type" "event_type",
	"theme" "theme",
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"requirements" text,
	"footage_link" text,
	"max_participants" integer,
	"code_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_to_interest" (
	"event_id" integer NOT NULL,
	"interest_id" integer NOT NULL,
	CONSTRAINT "event_to_interest_event_id_interest_id_pk" PRIMARY KEY("event_id","interest_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "frequently_asked_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interest" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"theme" "theme" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" text NOT NULL,
	"location" text,
	"details" text NOT NULL,
	"link" text,
	"created_at" timestamp DEFAULT now(),
	"company_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"activated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "survey_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"description" text,
	"inputLabel" text,
	"inputType" "survey_question_input_type" NOT NULL,
	"type" "survey_question_type" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievement_to_code" ADD CONSTRAINT "achievement_to_code_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievement_to_code" ADD CONSTRAINT "achievement_to_code_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "company_to_interest" ADD CONSTRAINT "company_to_interest_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_to_interest" ADD CONSTRAINT "company_to_interest_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "event_to_interest" ADD CONSTRAINT "event_to_interest_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_to_interest" ADD CONSTRAINT "event_to_interest_interest_id_interest_id_fk" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

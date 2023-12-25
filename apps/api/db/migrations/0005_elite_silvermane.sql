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
CREATE TABLE IF NOT EXISTS "surveyQuestion" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text,
	"description" text,
	"inputLabel" text,
	"inputType" "surveyQuestionInputType" NOT NULL,
	"type" "surveyQuestionType" NOT NULL
);

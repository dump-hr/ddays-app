DO $$ BEGIN
 CREATE TYPE "sponsor_category" AS ENUM('general', 'gold', 'silver', 'bronze', 'workshop', 'foodAndBeverage', 'generalMedia', 'media', 'organizational', 'prizeGame', 'friend');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" serial PRIMARY KEY NOT NULL,
	"sponsor_category" "sponsor_category",
	"name" text,
	"description" text,
	"website_url" text,
	"booth_location" text,
	"code_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_code_id_code_id_fk" FOREIGN KEY ("code_id") REFERENCES "code"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

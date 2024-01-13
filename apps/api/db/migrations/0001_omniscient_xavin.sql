CREATE TABLE IF NOT EXISTS "job" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" text NOT NULL,
	"location" text NOT NULL,
	"details" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"company_id" integer NOT NULL,
	CONSTRAINT "job_position_unique" UNIQUE("position")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

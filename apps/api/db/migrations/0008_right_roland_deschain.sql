CREATE TABLE IF NOT EXISTS "booth_location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" "company_category",
	"company_id" integer
);
--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "booth_location_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_booth_location_id_booth_location_id_fk" FOREIGN KEY ("booth_location_id") REFERENCES "booth_location"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "booth_location";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booth_location" ADD CONSTRAINT "booth_location_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

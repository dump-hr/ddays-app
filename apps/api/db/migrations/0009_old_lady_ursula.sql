ALTER TABLE "booth_location" RENAME TO "booth";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "company_booth_location_id_booth_location_id_fk";
--> statement-breakpoint
ALTER TABLE "booth" DROP CONSTRAINT "booth_location_company_id_company_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booth" ADD CONSTRAINT "booth_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "booth_location_id";--> statement-breakpoint
ALTER TABLE "booth" ADD CONSTRAINT "booth_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "booth" ADD CONSTRAINT "booth_company_id_unique" UNIQUE("company_id");
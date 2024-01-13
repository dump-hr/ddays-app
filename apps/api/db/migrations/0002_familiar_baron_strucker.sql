ALTER TABLE "job" DROP CONSTRAINT "job_position_unique";--> statement-breakpoint
ALTER TABLE "companyInterests" DROP CONSTRAINT "companyInterests_companyId_company_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_theme" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "ends_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "requirements" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "footage_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "max_participants" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "code_id" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companyInterests" ADD CONSTRAINT "companyInterests_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "event_place";
ALTER TABLE "company" DROP CONSTRAINT "company_email_unique";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "email";